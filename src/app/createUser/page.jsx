"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./styles/createUser.css";
import { create } from "@/utils/user";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleNickChange = (e) => {
    setNick(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const currentUser = {
        name: name,
        lastname: lastname,
        nick: nick,
        email: email,
        password: password,
      };
      const newUser = await create(currentUser);
      if (newUser.status !== 'success') throw new Error("Valió la solicitud", newUser);
      setName("");
      setLastName("");
      setNick("");
      setEmail("");
      setPassword("");
      //console.log(newUser);
      router.push('/');
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <section>
      <div className="formContainer">
        <div className="loginHeader">
          <h4>Inicio de sesión</h4>
        </div>
        <div className="loginBody">
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName">Nombre(s)</label>
            <input
              id="userName"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Ingrese su nombre(s)"
            />
            <label htmlFor="userLastname">Apellido(s)</label>
            <input
              id="userLastname"
              type="text"
              value={lastname}
              onChange={handleLastNameChange}
              placeholder="Ingrese su(s) apellido(s)"
            />
            <label htmlFor="userNick">Nombre de Usuario</label>
            <input
              id="userNick"
              type="text"
              value={nick}
              onChange={handleNickChange}
              placeholder="Ingrese su nombre de usuario"
            />
            <label htmlFor="userEmail">Correo electronico o usuario</label>
            <input
              id="userEmail"
              type="text"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              placeholder="Ingrese su correo o nickname"
            />
            <label htmlFor="userPwd">Contraseña</label>
            <input
              id="userPwd"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Ingrese su contraseña"
            />
            <input type="submit" value={"Crear cuenta"} />
          </form>
        </div>
        <div className="loginFooter">
          <label>
            ¿Ya tienes una cuenta?{" "}
            <Link href="/" shallow={false} className="link">
              Inicia sesion
            </Link>
          </label>
        </div>
      </div>
    </section>
  );
}
