import React, { PropTypes as T } from 'react';

const fetchData = (fetchFunc) => 
  function wrapWithFetch(WrappedComponent) {
    return class extends React.Component {
      componentDidMount() {
        this.props.dispatch(fetchFunc());
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        )
      }
    }
  }

fetchData.propTypes = {
  fetchFunc: T.func.isRequired,
};

export default fetchData;