import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import addConcert from 'actions/add-concert';

class ConcertAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { concert: {} };
  }

  formUpdated() {
    const { date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = { date, textPL, textEN };
    this.setState({ concert: concert });
  }

  submit(e) {
    e.preventDefault();
    const concert = this.state.concert;
    addConcert(concert, this.props.dispatch).then(() => {
      hashHistory.push('/concerts/');
    });
  }

  render() {
    const concert = this.state.concert;
    return (
      <div>
        <h1>Add concert Form</h1>
        <form
          id="addConcertForm"
          onChange={() => { this.formUpdated(); }}
          onSubmit={(e) => { this.submit(e); }}
          ref={(f) => { this.form = f; }}
        >
          date:
          <input type="date" name="date" placeholder="date" />
          <br />

          textPL:
          <textarea name="textPL" value={concert.textPL} placeholder="textPL" />
          <br />

          textEn:
          <textarea name="textEN" value={concert.textEN} placeholder="textEN" />
          <br />

          <input type="submit" value="Add" />
        </form>
        <Link to="/concerts/">Back</Link>
      </div>
    );
  }
}

export default connect()(ConcertAddPage);
