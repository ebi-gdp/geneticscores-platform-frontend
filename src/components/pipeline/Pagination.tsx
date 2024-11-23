import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationType {
    pageCount: number,
    onPageChange: any,
    pageOffset: number
}

const Pagination = ({pageCount, onPageChange, pageOffset}: PaginationType) => {
    return (
        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={4}
            pageRangeDisplayed={10}
            onPageChange={onPageChange}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={pageOffset}
        />
    );
};
export default Pagination;
