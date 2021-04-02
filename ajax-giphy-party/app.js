console.log("Let's get this party started!");
// api key = 6cgAG3GvKFEd6AL53gQ9R56BT5lOtLPc
//http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym.

async function searchGif() {

    const gifSearchTerm = document.querySelector('#button-addon2');
    const key = '6cgAG3GvKFEd6AL53gQ9R56BT5lOtLPc'
    const searchTerm = gifSearchTerm.value; 
    const res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${key}`, {params:{limit:1}})
    console.log(res)
    const imgUrl = res.data.data[0].images.original.url; 
    createAndAppendGif(imgUrl);
    
}

const createAndAppendGif = function(imgUrl){
    //Create Elements
    const ul = document.querySelector('#gif-storage');
    let $ul = $('#gif-storage')
    // const li = document.createElement('li');
    // const $li = $('<li></li>')
    let $img = $("<img>", {src:imgUrl})
     

    // $img.src = imgUrl; 

    //Append Elements to DOM
    // $li.append(img); 
    $ul.append($img);

}

const gifSearchTerm = document.querySelector('#gif')
const form = document.querySelector('#gif-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    searchGif();
})

//Remove Gifs
const $allImgs = $('img');
const $removeButton = $('#remove')
const removeImgs = function () {
    
    $('ul img').remove();
    console.log('click')

}
$('#remove').on('click', removeImgs)