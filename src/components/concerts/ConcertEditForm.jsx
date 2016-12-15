import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
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
        <h1>Edit concert</h1>
        {errors.length ?
          <div>
            <p>Errors:</p>
            <ul>
              { errors.map(error =>
                <li key={error}>{error}</li>
              )}
            </ul>
          </div>
          : ''
        }
        <form id="concertForm" onSubmit={(e) => { this.submit(e); }} ref={(f) => { this.form = f; }} >
          date:
          <input
            type="date"
            name="date"
            value={concert.date}
            placeholder="date"
            onChange={() => { this.formUpdated(); }}
          />
          <br />

          textPL:
          <textarea
            name="textPL"
            value={concert.textPL}
            placeholder="textPL"
            onChange={() => { this.formUpdated(); }}
          />
          <br />

          textEn:
          <textarea
            name="textEN"
            value={concert.textEN}
            placeholder="textEN"
            onChange={() => { this.formUpdated(); }}
          />
          <br />

          <input type="hidden" name="id" value={concert.id} />
          <input type="submit" value="Edit" />
        </form>
        <Link to="/concerts/">Back</Link>
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
