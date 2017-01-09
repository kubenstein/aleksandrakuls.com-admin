import React from 'react';
import { connect } from 'react-redux';
import values from 'lodash.values';
import filter from 'lodash.filter';

class SyncCounter extends React.Component {
  itemsToSync() {
    const itemsToSync = filter(this.props.concerts, (e) => {
      if (e.deletedAt) return true;
      if (!e.deployedAt) return true;
      return (new Date(e.updatedAt) > new Date(e.deployedAt));
    });

    return itemsToSync.length;
  }

  render() {
    const counter = this.itemsToSync();
    if (!counter) return null;
    return (
      <span>(not synced: {counter})</span>
    );
  }
}

function mapStateToProps(state) {
  return {
    concerts: values(state.concertsState.concerts)
  };
}

export default connect(
  mapStateToProps
)(SyncCounter);
