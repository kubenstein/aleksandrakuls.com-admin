import React from 'react'
import ConcertListItem from './concertListItem.jsx'

var concerts = [
  {date: '1/12/2014', textPL: 'text PL 1', textEN: 'text EN 1'},
  {date: '2/12/2014', textPL: 'text PL 2', textEN: 'text EN 2'},
  {date: '3/12/2014', textPL: 'text PL 3', textEN: 'text EN 3'}
]

export default class ConcertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {concerts: concerts}
  }

  render() {
    return (
      <div>
        <h1>Concert list</h1>
        <ul>
          {this.state.concerts.map( (concert) => {
            return <ConcertListItem key={concert.date}
                                    concert={concert} />
          })}
        </ul>
      </div>
    )
  }
}