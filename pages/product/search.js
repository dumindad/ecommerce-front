import { NextResponse } from "next/server"


import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function fetchSearch({ products, totalProducts }) {

    
  return (
    <div>search
        <ProductsGrid products={products.products} />
    </div>
  )
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
      
        // results.products = await Product.find({}, null, { sort: { '_id': -1 } }).limit(limit).skip(startIndex).exec();
        
      
        results.products = await Product.find({$text: {$search: (search)}}, null, { sort: { '_id': -1 } }).limit(limit).skip(startIndex).exec();
    
      
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