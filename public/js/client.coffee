class Message extends Backbone.Model
  defaults:
    body: ''
    thumb: 'images/blank-gravatar.jpg'
    time: 'just now'
    whom: 'someone'
    state: 'on'
    effect_on: 'tada'
    effect_off: 'fadeOut'

  off:()->
    @trigger('off')

class Dash extends Backbone.Model
  next:(message)->
    @current.off() if @current
    @current = message
    @trigger('change')


class MessageView extends Backbone.View
  model: Message
  template: _.template($('#message-template').html())
  className: 'animated message'
  tagName: 'article'

  initialize:()->
    @model.bind('off', @render_off)

  remove_on_end:()->
    $(@el).bind "animationend", ()->
      $(@).remove()

  render_off:()=>
    $(@el).removeClass(@model.get('effect_on')).addClass(@model.get('effect_off'))
    @remove_on_end()

  render:()=>
    $(@el).html(@template(@model.toJSON()))
    $(@el).addClass(@model.get('effect_on'))
    @

class DashView extends Backbone.View
  initialize:()->
    @model.bind('change', @render)

  render:()=>
    $('#main').prepend(new MessageView(model: @model.current).render().el)
    @



window.Message = Message
window.dash = new Dash()
new DashView(model: window.dash)

