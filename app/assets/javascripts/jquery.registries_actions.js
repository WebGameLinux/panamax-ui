(function($) {
  $.PMX.ManageRegistries = function(el, options) {
    var base = this;

    base.$el = $(el);

    base.defaultOptions = {
      $registriesForm: $('form.new_registry'),
      registriesFormButtonSelector: '.button-add',
      deleteRegistrySelector: '.actions a.delete-action',
      removeSelector: 'li'
    };

    base.init = function() {
      base.options = $.extend({},base.defaultOptions, options);
      base.bindEvents();
    };

    base.bindEvents = function () {
      base.$el.on('click', base.options.registriesFormButtonSelector, base.toggleForm);
      base.$el.on('click', base.options.deleteRegistrySelector, base.handleDelete);
    };

    base.toggleForm = function (e) {
      e.preventDefault();
      base.options.$registriesForm.slideToggle();
    };

    base.confirmDelete = function(e) {
      var destroyer = new $.PMX.destroyLink($(e.currentTarget).closest(base.options.removeSelector));

      destroyer.init();
      destroyer.handleDelete(e);
    };

    base.handleDelete = function(e) {
      e.preventDefault();

      var $target = $(e.currentTarget);
      (new $.PMX.ConfirmDelete($target.closest('.actions'),
        {
          message: 'Delete this registry?',
          confirm: function() {
            base.confirmDelete(e);
          }
        }
      )).init();
    };
  };

  $.fn.registriesActions = function(options) {
    return this.each(function() {
      (new $.PMX.ManageRegistries(this, options)).init();
    });
  };

})(jQuery);
