o_O('ReviewsController', {
  show: function(params){
    Review.find(params('id'), function(review){
      o_O.render('reviews/show', review, {html: 'div#content'})
    })
  },
  index: function(){
    Review.all(function(reviews){
      o_O.render('reviews/index', {reviews: reviews}, {html: 'div#content'})
    });
  },
  add: function(){
    o_O.render('reviews/new', {}, {html: 'div#content'}, function(){
      $('#title').focus()
    })
  },
  create: function(){
    var review = Review.initialize(o_O.params($(this)));
    var form = $(this);
    review.save({
      invalid: function(review){
        o_O.alert_errors(review);
      },
      success: function(review){
        ReviewsController.index();
      }
    })
  },
  edit: function(params){
    console.log('editing for some reason')
    Review.find(params('id'), function(review){
      o_O.render('reviews/edit', review, {html: 'div#content'}, function(){
        $('#title').focus();
      });
    })
  },
  continue_editing: function(params){
    if($('div#new-review').length === 0)
    {
      ReviewsController.show(params)
    }
    else
    {
      $('div#new-review form').attr('data-bind', 'reviews#update')
                          .find('input[type=text]').attr('data-bind', 'reviews#save').end()
                          .find('textarea').attr('data-bind', 'reviews#save').end()
                          .find('input[type=submit]').val('Done')
    }
  },
  save_new: function(){
    var form = $(this).parents('form');
    var review = Review.initialize(o_O.params(form));
    review.save({
      success: function(review){
        window.location.hash = '/reviews/continue_editing/' + review.id;
      }
    })
  },
  save: function(){
    var form = $(this).parents('form');
    Review.find(form.attr('data-id'), function(review){
      review.update_attributes(o_O.params(form));
    })
  },
  update: function(){
    var form = $(this);
    Review.find(form.attr('data-id'), function(review){
      review.update_attributes(o_O.params(form), {
        invalid: function(review){
          o_O.alert_errors(review);
        },
        success: function(review){
          window.location.hash = '/reviews/' + review.id;
        }
      })
    });
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').slideToggle(function(){
        var div = $(this);
        Review.find($(this).attr('data-id'), function(review){
          review.destroy();
          window.location.hash = '/reviews/';
        });
      });
    }
  },
});