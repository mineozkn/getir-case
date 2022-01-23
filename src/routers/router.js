'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller');

  // todoList Routes
  app.route('/records')
    .post(controller.records);
    
};
