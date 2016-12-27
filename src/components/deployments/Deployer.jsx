import React from 'react';

export default class Deployer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      steps: ['Fetching', 'Commiting', 'Pushing', 'Cleaning', 'Deployed'],
      currentStep: 'Pushing'
    };
  }

  confrim() {
    this.setState({ confirmed: true });

    console.log('initialize deployment on backend...');
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
