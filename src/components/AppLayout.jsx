import React from 'react'
import Footer from 'components/Footer.jsx'
import Header from 'components/Header.jsx'

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