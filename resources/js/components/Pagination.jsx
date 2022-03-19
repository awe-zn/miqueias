import PropTypes from 'prop-types';

import { usePagination } from '../hooks/usePagination';

export const Pagination = ({
  totalItems,
  currentPage,
  handleChangePage,
  pageSize,
  siblingCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <nav>
      <ul className="pagination justify-content-end mt-3">
        {paginationRange.map((pageNumber) => {
          if (typeof pageNumber === 'string')
            return (
              <li className="page-link disabled" key={pageNumber}>
                ...
              </li>
            );

          return (
            <li
              className={`page-item ${
                currentPage === pageNumber ? 'active' : ''
              }`.trim()}
              key={pageNumber}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => handleChangePage(Number(pageNumber))}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
};
Pagination.defaultProps = {
  siblingCount: 1,
};
