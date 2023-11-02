import React, {useState} from 'react';

import styles from './Auth.module.scss';
import registerImg from '../../assets/register.png';
import Card from '../../components/card/card';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase/config';
 
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';


const Register = () => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [cPassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
 const navigate =useNavigate();

     const registerUser = (e)=>{

        

        e.preventDefault();
        if(password !== cPassword){
            toast.error("Passwords must match");
        }
        
        else{
        setIsLoading(true);   
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    // Signed up 
     
    
    
    setIsLoading(false);
    navigate('/login');
    toast.success("User Registered");
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
   
    toast.error(error.message);
    setIsLoading(false);
    // ..
  });
        }
     }

    return (
        //   container class from index.js
    
       <>

<ToastContainer />
{isLoading && <Loader />}
<section className={`container ${styles.auth}`}>
        
         
       
        <Card>
        <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
     
         <input type='text' value={email}  placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required></input>
         <input type='password' value={password} onChange = {(e)=>setPassword(e.target.value)} placeholder='Password' required></input>
         <input type='password' value={cPassword}
         onChange={(e)=> setCpassword(e.target.value)} placeholder='Confirm Password' required></input>
         
         <button className='--btn --btn-primary --btn-block' >Register</button>
        
     
        </form>
        </div>
        </Card>
        <div className={styles.img}>
          <img width="400" src={registerImg} alt="Register" />
        </div>
       </section>

       </>
      )
}

export default Register;
