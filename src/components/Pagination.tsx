function Pagination({
  activePage,
  changePage,
  totalRows,
}: {
  activePage: number;
  changePage: (page: number) => void;
  totalRows: number;
}) {
  const paginationPages = Array.from(
    { length: Math.ceil(totalRows / 18) },
    (_, index) => index + 1
  );

  return (
    <nav aria-label="pagination" className="main__pagination">
      <ul className="pagination">
        {paginationPages.map((page) => (
          <li
            className={"page-item" + (page === activePage ? " active" : "")}
            key={page}
            onClick={() => {
              changePage(page);
            }}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
