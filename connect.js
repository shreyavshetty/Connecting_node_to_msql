var express=require('express');//require express module
var app=express();//create an instance of express
var mysql=require('mysql');//require mysql module
var connection=mysql.createConnection({ //establish connection to mysql
    host:'localhost',
    user:'root',
    password:'password',
    database:'demo'
});
connection.connect(function(error){//check if the connection is established
    if(!!error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }
    
});
app.get('/sciencefiction',function(req,res){//route to Science fiction page
    var id;
    var result1=[];
    var result2=[];
    var result=[];
    connection.query("select * from genre where name=?",'Science fiction',//first query to the genre table
        function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            else
            {
              id=rows[0].id;//storing the id
              result1.push({'id':rows[0].id,'name':rows[0].name})
            }
            result.push({'genre info':result1})
            connection.query("select * from books where genre_id=?",id,//nested query to books table
        function(err,rows){
            if(err){
                console.log(err);
                return;
            }
            else
            {
                 
                for(var i=0; i<rows.length; i++)
                {
                result2.push({'book name':rows[i].name,'author name': rows[i].description});
                } 
                
            }
            result.push({'book info':result2});//push the info into result
            
            });
       });
                  res.contentType('application/json');//setting respons type to json
                  res.send(JSON.stringify(result));  //send jsons      
            }); 

app.listen(1337);//listen on port 1337 
