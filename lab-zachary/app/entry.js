'use strict';

require('./scss/reset.scss');
require('./scss/main.scss');

const angular = require('angular');
const cowsay = require('cowsay-browser');

const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowsayController', ['$log', '$scope', CowsayController]);

function CowsayController($log, $scope) {

  let cowsayCtrl = $scope.cowsayCtrl = {};

  cowsayCtrl.title = 'This is the Cowsay thing';
  cowsayCtrl.history = {
    length:0
  };

  cowsayCtrl.theCowSays = function(input) {
    $log.debug('theCowSays function:',input);
    return cowsay.say({text: input || 'moooooooo cow'});
  };

  cowsayCtrl.push = function(theCowSaid){
    $log.debug('cowsayCtrl.push');

    if(!theCowSaid) return;
    cowsayCtrl.history[cowsayCtrl.history.length++] = theCowSaid;
  };

  cowsayCtrl.pop = function(){
    $log.debug('cowsayCtrl.pop');

    if(this.history.length === 0) return;
    let result = this.history[--this.history.length];
    delete this.history[this.history.length];
    $log.debug('result:',result);
    cowsayCtrl.text = result;
  };

}

