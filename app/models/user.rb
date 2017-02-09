class User < ActiveRecord::Base
  # Remember to create a migration!

  has_many :hikes
  has_many :areas, through: :hikes

  include BCrypt

  def password
    @password ||= BCrypt::Password.new(encrypted_password)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.encrypted_password = @password
  end

  def self.authenticate(username, input_password)
    @user = User.find_by(username: username)
    if @user && @user.password == input_password
      return @user
    end
    nil
  end

end
