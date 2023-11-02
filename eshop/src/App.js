import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Contact, Admin} from './pages';
import {Header, Footer} from './components';
import {Login, Register, Reset} from './pages/auth'
import ShowAdminRoute from './components/showAdminOnlyRoute/ShowAdminRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
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
           
    </Routes>

    <Footer>
    </Footer>
    </BrowserRouter>
    
    
    </> );
}

export default App;
