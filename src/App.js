import { Route, Switch } from 'react-router-dom';
import AddProduct from './adminPages/AddProduct';
import AllOrders from './adminPages/AllOrders';
import DeleteProduct from './adminPages/DeleteProduct';
import EditProduct from './adminPages/EditProduct';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';


function App() {

  function googleTranslateElementInit() {
    const google = window.google;
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  }

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%' }}>
      <Navbar />
      <div id="google_translate_element" >

        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route path='/register'> <Register /> </Route>
          <Route path='/addProduct'> <AddProduct /> </Route>
          <Route path='/editProduct'> <EditProduct /> </Route>
          <Route path='/allOrders'> <AllOrders /> </Route>
          <Route path='/deleteproduct'> <DeleteProduct /> </Route>
          <Route path='/login'> <Login /> </Route>
          <Route path='/logout'> <Logout /> </Route>
        </Switch>

        {googleTranslateElementInit}

      </div>


    </div>
  );
}

export default App;
