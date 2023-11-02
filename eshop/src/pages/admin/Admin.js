import React from 'react';
import styles from './Admin.module.scss';
import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
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
            <Route path='orders' element ={<Orders/>} />
            </Routes>
        </div>

    </div>
  )
}

export default Admin;
