export const ListPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="list-pagination" aria-label="Pagination">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>
      <span className="list-pagination-info">
        {page} <span className="list-pagination-sep">/</span> {totalPages}
      </span>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next ›
      </button>
    </nav>
  );
};

export default ListPagination;