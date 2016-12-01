import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { Button, InputGroup, Well, FormGroup, FormControl } from 'react-bootstrap';

import { getAllEvents, getAllCategories } from '../reducers';
import { fetchEvents, filterByCategory } from '../actions/events';
import fetchData from '../components/fetchData';
import EventsGrid from '../components/EventsGrid';
import CategoryFilter from '../components/CategoryFilter';
import CategoryIcon from '../components/CategoryIcon';
import { bm, be } from '../utils/bem';

export const mapStateToProps = (state) => ({
  upcomingEvents: getAllEvents(state),
  categories: getAllCategories(state),
});

export const mapDispatchToProps = {
  fetchEvents,
  filterByCategory,
}

class LandingScreenContainer extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return renderLandingScreen(this.props);
  }
}

export const renderLandingScreen = ({
  upcomingEvents,
  categories,
  filterByCategory,
}) => (
  <div>
    <div className={bm('Grid', '1col multiCol:60em alignMiddle gutterA5px')}>
      <div className={`${be('Grid', 'cell')} u-size4of12:60em`}>
        <p className="u-text24px">
          <span className="u-text50px">Wanna play?</span>
          <br />
          Soccer or chess
          <br />
          or anything<em>ness</em>?
        </p>
      </div>
      <div className={`${be('Grid', 'cell')} u-size4of12:60em`}>
        <div className={bm('Grid', 'multiCol fit alignMiddle gutterH20px')}>
          <div className={be('Grid', 'cell')}>
            <Link className="btn btn-success btn-lg" to="/sign-up">
              Sign Up Now
            </Link>
          </div>
          <div className={`${be('Grid', 'cell')} u-text30px`}>
            <p>
              and <strong>play!</strong>
            </p>
          </div>
        </div>
      </div>
      <div className={`${be('Grid', 'cell')} u-size4of12:60em`}>
        <Well>
          <CategoryFilter onClick={filterByCategory} />
        </Well>
      </div>
    </div>
    <div className="u-spacing20px">
      <div className={bm('Grid', 'multiCol fit alignMiddle gutterA10px')}>
        <div className={be('Grid', 'cell')}>
          <h2>Upcoming Events</h2>
        </div>
        <div className={`${be('Grid', 'cell')}`}>
          <Link className='btn btn-primary btn-sm' to="/events">See All</Link>
        </div>
      </div>
    </div>
    {upcomingEvents.length ? <EventsGrid events={upcomingEvents} /> : null}
  </div>
);

renderLandingScreen.propTypes = {
  upcomingEvents: T.array.isRequired,
  categories: T.array.isRequired,
};

const LandingScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LandingScreenContainer);

export default LandingScreen;
