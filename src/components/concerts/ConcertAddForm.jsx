import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import addConcert from 'actions/add-concert';

class ConcertAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { concert: {}, errors: [] };
  }

  onSuccess() {
    hashHistory.push('/concerts/');
  }

  onFail(errors) {
    this.setState({ errors: errors });
  }

  formUpdated() {
    const { date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = { date, textPL, textEN };
    this.setState({ concert: concert });
  }

  submit(e) {
    e.preventDefault();
    const concert = this.state.concert;
    addConcert(concert, this.props.dispatch).then(
      () => { this.onSuccess(); },
      (errors) => { this.onFail(errors); }
    );
  }

  render() {
    const concert = this.state.concert;
    const errors = this.state.errors;
    return (
      <div>
        <div className="additional">
          <Link to="/concerts/" className="item btn btn-warning">Back</Link>
        </div>
        <div className="form-wrapper">
          <h1 className="page-title">Add Concert Form</h1>
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
            onChange={() => { this.formUpdated(); }}
            onSubmit={(e) => { this.submit(e); }}
            ref={(f) => { this.form = f; }}
          >
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" className="input" />

            <label htmlFor="textPL">text (PL):</label>
            <textarea id="textPL" name="textPL" className="input longer-text" value={concert.textPL} />

            <label htmlFor="textEN">text (EN):</label>
            <textarea id="textEN" name="textEN" className="input longer-text" value={concert.textEN} />

            <input type="submit" value="Add a Concert" className="btn btn-warning" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(ConcertAddPage);
