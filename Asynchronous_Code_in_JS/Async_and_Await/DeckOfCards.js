
//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
//2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.


// const deckUrl = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
// let cards = []
// async function getDeckId() {
//     return $.getJSON(deckUrl)
// }

// async function getCards(deckId) {
//     let card1Promise = axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     let card2Promise = axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

//     let card1 = await card1Promise
//     let card2 = await card2Promise
//     console.log(`${card1.data.cards[0]["value"].toLowerCase()} of ${card1.data.cards[0]["suit"].toLowerCase()}`)
//     console.log(`${card2.data.cards[0]["value"].toLowerCase()} of ${card1.data.cards[0]["suit"].toLowerCase()}`)
//     return  (card1, card2)
// }

// getDeckId().then(res => 
//     getCards(res.deck_id))

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

// $('document').ready(async function(){
//     let deck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//     deckId = deck.data.deck_id
// })

const $deckContainer = $("#card-container")
// let deckId; 
// $("button").click(async ()=> {
//     console.log(deckId)
//     let cardRes = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     let cardImage = cardRes.data.cards[0].image
//     console.log(cardRes.data.remaining)
//     $deckContainer.append($(`<img src=${cardImage}>`))
//     if (cardRes.data.remaining === 0) {
//         $("button").remove()
//         alert("That's all of them!")
//     }
// })


deckCount = 52
const deck = {
    async init () {
        let res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        this.deckId = res.data.deck_id; 
    }, 
    async drawCard() {
        let res = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        
        $deckContainer.append($(`<img src=${res.data.cards[0].image}>`))
        deckCount --
        if (deckCount === 0) {
            $("button").remove()
            alert("That's all of them!")
        }
        
    }
}
deck.init()
$("button").click(async ()=> {
        deck.drawCard()
       
    })