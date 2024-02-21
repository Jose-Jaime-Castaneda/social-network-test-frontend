'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { login } from '@/utils/user';
import './styles/main.css';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = {
      email: email,
      password: password,
    }
    try {
      const userAuth = await login(currentUser);
      if (userAuth.status !== 'success') throw new Error('Valió la solicitud', userAuth);
      localStorage.setItem('token', userAuth.token);
      setEmail('');
      setPassword('');
      //console.log(userAuth);
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <div className='formContainer'>
        <div className='loginHeader'>
          <h4>Inicio de sesión</h4>
        </div>
        <div className='loginBody'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='userEmail'>Correo electronico o usuario</label>
            <input type='text' id='userEmail' value={email} onChange={handleEmailChange} autoComplete='email' placeholder='Ingrese su correo o nickname' />
            <label htmlFor='userPwd'>Contraseña</label>
            <input type='password' id='userPwd' value={password} onChange={handlePasswordChange} placeholder='Ingrese su contraseña' />
            <input type='submit' value={'Iniciar sesión'} />
          </form>
        </div>
        <div className='loginFooter'>
          <label>¿No tienes una cuenta? <Link href='/createUser' shallow={false} className='link'>Regístrate</Link></label>
        </div>
      </div>
    </section>
  );
}
