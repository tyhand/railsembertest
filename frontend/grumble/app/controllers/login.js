import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let credentials = this.getProperties('identification', 'password');
      console.log(credentials);
      this.get('session').authenticate('authenticator:jwt', credentials).catch((errors) => {
        this.set('errorMessage', errors[0].description);
      });
    }
  }
});
