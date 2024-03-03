"use client";
import { Suspense } from 'react'
import CollectionCard from "@components/collection/CollectionCard";
import { useState, useEffect } from "react";
import Loading from './loading';
import Image from 'next/image';

const CollectionList = ({data}) => {
    return (
      <>
        {
          data.map((collection , index) => {
            return (<CollectionCard key={index} collection={collection}/>) 
          })
        }
      </>
          
    ) 
   
}

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCollections = async (e) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch( `/api/collection/`,
      {
        method: 'GET'
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }
     const lista = await response.json();
     setLoading(false);
     setCollections(lista);
     
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
      <div className="w-full flex flex-wrap justify-center">
          {loading &&
              <Loading/>
          }
          {!loading && collections.length > 0 &&
            <CollectionList data={collections} />
          }
      </div>
  );
};
export default Collection;
