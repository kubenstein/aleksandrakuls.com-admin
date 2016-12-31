class DeploymentWebsocketHandler {
  constructor(deployer, resourceRepository) {
    this.deployer = deployer;
    this.resourceRepository = resourceRepository;
  }

  handle(socket) {
    socket.emit('deploymentSetup', this.deployer.steps());
    socket.on('deploymentStart', () => { this.initializeDeployment(socket); });
  }

  initializeDeployment(socket) {
    return Promise.resolve()
    .then(() => { this.resourceRepository.removeAllSoftRemoved(); })
    .then(() => {
      return this.deployer.deploy((completedStep) => {
        socket.emit('deploymentStatusUpdate', completedStep);
      });
    })
    .then(() => { return this.resourceRepository.markAllAsDeployed(); })
    .then(() => { socket.emit('deploymentFinished', ''); })
    .catch((error) => { socket.emit('deploymentError', error.toString()); });
  }
}

module.exports = DeploymentWebsocketHandler;
