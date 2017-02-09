get '/users/new' do
  erb :'/users/register'
end

get '/users/login' do
  erb :'/users/login', layout: true, locals: { errors: @errors }
end

post '/users' do
  @current_user = User.new(params[:user])
  if @current_user.valid?
    @current_user.save
    session[:user_id] = @current_user.id
    redirect '/'
  else
    @errors = @current_user.errors.full_messages
    erb :'/users/register', layout: true, locals: { errors: @errors}
  end
end

post '/users/login' do
 @current_user = User.authenticate(params[:user][:username], params[:user][:password])
  if @current_user
    session[:user_id] = @current_user.id
    redirect '/'
  else
    @errors = ["User name or password is invalid."]
    erb :'/users/login', layout: true, locals: { errors: @errors}
  end
end

get '/users/:id' do
  @user = User.find_by(id: params[:id])
  erb :'/users/profile', layout: true, locals: { user: @user }
end

get '/users/logout' do
  session.delete(:user_id)
  erb :index
end

post '/users/logout' do
  session.delete(:user_id)
  redirect '/'
end
