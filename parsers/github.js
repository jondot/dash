(function() {
  var gravatar, timeago;
  gravatar = require('gravatar');
  timeago = require('timeago');
  module.exports = function(parsers) {
    return parsers['github'] = function(req) {
      var body, ghmsg, msgdate;
      ghmsg = JSON.parse(req.param('payload'));
      body = ghmsg['commits'][0]['message'];
      msgdate = new Date(ghmsg['commits'][0]['timestamp']);
      return {
        'body': body,
        'whom': ghmsg['commits'][0]['author']['name'],
        'thumb': gravatar.url(ghmsg['commits'][0]['author']['email'], {
          s: '48',
          d: '404'
        }),
        'time': timeago(msgdate) || 'long time ago'
      };
    };
  };
  /*
  {
    :before     => before,
    :after      => after,
    :ref        => ref,
    :commits    => [{
      :id        => commit.id,
      :message   => commit.message,
      :timestamp => commit.committed_date.xmlschema,
      :url       => commit_url,
      :added     => array_of_added_paths,
      :removed   => array_of_removed_paths,
      :modified  => array_of_modified_paths,
      :author    => {
        :name  => commit.author.name,
        :email => commit.author.email
      }
    }],
    :repository => {
      :name        => repository.name,
      :url         => repo_url,
      :pledgie     => repository.pledgie.id,
      :description => repository.description,
      :homepage    => repository.homepage,
      :watchers    => repository.watchers.size,
      :forks       => repository.forks.size,
      :private     => repository.private?,
      :owner => {
        :name  => repository.owner.login,
        :email => repository.owner.email
      }
    }
  }
  */
}).call(this);
