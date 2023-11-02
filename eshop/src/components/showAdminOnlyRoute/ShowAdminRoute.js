import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectEmail } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';


const ShowAdminRoute = ({children}) => {
 
    const userEmail = useSelector(selectEmail);

    
 
   if(userEmail === 'aky5271@gmail.com'){
    return children
   }
   else{
     
   return (<section className='container' style={{height: "80vh"}}>

    <h2>Permission Denied</h2>
    <p>For admin only!</p>
    <br/ >
    <Link to="/">
    <button className='--btn --btn-primary'>&larr; Back to Home</button>
    </Link>
</section>)
   }
}


export const ShowAdminLink = ({children}) => {
 
    const userEmail = useSelector(selectEmail);

    
 
   if(userEmail === 'aky5271@gmail.com'){
    return children
   }
   else{
    return null;
   }
}



export default ShowAdminRoute
