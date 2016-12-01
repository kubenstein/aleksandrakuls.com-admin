import React from 'react'
import ConcertList from './concert-list.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'

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