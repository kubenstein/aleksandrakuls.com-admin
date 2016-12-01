import React from 'react'
import ConcertList from './concertList.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ConcertList />
        <Footer />
      </div>
    )
  }
}