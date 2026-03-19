import Link from 'next/link';

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination">
      {currentPage > 1 && (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="pagination-btn"
        >
          ← prev
        </Link>
      )}

      <span className="pagination-info">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="pagination-btn"
        >
          next →
        </Link>
      )}
    </nav>
  );
}
