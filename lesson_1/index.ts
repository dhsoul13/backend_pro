import * as http from "http";
let field = [
    ["","0",""],
    ["","",""],
    ["","","x"],
];
//create


//clear
//  post /fielt/clear

//state


//get field
//  get fielt

//send field 
//post /field/makeMove
//{x:nuber, y:number, user: '1':'2'}

const srv = new http.Server((req, res)=>{
  const {method, url} = req;
  console.log("request");
  if(method === "GET" && url == '/field'){
      res.end(JSON.stringify(field));
  } else if(method === "POST" && url == '/field/clear') {
        res.statusCode = 200;
        field = [
        ["","",""],
        ["","",""],
        ["","",""],
        ];
        res.end("field clear")
  } else if(method === "POST" && url == '/field/makeMove') {
        res.statusCode = 200;
        const data = [];
        req.on('data', (chunk)=> {
            data.push(chunk)
        })
        req.on('end', ()=> {
            const strData = Buffer.concat(data).toString();
            const dataGet = JSON.parse(strData);
            field[dataGet.x][dataGet.y] = dataGet.player;
            res.end("move")
        })
  }else {
    res.statusCode = 404;
    res.end("not found")
  }
}); 
srv.listen(2000); 