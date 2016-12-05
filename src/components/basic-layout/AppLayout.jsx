import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function AppLayout(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
