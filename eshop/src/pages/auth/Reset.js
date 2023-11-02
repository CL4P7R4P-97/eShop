import React, { useEffect, useState } from 'react'
import styles from './Auth.module.scss';
import resetImg from '../../assets/forgot.png';
import Card from '../../components/card/card';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import Loader from '../../components/loader/Loader';


const Reset = () => {


    const [email, setEmail ] = useState("");
    const [isloading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();


   

       
 

    const resetPassword = (e)=>{
 
         e.preventDefault();
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success("Reset link sent!");
    setIsLoading(false);
    navigate('/login');
  })
  .catch((error) => {
    const errorCode = error.code;
    toast.warning(error.message);
    setIsLoading(false);
    // ..
  });
        
    }


    return (
        //   container class from index.js
    
       <>
       {isloading && <Loader />}
       <ToastContainer/>
        <section className={`container ${styles.auth}`}>
       <div className={styles.img}>
         <img width="400" src={resetImg} alt="Register" />
       </div>
       <Card>
       <div className={styles.form}>
       <h2>Reset</h2>
       <form onSubmit={resetPassword}>
    
        <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required></input>        
        <button className='--btn --btn-primary --btn-block' onClick={resetPassword} >Reset</button>
       
        <div className={styles.links}>
        <p><Link to= '/login'>-Login</Link></p>
       <p> <Link to='/register'>Register-</Link></p>
       </div>
    
       </form>
       </div>
       </Card>
       
      </section>
       </>
      )
}

export default Reset
