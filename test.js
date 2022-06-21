// import { readFile, readdir } from 'fs';
// import { join } from 'path';
const fs = require('fs');
const path = require('path')
const dirPath = path.join(__dirname)
console.log(dirPath)

fs.readFile('test.txt','utf8', function(err, data){
    console.log("This the text in side file\n",data)
})
fs.readdir(dirPath,(err,data)=>{

    console.log("This the list of files\r",data)
})