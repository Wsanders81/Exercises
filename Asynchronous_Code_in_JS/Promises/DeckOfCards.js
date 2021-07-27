//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
//2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.

// const deckUrl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

// let deckPromise = axios.get(deckUrl)

// let cards = []
// let card1; 
// let deckId; 
// deckPromise.
//     then(res => res.data.deck_id).
//     then(deck_id => {
//         deckId = deck_id
//         return  axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        
//     }).
//     then((res)=> {
        
//         card1= `${res.data.cards[0]["value"]} of ${res.data.cards[0]["suit"]}`
//         return axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

//     }).
//     then(res => {
//         console.log(`${res.data.cards[0]["value"]} of ${res.data.cards[0]["suit"]}, ${card1}`)
//     }
//     )

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

const deckUrl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

let deckPromise = axios.get(deckUrl)


const $deckContainer = $("#card-container")

$("button").click(()=> {
    deckPromise.
    then(res => res.data.deck_id).
    then(deck_id => {
        deckId = deck_id
        
        return  axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        
    }).then(res => {
        $deckContainer.append($(`<img src=${res.data.cards[0].images.png}>`))
        console.log(res.data.remaining)
        if (res.data.remaining === 0) {
            $("button").remove()
            alert("That's all of them!")
        }
    })
})