import React from 'react';
import io from 'socket.io-client';

export default class Deployer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      steps: ['Waiting for server'],
      currentStep: null
    };
  }

  confrim() {
    this.setState({ confirmed: true });
    const socket = io();
    socket.on('deploymentSetup', (msg) => { this.deploymentSetupMessage(msg); });
    socket.on('deploymentStatusUpdate', (msg) => { this.deploymentStatusUpdateMessage(msg); });
    socket.emit('deploymentStart', '');
  }

  deploymentSetupMessage(steps) {
    this.setState({ steps: steps, currentStep: steps[0] });
  }

  deploymentStatusUpdateMessage(currentStep) {
    this.setState({ currentStep: currentStep });
  }

  stepCssClasses(step) {
    const { steps, currentStep } = this.state;
    const stepPosition = steps.indexOf(step);
    const currentStepPosition = steps.indexOf(currentStep);
    const executed = stepPosition <= currentStepPosition;
    return `progress-step ${executed ? 'executed' : ''}`;
  }

  render() {
    const { confirmed, steps } = this.state;
    return (
      <div>
        <h1 className="page-title">Deployment Console</h1>
        <div className="progress-bar-wrapper">
          {confirmed ?
            <ul className="progress-bar clearfix">
              { steps.map(step =>
                <li key={step} className={this.stepCssClasses(step)}>{step}</li>
              )}
            </ul>
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
