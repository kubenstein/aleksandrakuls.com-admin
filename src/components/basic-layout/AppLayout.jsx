import React from 'react'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}