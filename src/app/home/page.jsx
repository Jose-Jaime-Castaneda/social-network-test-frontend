"use client";
import { useEffect, useState } from "react";
import { getFeed } from "@/utils/user";
import { useRouter } from "next/navigation";
import "./styles/home.css";
import NavBar from "@/components/navbar/navbar";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(1);
  const [id, setId] = useState(1);
  const [publications, setPublications] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(1);

  const handleNextPage = () => {
    if (currentPage < pages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchData();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/user");
  };

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedID = localStorage.getItem("user");
      if (!storedToken) {
        router.push("/");
      } else {
        setToken(storedToken);
        setId(storedID);
        const fy = await getFeed(storedToken, currentPage);
        setPublications(fy.publicaciones);
        setPages(fy.paginas);
        setItemsPerPage(fy.ppp);
        setTotalItems(fy.total);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  //console.log(token, "ojoojojojojooojojojoo", id);

  return (
    <main className="mainContainer">
      <NavBar
        token={token}
        onLogout={handleLogout}
        profile={handleProfile}
      />
      {publications &&
        publications.map((publication) => (
          <article key={publication._id}>
            <div className="publicationHeader">
              <img
                src={`http://localhost:4000/api/user/profileImg/${publication.user.image}`}
                alt="profile-image"
              />
              <p>
                {publication.user.name}, {publication.user.lastname}
              </p>
              <p className="nick">{publication.user.nick}</p>
            </div>
            <div className="publicationBody">
              <img
                src={`http://localhost:4000/api/publication/get-img/${publication.file}`}
                alt="publication img"
              />
              <p>{publication.text}</p>
            </div>
            <div className="publicationFooter">
              <p>{publication.create_at}</p>
            </div>
          </article>
        ))}
      {publications && (
        <div className="paginationInfo">
          <p>
            Página {currentPage} de {pages}
          </p>
          <p>
            Mostrando {itemsPerPage} de {totalItems}
          </p>
        </div>
      )}
      {publications && (
        <div className="paginationButtons">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            {"<"}
          </button>
          <button onClick={handleNextPage} disabled={currentPage === pages}>
            {">"}
          </button>
        </div>
      )}
    </main>
  );
}
