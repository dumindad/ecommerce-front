"use client"

import React, { useState } from 'react'
import styled from 'styled-components';
import Input from './Input2';
import Button from './Button2';
import { signIn, getSession, getProviders, getCsrfToken } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import SignIn from '@/pages/SignIn';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const searchParams = useSearchParams();
const callbabackUrl = searchParams.get('callbackUrl') || '/'
    

    const onSubmit = (e) => {
        e.preventDefault()
        signIn('google', {
            email, password, callbabackUrl, 
            // csrfToken
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>

                <InputContainer>
                    <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>
                <ButtonContainer>
                    <Button content="Sign Up" />
                </ButtonContainer>
            </form>

        </>
    )
}

// LoginForm.getInitialProps = async(context) => {
//     const { req, res} = context;
//     const session = await getSession({req})

//     if(session && res && session.accessToken){
//         res.writeHead(302, {
//             Location: "/",
//         });
//         res.end()
//         return;
//     }
//     return{
//         session: undefined,
//         providers: await getProviders(context),
//         csrfToken: await getCsrfToken(context),
//     }
// }
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoginForm