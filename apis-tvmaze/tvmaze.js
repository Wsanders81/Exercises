/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);

  let results = [];
  let [...shows] = res.data;
  for (let show of shows) {
    const { ...items } = show.show;
    // ids.push(items.id);
    results.push({
      id: items.id,
      name: items.name,
      summary: items.summary,
      image: items.image,
    });
  }

  return results;
  // return [{ id, name, summary, image }];
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  const $button = $(
    '<button class="btn btn-primary btn-block">Get Episodes!</button>'
  );
  $showsList.empty();
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}"><img class="card-img-top" src="${show.image.medium}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary btn-block">Get Episodes!</button>
           </div>
         </div>
         
       </div>
      `
    );
    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();
  ids = []
  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);
  // let episodes = await getEpisodes(id)
  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

const populateEpisodes = function (episodes) {
  const $ul = $("#episodes-list");
  $ul.empty();
  const $section = $("#episodes-area");
  const $li = $("<li></li>");
  $section.show();
  for (let episode of episodes) {
    const { id, name, season, number } = episode[0];
    let $item = $(
      `<li>id:${id}, name: "${name}", season: "${season}", number: "${number}"</li>`
    );
    $ul.append($item);
  }
};

async function getEpisodes(ids) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const res = await axios.get(
    `http://api.tvmaze.com/shows/${ids}/episodes`
  );
  let [...episodes] = res.data; 
  let episodeList = [];
  for (let episode of episodes) {
   
   const { id, name, season, number } = episode;
   episodeList.push([{ id, name, season, number }]);
   
    
  }
  return episodeList; 
}
  // TODO: return array-of-episode-info, as described in docstring above

$("#shows-list").on("click", "button", async function (e) {
  e.preventDefault();
  let $id = $(e.target).closest('.Show').data('show-id');
  let getEpisode = await getEpisodes($id);
  populateEpisodes(getEpisode);
  
});
