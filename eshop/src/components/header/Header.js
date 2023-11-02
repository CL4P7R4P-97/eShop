import {useEffect, useState} from 'react'
import styles from './Header.module.scss';
import {Link, NavLink} from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUser} from 'react-icons/fa';
import {HiOutlineMenuAlt3 }  from 'react-icons/hi';
import  {auth} from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/ShowOnLogin';
import ShowAdminRoute, { ShowAdminLink } from '../showAdminOnlyRoute/ShowAdminRoute';

const logo = (

  <div className={styles.logo}>
       <Link to="/">
        <h2>
          react<span>Shop</span>.
        </h2>
       </Link>
      </div>
)

const cart = (

  <span className={styles.cart}>
          <Link to="/cart">Cart
          <FaShoppingCart size={20}
           />
           <p>0</p>
          </Link>
        </span>

)

const activeLink = ({isActive})=> isActive ? styles.active : "" 


const Header = () => {

 const [showMenu, setShowMenu] = useState(false);
 const [userName, setUsername] = useState("");
 
 const dispatch = useDispatch();

 useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const uid = user.uid;
        
        if(user.displayName == null){

          const name = user.email.split('@')[0].charAt(0).toUpperCase()+ user.email.split('@')[0].slice(1,);
          setUsername(name);

        }
        else{
          setUsername(user.displayName);
        }
       
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName || userName,
          userID: user.uid,

        }))
        
      } else {
        dispatch(REMOVE_ACTIVE_USER());
       setUsername("");
      }
    });
}, []);

const logout  = ()=>{

  signOut(auth).then(() => {
    toast.success("Your account has been logged out")
     
    dispatch(REMOVE_ACTIVE_USER());

  }).catch((error) => {
    toast.error(error.message);
  });
}

 const toggleMenu = () =>{

  setShowMenu(!showMenu);

 }

 const hideMenu = () =>{

    setShowMenu(false);
 }

  return (
    <>
    <ToastContainer/>
    <header>
      <div className={styles.header}>
      {logo}

      <nav className={showMenu ? `${styles["show-nav"]}` : `${["hide-nav"]}`}>

        <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}>

       
     
        </div>

         <ul onClick={hideMenu}>
          <li className={styles["logo-mobile"]}>
            {logo}
            <FaTimes size={22} color="#fff" onClick={hideMenu}
          /></li>

          <ShowAdminLink>
          <li>
            <button className='--btn --btn-primary' ><NavLink to="/admin"  >Admin </NavLink></button>
          </li>
          </ShowAdminLink>
       <li>
        <NavLink to="/" className={activeLink} >Home </NavLink>
       </li>
       <li>
       <NavLink to="/contact" className={activeLink} >Contact Us</NavLink>
       </li>
         </ul>


        <div className={styles["header-right"]} onClick={hideMenu}>
        
        <span className={styles.links} >
          
          <ShowOnLogin>
          <a href='#'>
    <FaUser /> &nbsp;
   Hi, &nbsp; {userName}
  </a>
          </ShowOnLogin>
          <ShowOnLogout>
          <NavLink className={activeLink} to="/login">Login</NavLink>


  <NavLink className={activeLink} to="/register">Register</NavLink>
          </ShowOnLogout>
          
       
          <ShowOnLogin>
          <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
          <NavLink onClick={logout} to="/">Logout</NavLink>
          </ShowOnLogin>
          
          
        </span>

       <ShowOnLogin>
       {cart}
       </ShowOnLogin>
        </div>

      </nav>
        
      <div className={styles["menu-icons"]}>
      <ShowOnLogin>
       {cart}
       </ShowOnLogin>
      <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>


      </div>
    </header>
    </>
  )
}

export default Header;
