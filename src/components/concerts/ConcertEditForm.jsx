import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import ConcertDeleteButton from 'components/concerts/ConcertDeleteButton.jsx';
import updateConcert from 'actions/update-concert';

class ConcertEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { concert: undefined, errors: [] };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ concert: nextProps.concert });
  }

  onSuccess() {
    hashHistory.push('/concerts/');
  }

  onFail(errors) {
    this.setState({ errors: errors });
  }

  formUpdated() {
    const { id, date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = { id, date, textPL, textEN };
    this.setState({ concert: concert });
  }

  submit(e) {
    e.preventDefault();
    const concert = this.state.concert;
    updateConcert(concert, this.props.dispatch).then(
      () => { this.onSuccess(); },
      (errors) => { this.onFail(errors); }
    );
  }

  render() {
    const concert = this.state.concert;
    const errors = this.state.errors;
    if (!concert) return null;

    return (
      <div>
        <div className="additional">
          <Link to="/concerts/" className="item btn btn-warning">Back</Link>
          <ConcertDeleteButton className="item" concert={concert} />
        </div>
        <div className="form-wrapper">
          <h1 className="page-title">Edit Concert Form</h1>
          {errors.length ?
            <div className="errors">
              <ul>
                { errors.map(error =>
                  <li key={error}>{error}</li>
                )}
              </ul>
            </div>
            : ''
          }
          <form
            id="concertForm"
            onSubmit={(e) => { this.submit(e); }}
            ref={(f) => { this.form = f; }}
          >
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              className="input"
              onChange={() => { this.formUpdated(); }}
              value={concert.date}
            />

            <label htmlFor="textPL">text (PL):</label>
            <textarea
              id="textPL"
              name="textPL"
              className="input longer-text"
              onChange={() => { this.formUpdated(); }}
              value={concert.textPL}
            />

            <label htmlFor="textEN">text (EN):</label>
            <textarea
              id="textEN"
              name="textEN"
              className="input longer-text"
              onChange={() => { this.formUpdated(); }}
              value={concert.textEN}
            />

            <input type="hidden" name="id" value={concert.id} />
            <input type="submit" value="Edit the Concert" className="btn btn-warning" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const concertId = ownProps.params.concertId;
  return {
    concert: findConcert(concertId, state.concertsState.concerts)
  };
}

function findConcert(id, concerts) {
  return concerts[id];
}

export default connect(
  mapStateToProps
)(ConcertEditPage);
