module.exports = function (shipit) {

  require('shipit-deploy')(shipit);

  var utils = require('shipit-utils');

  shipit.initConfig({
    default: {
      workspace: '/tmp/groupes',
      deployTo: '/opt/groupes',
      repositoryUrl: 'https://github.com/nmccartney/sails-and-angular',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ec2/gsg-keypair',
      shallowClone: true
    },
    staging: {
      servers: 'root@138.197.74.131', //142.93.194.138',
      branch: 'master',
    }
  });

  // shipit.task('pwd', function () {
  // 	return shipit.remote('pwd');
  // });

  shipit.task('install', function () {
    return shipit.remote('cd ../opt/groupes/current; npm install	');;
  });

  shipit.task('start', function () {
    return shipit.remote('cd ../opt/groupes/current; forever -o out.log -e err.log start app.js --prod');;
  });

  shipit.task('list', function () {
    return shipit.remote('forever list');;
  });

  shipit.task('stop', function () {
    return shipit.remote('forever stopall');;
  });

  shipit.task('err:log', function () {
    return shipit.remote('cd ../opt/groupes/current; tail err.log -f');
  });

  shipit.task('console:log', function () {
    return shipit.remote('cd ../opt/groupes/current; tail out.log -f');
  });

  shipit.task('forever:restart', function () {

    shipit.log(require('chalk').green('Restarting server...'))

    var command = "forever stopall";

    return shipit.remote(command).then(function () {

      var newCmd = 'cd ../opt/groupes/current; forever -o out.log -e err.log start app.js --prod';

      return shipit.remote(newCmd)
        .then(function () {
          shipit.log(require('chalk').green('Sever has restarted...'))
          shipit.emit('restarted');
        });
    })

  })

  // shipit.on('deploy:update',function(){
  // 	utils.runTask('install');
  // })

  shipit.task('test', function () {
    shipit.log(require('chalk').green('testing..'))
    return shipit.remote('pwd');
  });

  shipit.on('deployed', function () {
    shipit.log(require('chalk').green('Restarting server...'))

    var command = "forever stopall";

    return shipit.remote(command).then(function () {

      var buildCmd = 'cd ../opt/groupes/current; npm run build:dev';

      return shipit.remote(buildCmd)
        .then(function () {
          shipit.log(require('chalk').green('Application build finished...'))
          shipit.emit('built');

          var newCmd = 'cd ../opt/groupes/current; forever -o out.log -e err.log start app.js --prod';

          return shipit.remote(newCmd)
            .then(function () {
              shipit.log(require('chalk').green('Sever has restarted...'))
              shipit.emit('restarted');
            });
        });

    });
  });



  //bootstrap tasks

  //install forever
  shipit.task('forever', function () {
    return shipit.remote('cd ../opt/groups/current && npm install -g forever');
  });


};
