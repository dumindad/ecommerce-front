import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import Image from "next/image";
import BgUrl from '@/public/logo/header_bg.png'


const StyledHeader = styled.header`
  background-color: #fff;
  /* background-color: #222; */
`;
const Logo = styled(Link)`
  color:#222;
  text-decoration:none;
  position: relative;
  top: 0;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  
  align-items: center;
  /* top: 0;
  bottom: 0; */
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #fff;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: #aaa;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  let limit = 10;
  let page = 1
  
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          
          <Logo href={'/'}>
          <Image src='https://res.cloudinary.com/ds5zhj9f2/image/upload/v1689993262/logo/Logo_v2_sfeoci.png' 
         style={{objectFit: "contain"}} alt="Edmond's Logo" height={60} width={200} />
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
             {/* <NavLink href={'/products'}>All products</NavLink> */}
             <NavLink href={`/products?page=${page}&limit=${limit}`}>All products</NavLink>
            {/* <NavLink href={'/categories'}>Categories</NavLink> */}
            {/* <NavLink href={'/account'}>Account</NavLink> */}
            <NavLink href={'/SignIn'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}