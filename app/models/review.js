o_O('Review', function(review){
  review.validates_presence_of('title');
  
  review.methods.description_formatted = function(){
    var converter = new Showdown.converter();
    var html = converter.makeHtml(this.description);
    return html;
  }
})