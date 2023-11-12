import React from 'react';
import styles from './Admin.module.scss';
import OrdersDetails from './orderDetails/OrderDetails';
import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from '../admin/home/Home';
import AddProducts from './addProducts/AddProducts';
import ViewProducts from './viewProducts/ViewProducts';
import Orders from './orders/Orders';

const Admin = () => {
  return (
    <div className={styles.admin}>
      
      <div className={styles.navbar}>
      <Navbar/>
      </div>

        <div className={styles.content}>

           <Routes>
            <Route path='home' element ={<Home/>} />
            <Route path='add-products/:id' element ={<AddProducts/>} />
            <Route path='view-products' element ={<ViewProducts/>} />
            <Route path='add-product/:id' element ={<AddProducts/>} />
            <Route path='orders' element ={<Orders/>} />
            <Route path='order-details/:id' element ={<OrdersDetails/>} />
            
            </Routes>
        </div>

    </div>
  )
}

export default Admin;
