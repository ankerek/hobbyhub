import React, { PropTypes as T } from 'react';

import './index.scss';

import categoryIcons from '../../constants/categoryIcons';
import { bm, } from '../../utils/bem';

export const renderCategoryIcon = ({
  moduleName = 'CategoryIcon',
  modifiers = 'gray',
  category,
  size = 64,
} = {}) => (
  <div className={bm(moduleName, modifiers)}>
    <img src={categoryIcons[category]} alt={category} width={size} height={size} />
  </div>
);

renderCategoryIcon.propTypes = {
  category: T.string.isRequired,
  size: T.number,
};

const CategoryIcon = (renderCategoryIcon);

export default CategoryIcon;
