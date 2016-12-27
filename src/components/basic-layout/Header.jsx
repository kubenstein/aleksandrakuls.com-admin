import React from 'react';
import { Link } from 'react-router';

export default function Header() {
  return (
    <div className="header-section clearfix">
      <Link to="/" className="header">Aleksandra Kuls Admin</Link>
      <div className="nav">
        <Link className="nav-item" to="/concerts/">Mange Concerts</Link>
        <Link className="nav-item btn btn-danger" to="/deployment/">Deploy</Link>
      </div>
    </div>
  );
}
