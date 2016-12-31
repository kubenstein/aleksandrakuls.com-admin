const Git = require('nodegit');

class HerokuDeployer {
  constructor(appName, apiKey) {
    this.tempRepoPath = '.tmp/repo';
    this.repoUrl = this.calculateRepoUrl(apiKey, appName);
  }

  steps() {
    return [
      'Setup',
      'Fetching',
      'Adding Empty Commit',
      'Pushing',
      'Cleaning the Repo',
      'Deployed'
    ];
  }

  deploy(statusUpdateCallback) {
    this.repo = null;
    this.originalMasterCommit = null;
    this.statusUpdateCallback = statusUpdateCallback;

    return this.setupRepo()
    .then(this.pullData.bind(this))
    .then(this.createEmptyDeploymentCommit.bind(this))
    .then(this.deployPush.bind(this))
    .then(() => { this.statusUpdateCallback('Deployed'); });
  }

  // private

  calculateRepoUrl(apiKey, appName) {
    return `https://dummy:${apiKey}@git.heroku.com/${appName}.git`;
  }

  setupRepo() {
    return this.openRepo()
    .catch(this.initRepo.bind(this));
  }

  openRepo() {
    return Git.Repository.open(this.tempRepoPath)
    .then((repository) => {
      this.repo = repository;
    });
  }

  initRepo() {
    return Git.Repository.init(this.tempRepoPath, 0)
    .then((repository) => {
      this.repo = repository;
      return Git.Remote.create(this.repo, 'heroku', this.repoUrl);
    });
  }

  pullData() {
    return this.repo.fetch('heroku')
    .then(() => { this.statusUpdateCallback('Fetching'); })
    .then(this.storeLastCommitHash.bind(this))
    .then(this.resetToOriginalMaster.bind(this));
  }

  resetToOriginalMaster() {
    return Git.Reset.reset(this.repo, this.originalMasterCommit, Git.Reset.TYPE.HARD);
  }

  storeLastCommitHash() {
    return this.repo.getReferenceCommit('remotes/heroku/master')
    .then((commit) => {
      this.originalMasterCommit = commit;
    });
  }

  createEmptyDeploymentCommit() {
    const files = [];
    const signature = Git.Signature.now('Deployment Bot', 'niewczas.jakub@gmail.com');
    const author = signature;
    const committer = signature;
    const message = 'redeployment';

    return this.repo.createCommitOnHead(files, author, committer, message)
    .then(() => { this.statusUpdateCallback('Adding Empty Commit'); });
  }

  deployPush() {
    return this.push()
    .then(() => { this.statusUpdateCallback('Pushing'); })
    .then(this.resetToOriginalMaster.bind(this))
    .then(this.forcePush.bind(this))
    .then(() => { this.statusUpdateCallback('Cleaning the Repo'); });
  }

  push() {
    return this.pushWithOptions(false);
  }

  forcePush() {
    return this.pushWithOptions(true);
  }

  pushWithOptions(force) {
    return this.repo.getRemote('heroku')
    .then((remote) => {
      return remote.push([`${force ? '+' : ''}refs/heads/master:refs/heads/master`], {});
    });
  }
}

module.exports = HerokuDeployer;
