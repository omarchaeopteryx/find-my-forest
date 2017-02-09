module Authentication
  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end
end

helpers Authentication


# helpers do
#   def current_user
#     User.find_by_id(session[:user_id])
#   end

#   def user_logged_in?
#     !!current_user
#   end
# end
