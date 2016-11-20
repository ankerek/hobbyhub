import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { FormGroup, FormControl, InputGroup, Button, Well } from 'react-bootstrap';

import { getAllCategories } from '../../reducers';
import CategoryIcon from '../../components/CategoryIcon';
import { bm, be } from '../../utils/bem';

export const mapStateToProps = (state) => ({
  categories: getAllCategories(state),
});

export const renderSearchFilters = ({
  categoryId,
  categories,
}) => (
  <Well>
    <div className="u-spacing20px">
      <div className={bm('Grid', 'multiCol justifyCenter alignMiddle wrap fit gutterA10px')}>
        {categories.map(category => {
          const isSelected = category._id === categoryId;
          const linkTo = isSelected ? '/events' : `/events/categories/${category._id}`;

          return (
            <div className={be('Grid', 'cell')} key={category._id}>
              <Link to={linkTo}>
                <CategoryIcon category={category} size={48}
                              isSelected={isSelected}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    <div className={`${bm('Grid', 'multiCol fit justifyCenter alignMiddle gutterA10px')}`}>
      {categoryId ? (
        <div className={`${be('Grid', 'cell')}`}>
          <Link className="btn btn-primary" to="/events">Clear Filters</Link>
        </div>
      ) : (
        null
      )}
      <div className={`${be('Grid', 'cell')} u-flexOne`}>
        <FormGroup className="u-spacingNone">
          <InputGroup>
            <FormControl type="text" placeholder="Enter event name..." />
            <InputGroup.Button>
              <Button bsStyle="success">Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    </div>
  </Well>
);

renderSearchFilters.propTypes = {
  categoryId: T.string,
  categories: T.array.isRequired,
};

const SearchFilters = compose(
  connect(mapStateToProps),
)(renderSearchFilters);

export default SearchFilters;
