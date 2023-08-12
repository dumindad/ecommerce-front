"use client"
import React, { useState } from 'react'
import styled from 'styled-components';

import Button from './Button2';
import InputSearch from './InputSearch';
import { useRouter } from 'next/router';



function SearchFilter({getSearchResults}) {
    const [search, setSearch] = useState()
    const router = useRouter()
    console.log(router.query.page);

    const onSubmit = async (e) => {
        e.preventDefault()
    //   `/products?search=${search}&page=${privesPage}&limit=${limit}`
    // const response = await fetch(`/products?search=${search}`)
    router.push(
        { pathname: "/product/search", query: { search: search } },
       
      );
    // const products = await response.json()

    // getSearchResults(products);
    }

    return (

        <>
            <form onSubmit={onSubmit}>

                <InputContainer>
                    <InputSearch type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                  
                <ButtonContainer>
                    <Button content="Search" />
                </ButtonContainer>
                </InputContainer>
            </form>
        </>
    )
}

const InputContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* justify-content: space-around; */
  /* justify-content: space-between; */
  justify-content: center;
  justify-items: center;
  align-items: center;
  /* height: 20%;
  width: 100%; */
  height: 5px;
  width: 100%;
  margin: 3rem 3rem 3rem 3rem ;
`;

const ButtonContainer = styled.div`
  margin: 2rem 0 2rem 0;
  /* width: 100%; */
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SearchFilter