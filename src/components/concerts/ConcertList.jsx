import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { values } from 'lodash';
import ConcertListItem from './ConcertListItem.jsx';

function ConcertList(props) {
  const concerts = props.concerts;
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

function mapStateToProps(state) {
  return {
    concerts: values(state.concertsState.concerts)
  };
}

export default connect(
  mapStateToProps
)(ConcertList);
