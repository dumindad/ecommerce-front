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

    return (
        <Wrapper>


            {
                currentPage - 1 >= 1 && (
                    <>
                        <NavLink href={`/products?page=${privesPage}&limit=${limit}`}>{'<<'} </NavLink>
                    </>
                )
            }
            {
                pageNumbers.map((page) =>(
                    router.query.page == page ? 
                        
                            <NavLink key={page} href={`/products?page=${page}&limit=${limit}`}
                                style={{ color: '#BF4F74' }}
                            
                            > {page}
                            </NavLink>
                            :
                            <NavLink key={page} href={`/products?page=${page}&limit=${limit}`} > 
                            {page}
                            </NavLink>
                        
                )
                )

            }

            {
                currentPage + 1 <= totalPages && (
                    <>
                        <NavLink href={`/products?page=${nextPage}&limit=${limit}`}>{'>>'} </NavLink>
                    </>
                )
            }

        </Wrapper>
    )

}


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const NavLink = styled(Link)`
  display: block;
  /* color:#aaa; */
  color:#000;
  text-decoration:none;
  padding: 20px ;
  @media screen and (min-width: 768px) {
    padding:20px;
  }
`;

export default Pagination