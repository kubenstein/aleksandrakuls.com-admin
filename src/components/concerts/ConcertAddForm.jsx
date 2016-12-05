import React from 'react';
import { Link } from 'react-router';
import serialize from 'form-serialize';

export default class ConcertAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { concert: {} };
  }

  submit(e) {
    e.preventDefault();
    const { id, date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = { id, date, textPL, textEN };

    // TODO: do something
  }

  render() {
    const concert = this.state.concert;
    return (
      <div>
        <h1>Add concert</h1>
        <form onSubmit={(e) => { this.submit(e); }} ref={(c) => { this.form = c; }} >
          date:
          <input
            type="text"
            name="date"
            value={concert.date}
            onChange={() => {}}
            placeholder="date"
          />

          <br />

          textPL:
          <textarea
            name="textPL"
            value={concert.textPL}
            onChange={() => {}}
            placeholder="textPL"
          />

          <br />

          textEn:
          <textarea
            name="textEN"
            value={concert.textEN}
            onChange={() => {}}
            placeholder="textEN"
          />

          <br />

          <input type="submit" value="Add" />
        </form>
        <Link to="/concerts/">Back</Link>
      </div>
    );
  }
}
