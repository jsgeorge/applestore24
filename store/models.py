
from decimal import MAX_EMAX
from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey

class Category(MPTTModel):
    name = models.CharField(
        verbose_name=_("Category Name"),
        help_text=_("Reuruired and unique"),
        max_length=250,
        unique=True)
    slug = models.SlugField(
        verbose_name=_("Category safe URL"),
        max_length=255,
        unique=True)
    parent = TreeForeignKey(
        "self", 
        on_delete=models.CASCADE,
        null=True,blank=True, related_name="children")
    menu_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class MPTTMeta:
        order_insertion_by = ["name"]
    
    class Meta:
         verbose_name =_("Category")
         verbose_name_plural = _("Categories")
        
    def get_absolute_url(self):
        return reverse("store:category_list", args=[self.slug])

    def __str__(self):
        return self.name
        
# Create your models here.
class ProductType(models.Model):
    name = models.CharField(verbose_name=_("Type Name "), help_text=_("Required"), max_length=250)
    is_active = models.BooleanField(default=True)
  
    class Meta:
         verbose_name =_("Product Type")
         verbose_name_plural = _("Product Types")
    
    
    def __str__(self):
        return self.name

class ProductSpecification(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    name = models.CharField(verbose_name=_("Name"), help_text=_("Required"), max_length=255)


    class Meta:
        verbose_name =_("Product Specification")
        verbose_name_plural = _("Product Specifications")
    
    
    def __str__(self):
        return self.name
 
class Product(models.Model):
    name = models.CharField(verbose_name=_("Name"), help_text=_("Required"), max_length=255)
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    category = models.ForeignKey(Category,
                                 null=True,
                                 on_delete=models.SET_NULL)
    headline =  models.CharField(verbose_name=_("Headline"), help_text=_("Not Required"), max_length=100, null=True, blank=True)
    description = models.CharField(verbose_name=_("Description"), help_text=_("Not Required"), max_length=1000, null=True, blank=True)
    slug = models.SlugField(max_length=255)
    inv_qty = models.IntegerField(default=0)
    order_qty = models.IntegerField(default=0)
    sold_qty = models.IntegerField(default=0)
    regular_price = models.DecimalField(
        verbose_name=_("Regular Price"), help_text=_("Maximum 999.99"),
        error_messages={
            "name": {
                "max_length": _("The Price must be between 9 and 999.99"),
            },
        },
        max_digits = 6,
        decimal_places=2,
    )
    discount_price = models.DecimalField(
        verbose_name=_("Discont Price"), help_text=_("Maximum 999.99"),
        error_messages={
            "name": {
                "max_length": _("The Price must be between 9 and 999.99"),
            },
        },
        max_digits = 6,
        decimal_places=2,
    )
    is_active = models.BooleanField(
        verbose_name=_("Product visibility"),
        help_text=_("Change product visibility"),
        default=True
    )
    rating = models.FloatField(default=0.00)
    no_ratings = models.IntegerField(default=0)
    img_bkd = models.CharField(max_length=20, default='', null=True, blank=True)
    featured1 = models.BooleanField(verbose_name=_("Featured1"), default=False)
    featured2 = models.BooleanField(verbose_name=_("Featured2"),default=False)
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_("Updated at"), auto_now_add=True)

    def rating_cnt(self):
        ratings = ProductRating.objects.filter(product=self)
        return len(ratings)

    def ave_rating(self):
        sum = 0
        ratings = ProductRating.objects.filter(product=self)
        if len(ratings) > 0:
            for r in ratings:
                sum += r.rating
            return sum / len(ratings)
        else:
            return 0
        
    def review_cnt(self):
        reviews = ProductReview.objects.filter(product=self)
        return len(reviews)

    def reviews(self):
        reviews = ProductReview.objects.filter(product=self)
        return reviews

    class Meta:
        ordering = ("-created_at",)
        verbose_name =_("Product")
        verbose_name_plural = _("Products")

    def get_absolute_url(self):
        return reverse("store:product_detail", args=[self.slug])

   
    def __str__(self):
        return self.name
 
class ProductRating(models.Model):
    user =  models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    product= models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
   
    class Meta:
        unique_together = (('user', 'product'),)
        index_together = (('user', 'product'),)

class ProductReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30,default='',null=True,blank=True)
    product= models.ForeignKey(Product, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('user', 'product'),)
        index_together = (('user', 'product'),)

    
class ProductSpecificationValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_spec")
    specification = models.ForeignKey(ProductSpecification, on_delete=models.RESTRICT)
    value = models.CharField(
        verbose_name=_("value"),
        help_text=_("Product specification value max 255 words"),
        max_length=255,
    )

    class Meta:
        verbose_name =_("ProductSpecifactionValue")
        verbose_name_plural = _("ProductSpecificationValues")

    
   
    def __str__(self):
        return self.value

class ProductImage(models.Model):
        product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_image")
        image = models.ImageField(
            verbose_name=_("image"),
            help_text=_("uploadProduct image"),
            upload_to="images/",
            default=("images/default.png")
        )
        alt_text = models.CharField(
            verbose_name=("Alternative text"),
            help_text=_("Please add alternative text"),
            max_length=255,
            null=True,
            blank=True,
        )
        is_feature = models.BooleanField(default=False)

        created_at = models.DateTimeField(_("Created at"), auto_now_add=True, editable=False)
        updated_at = models.DateTimeField(_("Updated at"), auto_now_add=True)

        class Meta:
            verbose_name =_("Product Image")
            verbose_name_plural = _("Product Images")
