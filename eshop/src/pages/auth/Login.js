import React, { useState } from 'react'
import styles from './Auth.module.scss';
import loginImg from '../../assets/login.png';
import {FaGoogle} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/card';
import Loader from '../../components/loader/Loader';
import {auth} from '../../firebase/config';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { selectUsername } from '../../redux/slice/authSlice';
import { selectPreviousURL } from '../../redux/slice/cartSlice';
import { useSelector } from 'react-redux';
const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading]  = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const previousURL = useSelector(selectPreviousURL);
    const loginWithGoogle =()=>{

        setIsLoading(true);
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          toast.success("Welcome !"  );
    setIsLoading(false);
    if(previousURL){
      window.location.href = previousURL;
     }
     else{
      navigate('/');
     }
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          setIsLoading(false);
    toast.error( error);
          // ...
        });
    }
    const loginUser = (e)=>{

        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("Welcome !" );
    setIsLoading(false);
    if(previousURL){
      window.location.href = previousURL;
     }
     else{
      navigate('/');
     }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
     
    setIsLoading(false);
    toast.error( error.message);
  });

    }
   
    return (
    //   container class from index.js

   
   <>
   <ToastContainer />
   {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
   <div className={styles.img}>
     <img width="400" src={loginImg} alt="Login" />
   </div>
   <Card>
   <div className={styles.form}>
   <h2>Login</h2>
   <form onSubmit={loginUser}>

    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required></input>
    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required></input>
    <button className='--btn --btn-primary --btn-block' >Login</button>
   
   <div className={styles.links}>
        <Link to='/reset'>Reset Password</Link>
   </div>
    <p>-- or --</p>
   </form>
   <button className='--btn --btn-danger --btn-block' onClick={loginWithGoogle}><FaGoogle color="#fff"/> Login with Google</button>
   <span className={styles.register}>
    <p>Don't have an account?</p>
    <Link to ='/register'>Register</Link>
   </span>
   </div>
   </Card>
  </section>
   </>
  )
}

export default Login
