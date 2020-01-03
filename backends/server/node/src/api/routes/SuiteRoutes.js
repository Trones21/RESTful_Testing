'use strict';
module.exports = function(app) {
  var Suite = require('../controllers/SuiteController');

  //Routes
  app.route('/SuitesInfo/')
    .get(Suite.list_all_Suites);

  app.route('/FullSuite/')
    .post(Suite.get_a_Suite);

    app.route('/SaveSuite/')
    .post(Suite.create_a_Suite)
    .put(Suite.update_a_Suite);

    app.route('/DeleteSuite/').post(Suite.delete_Suite);
    
};