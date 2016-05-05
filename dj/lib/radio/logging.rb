
require 'logger'

module Radio
  # Copied and pasted from http://stackoverflow.com/a/6768164/559913
  module Logging
    def logger
      @logger ||= Logging.logger_for(self.class.name)
    end

    def logger=(logger)
      @logger = logger
    end

    # Use a hash class-ivar to cache a unique Logger per class:
    @loggers = {}

    class << self
      def logger_for(classname)
        @loggers[classname] ||= configure_logger_for(classname)
      end

      def configure_logger_for(classname)
        logger = Logger.new(STDOUT)
        logger.progname = classname
        logger
      end
    end
  end
end
