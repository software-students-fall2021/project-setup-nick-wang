import React, {useState} from "react"
const https = require("https") 
const apiUrl = "https://my.api.mockaroo.com/diaries.json?key=d6e94010"

const request = async() =>{

    let rawData = ''
    https
    .get(apiUrl, response => {
        response.on('data', (data) => {
            rawData += data
        })
    })
    .on("error", err => {
    })
    return Uint8ArrayToString(rawData)
}

function Uint8ArrayToString(fileData){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
   
    return dataString
  
  }


export default request