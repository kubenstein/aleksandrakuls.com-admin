import React from 'react'

export default class ConcertListItem extends React.Component {
  render() {
    const concert = this.props.concert;
    return (
      <li>date: {concert.date}, pl: {concert.textPL}, en: {concert.textEN}</li>
    )
  }
}