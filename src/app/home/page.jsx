"use client";
import { useEffect, useState } from "react";
import { getFeed } from "@/utils/user";
import { useRouter } from "next/navigation";
import "./styles/home.css";
import NavBar from "@/components/navbar/navbar";
import Pagination from "@/components/pagination/pagination";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(1);
  const [publications, setPublications] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = async () => {
    setIsLoading(true);
    if (currentPage < pages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchData();
    }
  };
  const handlePrevPage = async () => {
    setIsLoading(true);
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchData();
    }
  };
  const handlePageClick = async (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
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
      if (!storedToken) {
        router.push("/");
      } else {
        setToken(storedToken);
        const fy = await getFeed(storedToken, currentPage);
        setPublications(fy.publicaciones);
        setPages(fy.paginas);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <strong role="status">Loading</strong>
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Loading</span>
        </div>
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Loading</span>
        </div>
        <div className="spinner-grow spinner-grow-sm" role="status">
          <span className="visually-hidden">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <main className="mainContainer">
      <NavBar token={token} onLogout={handleLogout} profile={handleProfile} />
      {publications &&
        publications.map((publication) => (
          <div key={publication._id} className="row mainCard">
            <div className="col">
              <div className="card h-100">
                <div className="card-header">
                  <div className="row publicationHeader">
                    <img
                      className="imgProfile"
                      src={`http://localhost:4000/api/user/profileImg/${publication.user.image}`}
                      alt="profile-image"
                    />
                    <h5 className="card-title">
                      {publication.user.name}, {publication.user.lastname}
                    </h5>
                  </div>
                </div>
                <img
                  className="card-img-top publicationImg"
                  src={`http://localhost:4000/api/publication/get-img/${publication.file}`}
                  alt="publication img"
                />
                <div className="card-body">
                  <p className="card-text">{publication.text}</p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    {publication.create_at}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      {publications && (
        <Pagination
          currentPage={currentPage}
          pages={pages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
        />
      )}
    </main>
  );
}
