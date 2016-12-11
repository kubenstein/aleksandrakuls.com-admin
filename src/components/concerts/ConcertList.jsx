import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchConcerts } from 'actions/fetch-concerts';
import ConcertListItem from './ConcertListItem.jsx';

class ConcertList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchConcerts());
  }

  render() {
    const concerts = this.props.concerts;
    return (
      <div>
        <h1>Concert list</h1>
        <Link to="/concerts/new">Add New Concert</Link>
        <ul>
          { concerts.map(concert =>
            <ConcertListItem key={concert.date} concert={concert} />
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    concerts: state.concertsState.concerts
  };
}

export default connect(
  mapStateToProps
)(ConcertList);
