import React from 'react';
import styles from './navbar.module.scss';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../../redux/slice/authSlice';
import {FaUserCircle} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';



const activeLink = ({isActive})=> isActive ? styles.active : "" ;

const Navbar = () => {

    const userName = useSelector(selectUsername);


  return (
    <div className={styles.navbar}>
      
      <div className={styles.user}>

        <FaUserCircle size={40} color="#fff" />
        <h3>{userName}</h3>

      </div>

      <nav>

<ul>
        <li>
            <NavLink to="/admin/home" className={activeLink}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/view-products" className={activeLink}>
                View Products
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/add-products/ADD" className={activeLink}>
                Add Products
            </NavLink>
        </li>
        <li>
            <NavLink to="/admin/orders" className={activeLink}>
                Orders
            </NavLink>
        </li>
</ul>

      </nav>

    </div>
  )
}

export default Navbar
