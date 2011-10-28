(function() {
  var Dash, DashView, Message, MessageView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Message = (function() {
    __extends(Message, Backbone.Model);
    function Message() {
      Message.__super__.constructor.apply(this, arguments);
    }
    Message.prototype.defaults = {
      body: '',
      thumb: 'images/blank-gravatar.jpg',
      time: 'just now',
      whom: 'someone',
      state: 'on',
      effect_on: 'tada',
      effect_off: 'fadeOut'
    };
    Message.prototype.off = function() {
      return this.trigger('off');
    };
    return Message;
  })();
  Dash = (function() {
    __extends(Dash, Backbone.Model);
    function Dash() {
      Dash.__super__.constructor.apply(this, arguments);
    }
    Dash.prototype.next = function(message) {
      if (this.current) {
        this.current.off();
      }
      this.current = message;
      return this.trigger('change');
    };
    return Dash;
  })();
  MessageView = (function() {
    __extends(MessageView, Backbone.View);
    function MessageView() {
      this.render = __bind(this.render, this);
      this.render_off = __bind(this.render_off, this);
      MessageView.__super__.constructor.apply(this, arguments);
    }
    MessageView.prototype.model = Message;
    MessageView.prototype.template = _.template($('#message-template').html());
    MessageView.prototype.className = 'animated message';
    MessageView.prototype.tagName = 'article';
    MessageView.prototype.initialize = function() {
      return this.model.bind('off', this.render_off);
    };
    MessageView.prototype.remove_on_end = function() {
      return $(this.el).bind("animationend", function() {
        return $(this).remove();
      });
    };
    MessageView.prototype.render_off = function() {
      $(this.el).removeClass(this.model.get('effect_on')).addClass(this.model.get('effect_off'));
      return this.remove_on_end();
    };
    MessageView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).addClass(this.model.get('effect_on'));
      return this;
    };
    return MessageView;
  })();
  DashView = (function() {
    __extends(DashView, Backbone.View);
    function DashView() {
      this.render = __bind(this.render, this);
      DashView.__super__.constructor.apply(this, arguments);
    }
    DashView.prototype.initialize = function() {
      return this.model.bind('change', this.render);
    };
    DashView.prototype.render = function() {
      $('#main').prepend(new MessageView({
        model: this.model.current
      }).render().el);
      return this;
    };
    return DashView;
  })();
  window.Message = Message;
  window.dash = new Dash();
  new DashView({
    model: window.dash
  });
}).call(this);
