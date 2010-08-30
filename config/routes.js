o_O.routes.draw(function(map){
  // Use the routes file to configure hashtag-navigation routes
  // that trigger particular controller actions

  // For Example, to route links pointing to "#/" to HomeController.index():
  map.root({to: 'home#show'});
  
  map.match('/', {to: 'home#show'})
  
  map.match('/reviews/new', {to: 'reviews#add'})
  map.match('/reviews', {to: 'reviews#index'})
  map.match('/reviews/:id', {to: 'reviews#show'})
})