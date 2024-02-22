"use client";
import { useState, useEffect } from "react";
import { userProfile } from "@/utils/user";
import { useRouter } from "next/navigation";
import "./styles/profile.css";

export default function UserInfo() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [token, setToken] = useState(1);
  const [userID, setUserID] = useState("");

  const handleButton = () => {
    router.push("/home");
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
        </section>
      )}
    </div>
  );
}
