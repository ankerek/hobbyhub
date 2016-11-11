import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { fetchEvents } from '../actions/events';
import { getAllEvents } from '../reducers';

import { Grid, Row, Col, Button, Jumbotron, FormGroup, FormControl, Well, Image } from 'react-bootstrap';
import EventRow from '../components/EventRow';

export const mapStateToProps = (state) => ({
  categories: state.categories,
  events: getAllEvents(state),
});


export const fetchHoc = (fetch) => {
  return function wrapWithFetch(WrappedComponent) {
    return class extends React.Component {
      componentDidMount() {
        this.props.dispatch(fetch());
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        )
      }
    }
  }
}

export const EventsScreenView = ({
  categories,
  events,
}) => (
  <div>
    <Jumbotron>
      <Grid>
        <Row>
          <Col lg={8}>
            {categories.map(category => (
                <Link key={category.id} to={`/events/categories/${category.id}`}><Image src="http://placehold.it/40x40" alt={category.name} style={{marginRight: 1 + 'em'}}></Image></Link>
            ))}
          </Col>
          <Col lg={4}>
            <FormGroup>
              <FormControl type="text" placeholder="Enter event name..." />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
      <p>
        More filters...
      </p>
    </Jumbotron>
      <h2>Events</h2>
      {events.map(event => (<EventRow key={event._id} event={event} />))}
  </div>
);

EventsScreenView.propTypes = {
  categories: T.array.isRequired,
  events: T.array.isRequired,
};

const EventsScreen = compose(
  connect(mapStateToProps),
  fetchHoc(fetchEvents),
)(EventsScreenView);

export default EventsScreen;
