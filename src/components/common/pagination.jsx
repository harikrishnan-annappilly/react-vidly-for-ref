import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, pageChange } = props;
    const pages = itemsCount / pageSize;
    if (pages <= 1) return null;
    const pageArray = _.range(1, pages + 1);

    return (
        <ul className="pagination">
            {pageArray.map((page) => (
                <li
                    key={page}
                    className={
                        page === currentPage ? "page-item active" : "page-item"
                    }
                >
                    <a onClick={() => pageChange(page)} className="page-link">
                        {page}
                    </a>
                </li>
            ))}
        </ul>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
};

export default Pagination;
