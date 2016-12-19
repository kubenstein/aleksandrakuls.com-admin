import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { values } from 'lodash';
import ConcertDeleteButton from 'components/concerts/ConcertDeleteButton.jsx';

class ConcertList extends React.Component {

  linkTo(concert) {
    return `/concerts/${concert.id}`;
  }

  render() {
    const concerts = this.props.concerts;
    return (
      <div>
        <Link to="/concerts/new" className="additional btn btn-warning">Add New Concert</Link>
        <table className="table">
          <thead>
            <tr>
              <th data-field="date">Date</th>
              <th data-field="textPL">Text PL</th>
              <th data-field="textEN">Text EN</th>
              <th data-field="actions" className="actions" />
            </tr>
          </thead>
          <tbody>
            { concerts.map(concert =>
              <tr key={concert.date}>
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

function mapStateToProps(state) {
  return {
    concerts: values(state.concertsState.concerts)
  };
}

export default connect(
  mapStateToProps
)(ConcertList);
