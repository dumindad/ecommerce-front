import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";


export default function ProductsPage({ products, totalProducts }) {
  console.log("products", products)


  return (
    <>
      <Header />
      <Center>
        <Title>Products Catalog</Title>
        <SearchFilter getSearchResults={products.products}/>
        <ProductsGrid products={products.products} />
        <Pagination totalProducts={totalProducts} products={products} />
      </Center>
    </>
  );
}



export async function getServerSideProps({query}) {
//  const db =  
 await mongooseConnect();

 const page = Number(query.page);
 const limit = Number(query.limit);
 const search = String(query.search);
  // const limit = 10;
  console.log("page", page)
  console.log("limit22", limit)
  
  const startIndex = (page - 1 )* limit
  const endIndex = page * limit
  console.log("startIndex", startIndex)
  console.log("endIndex", endIndex)
  
  const results = {}
  let totalProducts = await Product.count("title")
  
    results.products = await Product.find({}, null, { sort: { '_id': -1 } }).limit(limit).skip(startIndex).exec();
    
  
    // results.products = await Product.find({$text: {$search: (search)}}, null, { sort: { '_id': -1 } }).limit(limit).skip(startIndex).exec();

  
  // const products = await Product.find({}, null, { sort: { '_id': -1 } }).limit(limit);
  // if(endIndex < await results.products.countDocuments().exec()){
  console.log("totalProducts", totalProducts)
if(endIndex < totalProducts){

  results.next = {
    page:page + 1,
    limit: limit
  }
}

if(startIndex > 0 ){

  results.previous = {
    page:page - 1,
    limit: limit
  }
}
  

  // next()
  // console.log("db products ", results)
  return {
    props: {
      products: JSON.parse(JSON.stringify(results)),
      // images: JSON.parse(JSON.stringify())
      totalProducts: totalProducts,
    }
  };
}