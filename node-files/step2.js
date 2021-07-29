const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if(err) {
            webCat(path) 
        }
        console.log(data)
    })
}

async function webCat(url) {
    try{
    await axios.get(url).then(res=> console.log(res))
    
    } catch {
        console.log("ERROR no such site")
        process.kill(1)
    }
}

cat(process.argv[2])