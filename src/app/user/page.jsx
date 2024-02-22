"use client";
import { useState, useEffect } from "react";
import { userProfile, editUserInfo } from "@/utils/user";
import { useRouter } from "next/navigation";
import "./styles/profile.css";

export default function UserInfo() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState(1);
  const [userID, setUserID] = useState("");
  const [newName, setNewName] = useState("");
  const [newLastname, setLastname] = useState("");
  const [newNick, setNewNick] = useState("");

  const handleButton = () => {
    router.push("/home");
  };

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const handleNickChange = (e) => {
    setNewNick(e.target.value);
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      const currentUser = {
        name: newName,
        lastname: newLastname,
        nick: newNick,
      };
      const newUser = await editUserInfo(token, currentUser);
      setUser(newUser.user);
      setNewName('');
      setNewNick('');
      setLastname('');
      setModalVisible(false);
      localStorage.setItem('token', newUser.token);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const currentToken = localStorage.getItem("token");
      const currentID = localStorage.getItem("user");
      if (!currentToken || !currentID) {
        router.push("/");
        throw new Error("No se detecto el token o el ID");
      } else {
        setToken(currentToken);
        setUserID(currentID);
        const userInfo = await userProfile(currentToken, currentID);
        setUser(userInfo.user);
        if (userInfo.error) {
          console.log(userInfo);
        } else {
          console.log(userInfo);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {user && (
        <section className="profileSection">
          <div className="profileImg">
            <img
              src={`http://localhost:4000/api/user/profileImg/${user.image}`}
              alt="profile-img"
            />
          </div>
          <div className="profileInfo">
            <p className="p1">{user.name}</p>
            <p className="p2">{user.lastname}</p>
            <p className="p3">({user.nick})</p>
          </div>
          <button onClick={handleButton}>Volver</button>
          <button onClick={handleEdit}>Editar</button>
        </section>
      )}
      {modalVisible && (
        <div className="modal">
          <form onSubmit={handleEditUser} className="formEdit">
            <label>
              Nuevo nombre:{" "}
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                placeholder="nombre"
              />
            </label>
            <label>
              Nuevo apellido:{" "}
              <input
                type="text"
                value={newLastname}
                onChange={handleLastnameChange}
                placeholder="apellido"
              />
            </label>
            <label>
              Nuevo nick:{" "}
              <input
                type="text"
                value={newNick}
                onChange={handleNickChange}
                placeholder="nickname"
              />
            </label>
            <input type="submit" className="enviar" value={"Editar"} />
          </form>
          <button onClick={() => setModalVisible(false)}>Cerrar modal</button>
        </div>
      )}
    </div>
  );
}
