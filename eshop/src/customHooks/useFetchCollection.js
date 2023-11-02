import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const useFetchCollection = (collectionName) => {

    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const getCollection = () =>{

        setIsLoading(true);

        try{
             console.log(collectionName);
            const docRef = collection(db, collectionName);

            const q = query(docRef, orderBy("createdAt","desc"));

 onSnapshot(q, (snapshot) => {
  
    //   console.log(snapshot.docs);
      const allData = snapshot.docs.map((doc)=>({

        id: doc.id,
        ...doc.data()

      }));
    //   console.log(allProducts);
    setData(allData);
    setIsLoading(false);
     console.log(allData);
    
     
});
           

        }
        catch(error){
            console.log(error);
            setIsLoading(false);
            toast.error("Unable to load data");
        }
    }

    useEffect(()=>{

        getCollection();
    },[]);

    
    return {data, isLoading};
}

export default useFetchCollection
