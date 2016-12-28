const Git = require('nodegit');

class HerokuDeployer {
  constructor(appName, apiKey) {
    this.tempRepoPath = '.tmp/repo';
    this.repoUrl = this.calculateRepoUrl(apiKey, appName);
  }

  steps() {
    return [
      'Setup',
      'Fetched',
      'Commited',
      'Pushed',
      'Cleaned',
      'Deployed'
    ];
  }

  deploy(statusUpdateCallback) {
    this.repo = null;
    this.originalMasterCommit = null;
    this.statusUpdateCallback = statusUpdateCallback;

    return Promise.resolve()
    .then(this.setupRepo.bind(this))
    .then(this.pullData.bind(this))
    .then(this.createEmptyDeploymentCommit.bind(this))
    .then(this.deployPush.bind(this))
    .then(() => { this.statusUpdateCallback('Deployed'); })
    .catch((e) => {
      console.log(e);
    });
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
      console.log('repo exists');
      this.repo = repository;
    });
  }

  initRepo() {
    console.log('repo doesnt exits, creating repo...');
    return Git.Repository.init(this.tempRepoPath, 0)
    .then((repository) => {
      console.log('repo created');
      this.repo = repository;
      return Git.Remote.create(this.repo, 'heroku', this.repoUrl)
      .then(() => {
        console.log('remote added to repo');
      });
    });
  }

  pullData() {
    console.log('fetching remote...');
    return this.repo.fetch('heroku')
    .then(() => {
      console.log('fetched!');
      this.statusUpdateCallback('Fetched');
    })
    .then(this.storeLastCommitHash.bind(this))
    .then(this.resetToOriginalMaster.bind(this));
  }

  resetToOriginalMaster() {
    console.log('reseting to old heroku master commit: ' + this.originalMasterCommit.id().toString());
    return Git.Reset.reset(this.repo, this.originalMasterCommit, Git.Reset.TYPE.HARD);
  }

  storeLastCommitHash() {
    return this.repo.getReferenceCommit('remotes/heroku/master')
    .then((commit) => {
      console.log('store master commit');
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
    .then(() => {
      console.log('empty commit added');
      this.statusUpdateCallback('Commited');
    });
  }

  deployPush() {
    return this.push()
    .then(() => { this.statusUpdateCallback('Pushed'); })
    .then(this.resetToOriginalMaster.bind(this))
    .then(this.forcePush.bind(this))
    .then(() => { this.statusUpdateCallback('Cleaned'); });
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
      console.log('try to push');
      return remote.push([`${force ? '+': ''}refs/heads/master:refs/heads/master`], {})
      .then(() => {
        console.log('pushed');
      });
    });
  }
}

module.exports = HerokuDeployer;
