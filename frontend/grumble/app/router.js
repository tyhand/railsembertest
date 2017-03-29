import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('users', function() {
    this.route('user', { path: '/:user_id' });
    this.route('edit', { path: '/:user_id/edit' });
    this.route('new')
  });
});

export default Router;
