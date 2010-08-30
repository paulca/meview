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
    o_O.render('reviews/new', {}, {html: 'div#content'})
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
  edit: function(){
    review_div = $(this).parents('div.review');
    review = Review.find(review_div.attr('data-id'), function(review){
      o_O.get_template('reviews/edit', review, function(data, template){
        edit_review = Mustache.to_html(template, data);
        review_div.hide().after(edit_review);
      });
    });
  },
  update: function(){
    edit_review_div = $(this).parents('div.edit-review');
    review_div = edit_review_div.prev('div.review:first');
    var form = $(this);
    Review.find(form.attr('data-id'), function(Review){
      if(Review.valid())
      {
        Review.update_attributes(o_O.params(form), function(updated_review){
          o_O.get_template('reviews/_review', updated_review, function(data, template){ 
            var template = Mustache.to_html(template, data);
            edit_review_div.replaceWith(template);
            review_div.remove();
          });
        });
      }
      else
      {
         o_O.alert_errors(review);
      }
    });
  },
  destroy: function(){
    if(confirm('Are You sure?'))
    {
      $(this).parents('div.review:first').slideToggle(function(){
        var div = $(this);
        Review.find($(this).attr('data-id'), function(review){
          review.destroy();
          div.remove();
        });
      });
    }
  },
});