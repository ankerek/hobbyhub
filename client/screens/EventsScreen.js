import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { Grid, Row, Col, Jumbotron, FormGroup, FormControl, InputGroup, Button, Image, Well } from 'react-bootstrap';

import { getAllEvents, getAllCategories } from '../reducers';
import { fetchEvents } from '../actions/events';
import fetchData from '../components/fetchData';
import CategoryIcon from '../components/CategoryIcon';
import EventsGrid from '../components/EventsGrid';
import { bm, be } from '../utils/bem';

export const mapStateToProps = (state) => ({
  categories: getAllCategories(state),
  events: getAllEvents(state),
});

export const EventsScreenView = ({
  categories,
  events,
}) => (
  <div>
    <Well>
      <div className="u-spacing20px">
        <div className={bm('Grid', 'multiCol justifyCenter alignMiddle wrap fit gutterA10px')}>
          {categories.map(category => (
            <div className={be('Grid', 'cell')} key={category._id}>
              <Link to={`/events/categories/${category._id}`}>
                <CategoryIcon category={category.name} size={48} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <FormGroup className="u-spacingNone">
        <InputGroup>
          <FormControl type="text" placeholder="Enter event name..." />
          <InputGroup.Button>
            <Button bsStyle="success">Search</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Well>
    <h2 className="u-spacing20px">Events</h2>
    <div className="u-spacing80px">
      <EventsGrid events={events} />
    </div>
  </div>
);

EventsScreenView.propTypes = {
  categories: T.array.isRequired,
  events: T.array.isRequired,
};

const EventsScreen = compose(
  connect(mapStateToProps),
  fetchData(fetchEvents),
)(EventsScreenView);

export default EventsScreen;
