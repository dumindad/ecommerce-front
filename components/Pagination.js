'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from "styled-components";


function Pagination({ products, totalProducts }) {
    const [activeLink, setActiveLink] = useState()
    const searchParams = useSearchParams()
    const router = useRouter()
    // const search = searchParams.get('/products')
    // console.log(search)
    console.log(router.query.page);


    const totalData = totalProducts;
    const dataPerPage = 10;

    const totalPages = Math.ceil(totalData / dataPerPage);
    let currentPage = 1;

    console.log("totalPages", totalPages)
    if (Number(router.query.page) >= 1) {
        currentPage = Number(router.query.page)
    }
    //         let limit = (currentPage - 1) * dataPerPage;
    // console.log("limit", limit)
    let limit = 10;

    let pageNumbers = [];

    for (let i = currentPage - 3; i <= currentPage + 3; i++) {

        if (i < 1) continue;
        if (i > totalPages) break;

        pageNumbers.push(i)
    }
    let nextPage = currentPage + 1
    let privesPage = currentPage - 1
    // console.log(pageNumbers)

    return (
        <div>
            <NavUnlisted>

                {
                    currentPage - 1 >= 1 && (
                        <>
                            <Link href={`/products?page=${privesPage}&limit=${limit}&limit_titles=${dataPerPage}`}>{'<<'} </Link>
                        </>
                    )
                }
                {
                    pageNumbers.map((page) =>
                   
                    <Link key={page} href={`/products?page=${page}&limit=${limit}&limit_titles=${dataPerPage}`}
                    // style={page === currentPage ? linkStyle : ""}
                    // style={`${page == currentPage ? {linkStyle} : "" }`}
                    // style={page === currentPage ? {color:'#BF4F74'} : ""}
                    > {page} 
                    </Link>,
                    )
                }

                {
                    currentPage + 1 <= totalPages && (
                        <>
                            <Link href={`/products?page=${nextPage}&limit=${limit}&limit_titles=${dataPerPage}`}>{'>>'} </Link>
                        </>
                    )
                }
            </NavUnlisted>
        </div>
    )

}
const NavUnlisted = styled.ul`
  text-decoration: none;
  display:"flex", gap: "2rem",
  justifyContent:"center"
`;
const linkStyle = {
   color: "#BF4F74",
//    fontweight: 'bold',
     
};

export default Pagination