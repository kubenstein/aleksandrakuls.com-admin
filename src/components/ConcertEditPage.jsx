import React from 'react'
import ConcertsRepository from '../data/ConcertsRepository.jsx'

export default class ConcertEditPage extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.params.concertId
    this.state = {concert: new ConcertsRepository().find(id)}
  }

  render() {
    const concert = this.state.concert
    return (
      <div>
        <h1>Edit concert</h1>
        date: {concert.date}<br />
        textPL: {concert.textPL}<br />
        textEN: {concert.textEN}<br />
      </div>
    )
  }
}