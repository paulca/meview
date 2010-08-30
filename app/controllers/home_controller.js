o_O('HomeController', {
  show: function(){
    Review.all(function(reviews){
      o_O.render('home/show', {reviews: reviews}, {html: 'div#content'});
    })
  }
})