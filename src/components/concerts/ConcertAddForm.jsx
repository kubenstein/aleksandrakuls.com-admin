import React from 'react';
import { Link, hashHistory } from 'react-router';
import serialize from 'form-serialize';
import ConcertsRepository from 'store/repositories/ConcertsRepository.js';

export default class ConcertAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.repo = new ConcertsRepository();
    this.state = { concert: this.repo.empty() };
  }

  formUpdated() {
    const {date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = {date, textPL, textEN };
    this.setState({ concert: concert });
  }

  submit(e) {
    e.preventDefault();
    const concert = this.state.concert;
    this.repo.add(concert).then(() => {
      hashHistory.push('/concerts/');
    });
  }

  render() {
    const concert = this.state.concert;
    return (
      <div>
        <h1>Add concert Form</h1>
        <form id="addConcertForm" onSubmit={(e) => { this.submit(e); }} ref={(c) => { this.form = c; }} >
          date:
          <input
            type="date"
            name="date"
            onChange={() => { this.formUpdated(); }}
            placeholder="date"
          />

          <br />

          textPL:
          <textarea
            name="textPL"
            value={concert.textPL}
            onChange={() => { this.formUpdated(); }}
            placeholder="textPL"
          />

          <br />

          textEn:
          <textarea
            name="textEN"
            value={concert.textEN}
            onChange={() => { this.formUpdated(); }}
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
