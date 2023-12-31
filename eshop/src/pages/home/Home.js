import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider';
import Product from '../../components/product/Product';

const Home = () => {


  //helps in scroll to location.
  const url = window.location.href;

  const scrollToProducts = ()=>{

    if(url.includes("#products")){
      window.scrollTo({
        top: 700,
        behavior: 'smooth'
      })

      return
      
    }
  }

  useEffect(()=>{

    scrollToProducts();

  },[])

  return (
    <div>
     <Slider />
     <Product />
    </div>
  )
}

export default Home;
