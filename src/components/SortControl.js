import React from 'react';
import PropTypes from 'prop-types';

const SortControls = ({ orderBy, sortBy, setOrderBy, setSortBy }) => {
    return (
        <div className="flex mb-8">
            <div className="flex flex-col items-start  mr-5">
                <p className="mb-2">Order By</p>
                <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
            <div className="flex flex-col items-start">
                <p className="mb-2">Sort By</p>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Popular</option>
                    <option value="activity">Activity</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </div>
    );
};

SortControls.propTypes = {
    orderBy: PropTypes.string,
    sortBy: PropTypes.string,
    setOrderBy: PropTypes.func,
    setSortBy: PropTypes.func
};

export default SortControls;
