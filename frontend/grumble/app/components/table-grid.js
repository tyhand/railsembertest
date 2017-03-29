import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adapter: null,

  tagName: 'div',

  setup: function() {
    if (null === this.get('adapter')) {
      this.set('adapter', this.get('store').adapterFor(this.get('modelName')));
    }
  }.on('init'),

  didInsertElement: function() {
    let baseEditItem = jsGrid.Grid.prototype.editItem;
    jsGrid.Grid.prototype.editItem = function() {
      if (this._editingRow) {
        this.updateItem();
      }
      baseEditItem.apply(this, arguments);
    };

    let self = this;
    this.$().jsGrid({
      autoload: true,
      editing: true,
      paging: true,
      pageLoading: true,
      controller: {
        loadData: function(filter) {
          return Ember.$.ajax({
            type: 'GET',
            url: self.dataUrl()
          }).done(function(data) {
            data.itemsCount = data.data.length;
          });
        },

        updateItem: function(item) {
          let patchItem = item;
          delete patchItem.links;

          return Ember.$.ajax({
            type: 'PATCH',
            url: self.dataUrl() + '/' + item.id,
            contentType: 'application/vnd.api+json',
            dataType: 'json',
            processData: true,
            data: JSON.stringify({ data: patchItem})
          }).then(function(data) {
            return data.data;
          });
        }
      },

      fields: [
        { name: "attributes.name", type: "text", title: "Name", editing: false },
        { name: "attributes.email", type: "text", title: "Email" },
        { type: "control" }
      ]
    });
  },

  dataUrl() {
    return this.get('adapter').buildURL(this.get('modelName'));
  }
});
