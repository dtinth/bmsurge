
require 'grape'
require 'radio/configuration'

$stdout.sync = true

module API
  class Server < Grape::API
    RADIO = Radio::Configuration.new

    version 'v1', using: :header, vendor: 'bmsurge'

    desc 'Auto DJ!'
    post :update do
      RADIO.auto_dj.process!
      true
    end
  end
end
