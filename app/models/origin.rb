class Origin < ActiveRecord::Base
  # Remember to create a migration!
  validates :acidity, :description, :flavor, :location, presence: true
end
