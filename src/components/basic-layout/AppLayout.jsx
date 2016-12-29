import 'assets/stylesheets/style.scss';

import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function AppLayout(props) {
  return (
    <div>
      <Header />
      <div className="page-wrapper">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
