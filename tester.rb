require 'rubygems'
require 'httparty'

puts HTTParty.post('http://localhost:3000/messages?dash_from=github', :query =>  { :payload => File.read('github_payload.json')})
