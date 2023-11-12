import {useEffect, useState} from 'react'
import styles from './Header.module.scss';
import {Link, NavLink} from 'react-router-dom';
import {FaShoppingCart,FaUserCircle, FaTimes, FaUser} from 'react-icons/fa';
import {HiOutlineMenuAlt3 }  from 'react-icons/hi';
import  {auth} from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/ShowOnLogin';
import ShowAdminRoute, { ShowAdminLink } from '../showAdminOnlyRoute/ShowAdminRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Admin } from '../../pages';

const logo = (

  <div className={styles.logo}>
       <Link to="/">
        <h2>
          react<span>Shop</span>.
        </h2>
       </Link>
      </div>
)



const activeLink = ({isActive})=> isActive ? styles.active : "" 


const Header = () => {

 const [showMenu, setShowMenu] = useState(false);
 const [userName, setUsername] = useState("");
 const [scrollPage, setScrollPage] = useState(false);

 
 const dispatch = useDispatch();
 const totalQuantity = useSelector(selectCartTotalQuantity);

 const fixNavbar = ()=>{

  if(window.scrollY > 20){
     setScrollPage(true);
  }
  else{
    setScrollPage(false);
  }

 }

 window.addEventListener("scroll", fixNavbar);

 useEffect(()=>{

  dispatch(CALCULATE_TOTAL_QUANTITY());
 },[totalQuantity]);

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

 const cart = (

 

  <span className={styles.cart}>
          <Link to="/cart">Cart
          <FaShoppingCart size={20}
           />
           <p>{totalQuantity}</p>
          </Link>
        </span>

)

return (
  <>
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <ShowAdminLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </ShowAdminLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  Hi, {userName}
                </a>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  </>
);
}

export default Header;
