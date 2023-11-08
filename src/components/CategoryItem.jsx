import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ name, isCurrentlySelected, onCategoryClick }) {
  return (
    <button
      onClick={() => onCategoryClick({ name, isCurrentlySelected })}
      type="button"
      className={`${isCurrentlySelected ? ('dark:bg-gray-600 hover:bg-gray-900') : ('dark:bg-gray-900 hover:bg-gray-600')} mx-1 p-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg  dark:text-gray-100 dark:border-gray-500`}
    >
      #
      {name}
    </button>
  );
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  isCurrentlySelected: PropTypes.bool.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default CategoryItem;
