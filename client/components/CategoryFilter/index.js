import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';

import { getAllCategories } from '../../reducers';
import { getActiveCategories } from '../../reducers/search';
import CategoryIcon from '../../components/CategoryIcon';
import { bm, be } from '../../utils/bem';

export const mapStateToProps = (state) => ({
  categories: getAllCategories(state),
  activeCategories: getActiveCategories(state.search),
});

export const renderSearchFilters = ({
  categories,
  activeCategories = [],
  onClick,
}) => (
  <div className="u-spacing20px">
    <div className={bm('Grid', 'multiCol justifyCenter alignMiddle wrap fit gutterA10px')}>
      {categories.map(category => {
        const isSelected = activeCategories && activeCategories.includes(category.name);

        return (
          <div className={be('Grid', 'cell')} key={category._id}>
            <CategoryIcon category={category} 
                          size={48}
                          isSelected={isSelected}
                          onClick={() => {
                              onClick(category)
                            }
                          }
            />
          </div>
        );
      })}
    </div>
  </div>
);

renderSearchFilters.propTypes = {
  categoryId: T.string,
  categories: T.array.isRequired,
};

const CategoryFilter = compose(
  connect(mapStateToProps),
)(renderSearchFilters);

export default CategoryFilter;
