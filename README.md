# Dash
Dash is a simple web application for dashboard like notifications. 

* Commit messages via github web hooks for your developers.
* Announcements for your managers
* Headlines for your visitors
* Insert your use case here


## Getting Started
Dash is a node.js application, also built to be compatible with Heroku. Push
it to a free Heroku instance in a minute:

  $ git clone https://github.com/jondot/dash
  $ cd dash
  $ heroku create -s cedar
  $ git push heroku master

If you want it on your local servers, do this

  $ git clone https://github.com/jondot/dash
  $ cd dash
  $ npm install
  $ node dash


## Showing Messages

Dash was built to have a very simple interface and a very specific goal:
showing messages in an aesthetic way. 

Submit new messages via Dash's RESTful interface to a parameter named
`content`:

    POST http://your-dash-instance.com/messages

Here is a quick example with `curl`:

    curl -d "content={\"body\": \"I have had it with these motherf*ckin’ snakes on this motherf*ckin’ plane!\", \"effect_on\":\"bounceInDown\", \"effect_off\":\"fadeOutDownBig\"}" http://localhost:3000/messages



Example content:

    {
      'body' : 'hello world!',
      'whom':  'john doe',
      'thumb': '48px-thumb-url',
      'time':  'long time ago'
    }

You can also customize the effects. This will fade out the current
message and will 'tada' the new message in:

    {
      'body' : 'hello world!',
      'whom':  'john doe',
      'thumb': '48px-thumb-url',
      'time':  'long time ago',
      'effect_on': 'tada'
      'effect_off': 'fadeOut'
    }

For a list of kinds of effects, check out [Animate.css](https://github.com/daneden/animate.css).

## Showing Messages from Github

Somewhat later, I've added a parsers mechanism. The goals were to allow
anyone to take a request and build a Dash message format out of it. A
sample github parser is included in `parsers/github.coffee`.

So now, in order to use Dash for your Github POST hooks, you need to
specify this kind of URL:

  http://your-dash-instance.com/messages?dash_from=github

And it will load the github parser on any POST request, so that it could
parse the github-specific `payload` parameter into the Dash specific
message format.


Make sure to ping me if you wrote a new kind of parser so that I can
include it in!.




## Something Missing?

I've intentionally reduced the scope of the things I wanted to do and the features I could have
implemented. If you see something missing, let me know -- but keep in
mind what I've just described.



## Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).


## Copyright

Copyright (c) 2011 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See MIT-LICENSE for further details.

