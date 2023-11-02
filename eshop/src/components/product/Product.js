import React, { useEffect } from 'react'
import styles from './product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice';
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import { FaCogs } from 'react-icons/fa';
import spinnerImg from '../../assets/spinner.jpg';
const Product = () => {

    const {data, isLoading} = useFetchCollection("products");
     
    const dispatch = useDispatch();

    const products = useSelector(selectProducts);
    useEffect(()=>{


        dispatch(STORE_PRODUCTS({
            products: data,
        }))
        

    },[dispatch, data]);


  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
         
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
