import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Contact, Admin, Cart, OrderHistory} from './pages';
import {Header, Footer} from './components';
import {Login, Register, Reset} from './pages/auth'
import ShowAdminRoute from './components/showAdminOnlyRoute/ShowAdminRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
 
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderDetails from './pages/orderDetails/OrderDetails';
import ReviewProducts from './components/reviewProducts/ReviewProducts';
import NotFound from './pages/notFound/NotFound';
function App() {




  return (
    <>
    <BrowserRouter>
    
    <Header>
    </Header>
    <Routes>

      <Route path='/' element={<Home />} ></Route>
      <Route path='/contact' element={ < Contact/> } ></Route>
      <Route path='/login' element={ < Login/> } ></Route>
      <Route path='/register' element={ < Register/> } ></Route>
      <Route path='/reset' element={ < Reset/> } ></Route>
      <Route path='/admin/*' element={ <ShowAdminRoute><Admin  /></ShowAdminRoute>}></Route>
      <Route path='/product-details/:id' element={ < ProductDetails/> } ></Route>
      <Route path='/cart' element={ < Cart/> } ></Route>
      <Route path='/checkout-details' element={ < CheckoutDetails/> } ></Route>
      <Route path='/checkout' element={ < Checkout/> } ></Route>
      <Route path='/checkout-success' element={ < CheckoutSuccess/> } ></Route>
       <Route path='/order-history' element={ < OrderHistory/> } ></Route>
       <Route path='/order-details/:id' element={ < OrderDetails/> } ></Route>
       <Route path='/review-product/:id' element={ < ReviewProducts/> } ></Route>
       <Route path='*' element={ < NotFound/> } ></Route>
           
    </Routes>

    <Footer>
    </Footer>
    </BrowserRouter>
    
    
    </> );
}

export default App;
