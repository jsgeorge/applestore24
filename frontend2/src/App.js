import React from "react";
import { RoutesDir } from './routes';
import { HashRouter as Router } from "react-router-dom";
import { HeaderComponent } from './components/layout/navbar';
import { FooterComponent } from './components/layout/footer';
import { Provider } from "react-redux";
import store from './store'
// import './bootstrap.min.css';
import './index.css';
import './fonts/font-awesome/css/font-awesome.min.css';
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
       <Router>
            <HeaderComponent />
            <div className="margin-top"> 
                <RoutesDir/>
             </div> 
            <FooterComponent />
        </Router>
        </Provider>
       
    </div>
  );
}

export default App;
