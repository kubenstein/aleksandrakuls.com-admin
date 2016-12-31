import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import fetchConcerts from 'actions/fetch-concerts';

class Deployer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      steps: ['Waiting for server'],
      lastSuccessfulStep: null,
      errMessage: null
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('deploymentSetup', (msg) => { this.deploymentSetupMessage(msg); });
    this.socket.on('deploymentStatusUpdate', (msg) => { this.deploymentStatusUpdateMessage(msg); });
    this.socket.on('deploymentFinished', () => { this.deploymentFinishedMessage(); });
    this.socket.on('deploymentError', (msg) => { this.deploymentErrorMessage(msg); });
  }

  confrim() {
    this.setState({ confirmed: true });
    this.socket.emit('deploymentStart', '');
  }

  deploymentSetupMessage(steps) {
    this.setState({ steps: steps, lastSuccessfulStep: steps[0] });
  }

  deploymentStatusUpdateMessage(lastSuccessfulStep) {
    this.setState({ lastSuccessfulStep: lastSuccessfulStep });
  }

  deploymentFinishedMessage() {
    fetchConcerts(this.props.dispatch);
  }

  deploymentErrorMessage(errMessage) {
    this.setState({ error: errMessage });
  }

  stepCssClasses(step) {
    const { steps, lastSuccessfulStep, confirmed } = this.state;
    if (!confirmed) {
      return 'progress-step';
    }

    const stepPosition = steps.indexOf(step);
    const lastSuccessfulStepPosition = steps.indexOf(lastSuccessfulStep);
    const executed = stepPosition <= lastSuccessfulStepPosition;
    const inProgress = stepPosition === lastSuccessfulStepPosition + 1;
    return `progress-step
            ${executed ? 'executed' : ''}
            ${inProgress ? 'inProgress' : ''}`;
  }

  buttonCssClasses() {
    return `btn btn-prompt ${this.state.confirmed ? 'soft-hidden' : ''}`;
  }

  render() {
    const { steps, error } = this.state;
    return (
      <div>
        <h1 className="page-title">Deployment Console</h1>
        <div className="progress-bar-wrapper">
          <div>
            {error ?
              <div className="errors">
                <p>DEPLOYMENT ERROR:<br />{error}</p>
              </div>
            : ''}
            <ul className="progress-bar clearfix">
              { steps.map(step =>
                <li key={step} className={this.stepCssClasses(step)}>{step}</li>
              )}
            </ul>
          </div>
          <button onClick={() => { this.confrim(); }} className={this.buttonCssClasses()}>
            Start Deployment
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(_state) {
  return {};
}

export default connect(
  mapStateToProps
)(Deployer);
