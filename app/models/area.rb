class Area < ActiveRecord::Base
  # Remember to create a migration!
  has_many :hikes
  has_many :users, through: :hikes
  has_many :hikers, through: :hikes

end
