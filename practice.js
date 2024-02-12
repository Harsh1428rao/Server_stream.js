const http=require('http');
const fs=require('fs');


const server=http.createServer((req,res)=>{
    
    fs.readFile('hello.txt','utf8',(err,data)=>{
        if(err){
            console.log(err);
            fs.writeHead(404)
        }
        else{
            res.end(data);
            //console.log('File data'+data);
        }
    })
    const readableStream=fs.createReadStream('hello.txt',{encoding:'utf8',highWaterMark:64});
   let message='';
   readableStream.on('data',(chunk)=>{
    console.log("Recieved chunk of data: ");
    console.log(chunk);
    message+=chunk;
   });
   console.log("Data:"+message);

   readableStream.on('end',()=>{
    console.log("Finished reading data from the file");
    fs.writeFile("hello1.txt",message,(err)=>{
        if (!err)
            res.end("Data saved successfully!");
            else {
                console.log(`Error: ${err}`);
                res.end("Error occurred while saving data.");
            }
    });
});

readableStream.on('error',(err)=>{
    console.log(`Error occured while reading the file ${err}`);
});


});

server.listen(3000);