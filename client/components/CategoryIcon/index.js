import React, { PropTypes as T } from 'react';
import ReactTooltip from 'react-tooltip';

import './index.scss';

import categoryIcons from '../../constants/categoryIcons';
import { bm, } from '../../utils/bem';

export const renderCategoryIcon = ({
  moduleName = 'CategoryIcon',
  modifiers = 'gray',
  category,
  isSelected,
  size = 64,
  onClick,
} = {}) => (
  <div className={`${bm(moduleName, modifiers)} ${isSelected ? 'is-selected' : ''}`} onClick={onClick}>
    <img data-tip
         data-for={`categoryIcon-${category.name}`}
         src={categoryIcons[category.name]}
         alt={category.name}
         width={size}
         height={size} />
    <ReactTooltip id={`categoryIcon-${category.name}`} effect="solid">
      {category.name}
    </ReactTooltip>
  </div>
);

renderCategoryIcon.propTypes = {
  category: T.object.isRequired,
  isSelected: T.bool,
  size: T.number,
};

const CategoryIcon = (renderCategoryIcon);

export default CategoryIcon;
