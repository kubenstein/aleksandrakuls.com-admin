import React from 'react';
import { Link, hashHistory } from 'react-router';
import serialize from 'form-serialize';
import ConcertsRepository from 'store/repositories/ConcertsRepository.js';

export default class ConcertEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.repo = new ConcertsRepository();
    this.state = { concert: this.repo.empty() };

    const id = this.props.params.concertId;
    this.fetchConcert(id);
  }

  fetchConcert(id) {
    this.repo.find(id).then((concert) => {
      this.setState({ concert: concert });
    });
  }

  formUpdated() {
    const { id, date, textPL, textEN } = serialize(this.form, { hash: true });
    const concert = { id, date, textPL, textEN };
    this.setState({ concert: concert });
  }

  submit(e) {
    e.preventDefault();
    const concert = this.state.concert;
    this.repo.update(concert).then(() => {
      hashHistory.push('/concerts/');
    });
  }

  render() {
    const concert = this.state.concert;
    return (
      <div>
        <h1>Edit concert</h1>
        <form id="editConcertForm" onSubmit={(e) => { this.submit(e); }} ref={(c) => { this.form = c; }} >
          date:
          <input
            type="date"
            name="date"
            value={concert.date}
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

          <input type="hidden" name="id" value={concert.id} />
          <input type="submit" value="Edit" />
        </form>
        <Link to="/concerts/">Back</Link>
      </div>
    );
  }
}
