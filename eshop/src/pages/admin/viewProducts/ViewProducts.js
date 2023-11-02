import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import styles from './viewProducts.module.scss';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import {useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';

const ViewProducts = () => {

    const {data, isLoading} = useFetchCollection("products");
    
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(STORE_PRODUCTS({
            products: data
        }));
    },[dispatch, data])
   

//     const getProducts=()=>{

//         setIsLoading(true);

//         try{

//             const productsRef = collection(db, "products");

//             const q = query(productsRef, orderBy("createdAt","desc"));

//  onSnapshot(q, (snapshot) => {
  
//     //   console.log(snapshot.docs);
//       const allProducts = snapshot.docs.map((doc)=>({

//         id: doc.id,
//         ...doc.data()

//       }));
//     //   console.log(allProducts);
//     setProducts(allProducts);
//     dispatch(STORE_PRODUCTS({
//         products: allProducts
//     }))
    
     
// });
           
// setIsLoading(false);
//         }
//         catch(error){
//             setIsLoading(false);
//             toast.error("Unable to load products");
//         }
//     }

    const deleteProduct = async(id, imageURL)=>{

            try{

                console.log("deleting");

             await   deleteDoc(doc(db, "products", id));
             const storageRef = ref(storage, imageURL);
             
             await deleteObject(storageRef);
             toast.success("Product deleted successfully");

            } 
            catch(error){

            }
    }
    
    const confirmDelete  =(id, imageURL)=>{

        Notiflix.Confirm.show(
            'Delete Product !?',
            'You are about to delete product',
            'Delete',
            'Cancel',
            function okCb() {
              deleteProduct(id,imageURL);
            },
            function cancelCb() {
               console.log("Delete Cancelled");
            },
            {
              width: '320px',
              borderRadius: '3px',
              titleColor: "orangered",
              okButtonBackground: "orangered",
              cssAnimationStyle: "zoom"
              
            },
          );
    }
  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.table}>

    <h2>All Products</h2>
    {products.length === 0 ? (
        <p>No product found</p>
    ): (
        <table>
            <thead>
                <tr>
                <th>S/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
                </tr>
            </thead>
           <tbody>
           {products.map((product,index)=>{
          
          const {id, name,category,imageURL, price}
          = product;
          return(
           <tr key={id}>
           <td>{index +1}</td>
           <td><img src={imageURL} alt={name}
           style={{width: "100px"}} /></td>
           <td>{name}</td>
           <td>{category}</td>
           <td>${price}</td>
           <td><Link to ={`/admin/add-products/${id}`}><FaEdit size={20} color="green" /></Link> &nbsp;
           <Link ><FaTrashAlt onClick={()=>confirmDelete(id,imageURL)} size={18} color="red"/></Link>
           </td>
           </tr>
         )

            })}
           </tbody>
        </table>
    )}
  </div>
    </>
  )
}

export default ViewProducts
