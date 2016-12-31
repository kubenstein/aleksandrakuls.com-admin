import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { values, filter } from 'lodash';
import ConcertDeleteButton from 'components/concerts/ConcertDeleteButton.jsx';

class ConcertList extends React.Component {

  linkTo(concert) {
    return `/concerts/${concert.id}`;
  }

  sortedConcerts() {
    return this.props.concerts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  render() {
    const concerts = this.sortedConcerts();
    return (
      <div>
        <h1 className="page-title">Concert List</h1>
        <Link to="/concerts/new" className="additional btn btn-warning">Add New Concert</Link>
        <table className="table">
          <thead>
            <tr>
              <th data-field="date" className="date">Date</th>
              <th data-field="textPL" className="long-text">Text PL</th>
              <th data-field="textEN" className="long-text">Text EN</th>
              <th data-field="actions" className="actions" />
            </tr>
          </thead>
          <tbody>
            { concerts.map(concert =>
              <tr key={concert.id}>
                <td>{concert.date}</td>
                <td>{concert.textPL}</td>
                <td>{concert.textEN}</td>
                <td className="actions">
                  <Link to={this.linkTo(concert)} className="item btn btn-warning">
                    Edit
                  </Link>
                  <ConcertDeleteButton className="item" concert={concert} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function concertsToList(concertsFromStore) {
  const allConcerts = values(concertsFromStore);
  return filter(allConcerts, (o) => { return !o.deletedAt; });
}

function mapStateToProps(state) {
  return {
    concerts: concertsToList(state.concertsState.concerts)
  };
}

export default connect(
  mapStateToProps
)(ConcertList);
