/** Command-line tool to generate Markov text. */
const markov = require('./markov')
const fs = require('fs')
const axios = require('axios')
const process = require('process')


function createText(text) {
    let newMachine = new markov.MarkovMachine(text)
    console.log(newMachine.makeText())
}

function textFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(`Cannot read path ${path}`, err)
            process.kill(1)
        } else {
            createText(data)
        }
    })
}

async function textFromUrl(url) {
    let res; 
    try {
        res = await axios.get(url)
        
        
    } catch (err) {
        console.log(`Unable to retrieve URL ${url}`)
        process.kill(1)
    }
    createText(res.data)

}


let [method, path] = [process.argv[2], process.argv[3]]

if (method === "file") {
    textFromFile(path)
}
else if (method === "url") {
    console.log("URLLLLLL")
    textFromUrl(path)
}
else 
    console.log("Error, request cannot be completed")
    process.kill(1)
    



