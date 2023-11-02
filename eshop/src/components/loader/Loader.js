import React from 'react'
import loaderImg from '../../assets/loader.gif';
import styles from './loader.module.scss';
import ReactDOM from 'react-dom';
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>

    <div className={styles.loader}>
    <img src={loaderImg} alt='Loading...' ></img>
    </div>

    </div>,
    document.querySelector('#loader')
  )
}

export default Loader;
