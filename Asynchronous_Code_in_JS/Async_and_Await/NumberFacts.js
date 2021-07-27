
const url = "http://numbersapi.com/"
const favNum = 42
const $ul = $("ul")

async function fourNumberFacts() {
    let numberFacts = await Promise.all([
    await $.getJSON(`${url}${favNum}?json`),
    await $.getJSON(`${url}${favNum}?json`),
    await $.getJSON(`${url}${favNum}?json`),
    await $.getJSON(`${url}${favNum}?json`),
    ])
    console.log(numberFacts[0].text)
    for (fact in numberFacts) {
        const $li = $(`<li>${numberFacts[fact].text}</li>`)
        $ul.append($li)
    }
}
fourNumberFacts()

