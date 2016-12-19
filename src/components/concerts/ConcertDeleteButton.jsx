import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import removeConcert from 'actions/remove-concert';

class ConcertDeleteButton extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({ concert: nextProps.concert });
  }

  onSuccess() {
    hashHistory.push('/concerts/');
  }

  onFail(_errors) {
    alert('There was error during concert remove process.');
  }

  cssClassNames() {
    return `${this.props.className} btn btn-danger`;
  }

  btnClicked() {
    const text = 'Are you sure you want to remove this concert?';
    if (confirm(text)) {
      const { concert, dispatch } = this.props;
      removeConcert(concert, dispatch).then(
        () => { this.onSuccess(); },
        (errors) => { this.onFail(errors); }
      );
    }
  }

  removeConcert() {
    const concert = this.props.concert;
    removeConcert(concert, this.props.dispatch).then(
      () => { this.onSuccess(); },
      (errors) => { this.onFail(errors); }
    );
  }

  render() {
    const concert = this.props.concert;
    if (!concert) return null;

    return (
      <button
        type="button"
        className={this.cssClassNames()}
        onClick={() => { this.btnClicked(); }}
      >
        Delete
      </button>
    );
  }
}

export default connect()(ConcertDeleteButton);
