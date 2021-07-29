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
        
    }
}



if(process.argv[2] === "--out") {
    
        fs.readFile(process.argv[4], "utf8", (err, data)=> {
            if(err) {
                console.log("No such file exists")
                process.kill(1)
            }
            input = data 
            fs.writeFile(process.argv[3], input, "utf8", err => {
                if(err) {
                console.log(`Couldn't write to ${process.argv[4]}`)
                process.kill(1)
                } 
                console.log("File written successfully")
                process.kill(0)
    
            })
            
        })
        
   
} else {
    cat(process.argv[2])
}