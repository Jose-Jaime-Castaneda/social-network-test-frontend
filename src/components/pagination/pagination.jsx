export default function Pagination({
  currentPage,
  pages,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
}) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <a className="page-link" href="#" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={handlePrevPage}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={handleNextPage}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
