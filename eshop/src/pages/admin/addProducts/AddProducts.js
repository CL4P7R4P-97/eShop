import React, { useState } from 'react'
import styles from './addProducts.module.scss';
import Card from '../../../components/card/card';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc, setIndexConfiguration } from 'firebase/firestore';
import Loader from '../../../components/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';


const categories = [
    {id: 1, name: "Laptop"},
    {id: 2, name: "Electronics"},
    {id: 3, name: "Fashion"},
    {id: 4, name: "Phone"},

]

const initialState = {
    
    name: "",
        imageURL: "",
        price: 0,
        category: "",
        brand: "",
        desc: ""
}

const AddProducts = () => {

    const navigate = useNavigate();
    const products = useSelector(selectProducts);
    console.log(products);

    const {id} = useParams();
    
  
   console.log(id);
    const productEdit  = products.find((item)=>item.id === id);

    console.log(productEdit);

  
    const detectForm=(id, f1,f2)=>{

      

      if(id === "ADD"){
        
        return f1;
      }
      
      return f2;

    }

    

    const [product, setProduct]  = useState(productEdit||initialState);

   
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {

        const {name, value} = e.target;
        setProduct({...product, [name]:value})

    }
    const handleImageChange = (e) => {


        const file = e.target.files[0];
        const storageRef = ref(storage, `reactShop/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
          
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           setUploadProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
           toast.error("Upload failed error");
        }, 
        () => {
         
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({...product, imageURL: downloadURL});
            toast.success("Image uploaded");
          });
        
    }
        );
}

    
    const addProduct =  (e)=>{
        setIsLoading(true);

        e.preventDefault();
        try{
            
            
            const docRef =  addDoc(collection(db, "products"), {

                name: product.name,
                imageURL: product.imageURL,
                price: Number(product.price),
                category: product.category,
                brand: product.brand,
                desc: product.desc,
                createdAt: Timestamp.now().toDate()
                
              });
              setIsLoading(false);
              toast.success("Product added");
              setProduct({...initialState});
              setUploadProgress(0);
             navigate('/admin/view-products');


        }
        catch(error){
           
            setIsLoading(false);
            toast.error("Error adding product");
        }
    }

    const editProduct = async(e)=>{

      e.preventDefault();
      setIsLoading(true);
      
      if(product.imageURL !== productEdit.imageURL){
        const storageRef = ref(storage, productEdit.imageURL);
             
        try{
          await deleteObject(storageRef);
        }
        catch(error){
        
          
        }
      }
      try{

        await setDoc(doc(db, "products", id), {
          name: product.name,
          imageURL: product.imageURL,
          price: Number(product.price),
          category: product.category,
          brand: product.brand,
          desc: product.desc,
          editedAt: Timestamp.now().toDate(),
          createdAt: product.createdAt
        });

        setIsLoading(false);
        toast.success("Product updated");
        navigate('/admin/view-products');

      }
      catch(error){
        setIsLoading(false);
        toast.error("error.message");
      }

    }



  return (
    
    <>
    {isLoading && <Loader />}
    <div className={styles.product}>
            <h1>{detectForm(id, "Add Product", "Update Product")}</h1>

            <Card  cardClass={styles.card}>

            <form onSubmit={detectForm(id,addProduct,editProduct)}>
                
            <label>Product name:</label>
             <input type="text" placeholder='Product name' 
             required name="name" value={product.name} onChange={(e)=>handleInputChange(e)}  />  

            
            <label>Product image: </label>

             <Card cardClass={styles.group} >
                {uploadProgress === 0? null:
                
                <div className={styles.progress}>

                    <div className={styles["progress-bar"]} 
                    style={{width: `${uploadProgress}` }}>
                    {uploadProgress < 100 ? 'Uploading':"Uploaded!"}
                    </div>

                </div>
                }
                
                <input type="file" 
                accept="image/*"
                placeholder='Product Image'
                name='image'
                
                onChange={(e)=>handleImageChange(e)}
                >
                </input>

            <input type="text" required 
            name="imageURL" placeholder='Image URL' value={product.imageURL} disabled>
            </input>

             </Card>
             <label>Product Price:</label>
             <input type="number" placeholder='Product price' 
             required name="price" value={product.price} onChange={(e)=>handleInputChange(e)}  /> 


<label>Product Category:</label>
             <select type="text"   
             required name="category" value={product.category} onChange={(e)=>handleInputChange(e)}  > 
            
            <option value="" disabled>--  choose product category --</option>
             {categories.map((category)=>{

                return (
                    <option key={category.id} value = {category.name}>{category.name}</option>
                )
             })}

            </select>

            <label>Product Company/Brand:</label>
             <input type="text" placeholder='Product brand' 
             required name="brand" value={product.brand} onChange={(e)=>handleInputChange(e)}  /> 

<label>Product Description:</label>
             <textarea rows="10" cols="30" 
             type="text" 
             required
             placeholder='Product description' 
             name="desc" value={product.desc} onChange={(e)=>handleInputChange(e)}  > 
                  </textarea>
<button className='--btn --btn-primary'>{detectForm(id,"Save Product","Edit Product")}</button>
                </form>  


              </Card>

    </div>
    </>
  )
}

export default AddProducts
