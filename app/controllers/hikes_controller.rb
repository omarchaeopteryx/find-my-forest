#index route
get "/hikes" do
  # @hike = Hike.order(:location)
  erb :'/hikes/index'
end

# new route
get '/hikes/new' do
  if request.xhr?
    erb :'hikes/new', layout: false;
  else
    erb :'hikes/new', layout: true;
  end
end

# create route
post '/hikes' do
  @hike = Hike.new(params[:hike])
  if @hike.save
    if request.xhr?
      erb :index
    else
      redirect "/"
    end
  else
    status 422
    erb :'/'
  end
end

# show route
get '/hikes/:id' do
  @hikes = Hike.find(params[:id])
  erb :'hikes/show'
end
