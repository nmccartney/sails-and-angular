module.exports = function (shipit) {

  require('shipit-deploy')(shipit);

  var utils = require('shipit-utils');

  shipit.initConfig({
    default: {
      workspace: '/tmp/groupes',
      deployTo: '/home/pi/Desktop/groupes',
      repositoryUrl: 'https://github.com/nmccartney/sails-and-angular',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa.pub',
      shallowClone: true
    },
    staging: {
      servers: 'pi@192.168.1.114', //142.93.194.138',
      branch: 'master',
    },
    prod: {
      servers: 'root@142.93.194.138', //142.93.194.138',
      branch: 'master',
    }
  });

  // shipit.task('pwd', function () {
  // 	return shipit.remote('pwd');
  // });

  shipit.task('install', function () {
    return shipit.remote('cd ../opt/groupes/current; npm install');
  });

  shipit.task('start', function () {
    return shipit.remote('cd ../opt/groupes/current; forever -o out.log -e err.log start app.js --prod');
  });

  shipit.task('list', function () {
    return shipit.remote('forever list');
  });

  shipit.task('stop', function () {
    return shipit.remote('forever stopall');
  });

  shipit.task('err:log', function () {
    return shipit.remote('cd ../opt/groupes/current; tail err.log -f');
  });

  shipit.task('console:log', function () {
    return shipit.remote('cd ../opt/groupes/current; tail out.log -f');
  });

  shipit.task('forever:restart', function () {

    shipit.log(require('chalk').green('Restarting server...'));

    var command = 'forever stopall';

    return shipit.remote(command).then(function () {

      var newCmd = 'cd ../opt/groupes/current; forever -o out.log -e err.log start app.js --prod';

      return shipit.remote(newCmd)
        .then(function () {
          shipit.log(require('chalk').green('Sever has restarted...'));
          shipit.emit('restarted');
        });
    });

  });

  // shipit.on('deploy:update',function(){
  // 	utils.runTask('install');
  // })

  shipit.task('test', function () {
    shipit.log(require('chalk').green('testing..'));
    return shipit.remote('pwd');
  });

  shipit.on('deployed', function () {
    shipit.log(require('chalk').green('Restarting server...'));

    var command = 'forever stopall';

    return shipit.remote(command).then(function () {

      // return shipit.remote('cd ../opt/groupes/current; npm install');
      var newCmd = 'cd ../opt/groupes/current; npm install';

      return shipit.remote(newCmd)
        .then(function () {
          shipit.log(require('chalk').green('Sever has installed dependencies...'));
          shipit.emit('installed');
        });

    });
  });

  shipit.on('installed', () => {
    shipit.log(require('chalk').green('Building application...'));

    var buildCmd = 'cd ../opt/groupes/current; npm run build:prod';

    return shipit.remote(buildCmd)
      .then(function () {
        shipit.log(require('chalk').green('Application built.'));
        shipit.emit('built');
      });
  });

  shipit.on('built', () => {
    shipit.log(require('chalk').green('Start Application'));

    var newCmd = 'cd ../opt/groupes/current; forever -o out.log -e err.log start app.js --prod';

    return shipit.remote(newCmd)
      .then(function () {
        shipit.log(require('chalk').green('Sever has restarted...'));
        shipit.emit('started');
      });
  });



  //bootstrap tasks

  //install forever
  shipit.task('forever', function () {
    return shipit.remote('cd ../opt/groups/current && npm install -g forever');
  });


};
