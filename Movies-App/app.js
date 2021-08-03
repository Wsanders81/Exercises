const $storage = $("#stored-movies");
const $removeButton = $('<button class="button">Remove</button>');
const $submit = $("#submit");

$("#submit").on("click", function (e) {
  e.preventDefault();
  const $movie = $("#movie").val();
  const $rating = $("#rating").val();
  if($rating < 0 || $rating > 10){
      alert('Rating must be between 0 and 10')
      return; 
  }  
  if($movie.length < 3){
      alert("Movie title must be longer than 2 characters");
      return;
  }
  if ($movie !== "" || $rating >=0 ) {
    $("ul").append(
      '<li class="li">' +
        $movie +
        "   " +
        $rating +"   "+
        '<button id="remove">Remove</button></li>'
    );
}
});

$('ul').on('click', '#remove', function(){
    $(this).parent().remove()
})


