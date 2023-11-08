import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem.jsx';

function CategoryList({ categories, currentCategory, onCategoryClick }) {
  return (
    <div className="mb-7">
      <h1 className="text-xl font-bold mb-5">Diskusi Berdasarkan Kategori</h1>
      { categories.map((category) => (
        <CategoryItem
          key={category}
          name={category}
          isCurrentlySelected={category === currentCategory}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
}
CategoryList.propTypes = {
  categories: PropTypes.arrayOf(String).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
};

export default CategoryList;
