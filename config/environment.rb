# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Configure Jbuilder to globally convert ruby snake case to JSON camelCase.
Jbuilder.key_format camelize: :lower