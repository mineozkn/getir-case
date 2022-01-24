'use strict';
module.exports = function(app) {
  const controller = require('../controllers/controller');
  
  // check app health
  app.route('/health')
    .get(function (req, res, next) {
    res.json({status: 'UP'});
  });
  
  // todoList Routes
  app.route('/records')
    .post(controller.records);
    
};
