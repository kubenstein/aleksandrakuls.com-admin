import React from 'react'
import { Link } from 'react-router'
import serialize from 'form-serialize'
import ConcertsRepository from 'data/ConcertsRepository.jsx'

export default class ConcertEditPage extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.params.concertId
    this.state = {concert: new ConcertsRepository().find(id)}
  }

  submit(e) {
    e.preventDefault();
    const {id, date, textPL, textEN} = serialize(this.refs.form, {hash: true});
    const concert = {id, date, textPL, textEN}

    // TODO: do something
    console.log(concert)
  }

  render() {
    const concert = this.state.concert
    return (
      <div>
        <h1>Edit concert</h1>
        <form autoComplete="off" onSubmit={(e) => { this.submit(e) }} ref='form'>
          date    <input type="text" name="date" value={concert.date} onChange={() => {}} placeholder="date" /> <br />
          textPL: <textarea name="textPL" value={concert.textPL} onChange={() => {}} placeholder="textPL" /> <br />
          textEn: <textarea name="textEN" value={concert.textEN} onChange={() => {}} placeholder="textEN" /> <br />
          <input type="hidden" name="id" value={concert.id} />
          <input type="submit" value="Edit" />
        </form>
        <Link to='/concerts/'>Back</Link>
      </div>
    )
  }
}