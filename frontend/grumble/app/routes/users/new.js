import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    submit() {
      this.modelFor(this.routeName).save();
    }
  }
});
