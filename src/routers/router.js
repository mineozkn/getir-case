'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller');
  
  // check app health
  app.route('/health')
    .get(controller.health);
  
  // todoList Routes
  app.route('/records')
    .post(controller.records);
    
};
