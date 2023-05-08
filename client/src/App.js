import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './screens/Header';
import './screens/Home.css'
import AddProduct from './screens/AddProduct';
import Cart from './screens/Cart';
import Home from './screens/Home';
import Product from './screens/Product';
import ShippingAddress from './screens/ShippingAddress';
import Signin from './screens/Signin';
import Signup from './screens/Signup';

import PlaceOrder from './screens/PlaceOrder';

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
      <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
