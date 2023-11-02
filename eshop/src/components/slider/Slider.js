import React, { useEffect, useState } from 'react'
import { sliderData } from './slider-data'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import './slider.scss';
const Slider = () => {


    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const scroll = true;
    const scrollInterval = 5000;
    let slideInterval;


    const nextSlide = ()=>{

        setCurrentSlide( currentSlide === slideLength -1 ? 0 : currentSlide + 1 );
        
    }
    const prevSlide = ()=>{

        setCurrentSlide( currentSlide === 0 ? slideLength-1 : currentSlide - 1 );

    }

    useEffect(() => {

        setCurrentSlide(0);

    }
    
    ,[])

    function autoScroll(){
         
       
            slideInterval = setInterval(nextSlide, scrollInterval);
     
    }

    useEffect(() => {

        if(scroll) {

            autoScroll();
        }

        return ()=>{
            clearInterval(slideInterval);
        }

    },[currentSlide])


  return (
    <div className='slider'>
      
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />

      <AiOutlineArrowRight onClick={nextSlide} className="arrow next" />

      {
        sliderData.map((slide, index)=>{

             const {image, heading, desc} = slide;
            return (

            <div className={index == currentSlide ? "slide current" : "slide"} key ={index}>

                {index == currentSlide  && (
                    <>
                    <img src={image} alt='' />
                    <div className='content'>
                        <h2>{heading}</h2>
                        <p>{desc}</p>
                        <hr />

                        <a href="#product" className='--btn --btn-primary'>
                         Shop now !
                        </a>

                    </div>
                    </>
                )

                }

                </div>

            )

        })
      }

    </div>
  )
}

export default Slider
