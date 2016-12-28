import React from 'react';
import io from 'socket.io-client';

export default class Deployer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      steps: ['Waiting for server'],
      lastSuccessfulStep: null,
      errMessage: null
    };
  }

  confrim() {
    this.setState({ confirmed: true });
    const socket = io();
    socket.on('deploymentSetup', (msg) => { this.deploymentSetupMessage(msg); });
    socket.on('deploymentStatusUpdate', (msg) => { this.deploymentStatusUpdateMessage(msg); });
    socket.on('deploymentError', (msg) => { this.deploymentError(msg); });
    socket.emit('deploymentStart', '');
  }

  deploymentSetupMessage(steps) {
    this.setState({ steps: steps, lastSuccessfulStep: steps[0] });
  }

  deploymentStatusUpdateMessage(lastSuccessfulStep) {
    this.setState({ lastSuccessfulStep: lastSuccessfulStep });
  }

  deploymentError(errMessage) {
    this.setState({ error: errMessage });
  }

  stepCssClasses(step) {
    const { steps, lastSuccessfulStep } = this.state;
    const stepPosition = steps.indexOf(step);
    const lastSuccessfulStepPosition = steps.indexOf(lastSuccessfulStep);
    const executed = stepPosition <= lastSuccessfulStepPosition;
    const inProgress = stepPosition === lastSuccessfulStepPosition + 1;
    return `progress-step
            ${executed ? 'executed' : ''}
            ${inProgress ? 'inProgress' : ''}`;
  }

  render() {
    const { confirmed, steps, error } = this.state;
    return (
      <div>
        <h1 className="page-title">Deployment Console</h1>
        <div className="progress-bar-wrapper">
          {confirmed ?
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
          :
            <button onClick={() => { this.confrim(); }} className="btn btn-prompt">
              Initialize Deployment
            </button>
          }
        </div>
      </div>
    );
  }
}
