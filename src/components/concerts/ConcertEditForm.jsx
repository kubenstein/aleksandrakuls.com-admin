import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import updateConcert from 'actions/update-concert';

class ConcertEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { concert: undefined };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ concert: nextProps.concert });
  }

  formUpdated() {
    const { id, date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = { id, date, textPL, textEN };
    this.setState({ concert: concert });
  }

  submit(e) {
    e.preventDefault();
    const concert = this.state.concert;
    updateConcert(concert, this.props.dispatch).then(() => {
      hashHistory.push('/concerts/');
    });
  }

  render() {
    const concert = this.state.concert;
    if (!concert) return null;

    return (
      <div>
        <h1>Edit concert</h1>
        <form id="editConcertForm" onSubmit={(e) => { this.submit(e); }} ref={(f) => { this.form = f; }} >
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
