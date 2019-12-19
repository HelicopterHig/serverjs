const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
  
const pool = mysql.createPool({ 
	host: "localhost",
	user: "root",
	database: "fitcheck",
	password: "sip"
});


app.get('/user_login', (request, response) => { 
	var email = request.query.email;
	var password = request.query.password;
	pool.query('SELECT * FROM client WHERE email = ? AND password = ?', [email, password], (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
});



app.get('/insertTsk', (request, response) => { 
	
  var task_id = request.query.task_id;
  var date = request.query.date;
  var done = request.query.done;
  var client_id = request.query.client_id;
  var times = request.query.times;
  var sets = request.query.sets;
  var weight = request.query.weight;
  var time = request.query.time;
  var meters = request.query.meters;
   
	pool.query('INSERT INTO client_tasks SET task_id=?, date=?, done=?, client_id=?, times=?, sets=?, weight=?, time=?, meters=?;', [task_id, date, done, client_id, times, sets, weight, time, meters], (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
});


app.get('/utasks', (request, response) => { 
    var email = request.query.email;
    pool.query('SELECT ct.id, ct.task_id, ct.date, ct.done, ct.client_id, ct.times, ct.sets, ct.weight, ct.time, ct.meters, t.name, t.type, t.subtype FROM tasks t LEFT JOIN client_tasks ct ON t.id = ct.task_id LEFT JOIN client c ON c.id = ct.client_id WHERE c.email = ?;', email, (error, result) => {
  
  if(error) throw error;
 
    response.send(result);
  });
});
app.get('/user_tasks', (request, response) => {
    var email = request.query.email;
    pool.query('SELECT ct.id, ct.task_id, ct.date, ct.done, ct.client_id, ct.times, ct.sets, ct.weight, ct.time, ct.meters FROM client_tasks ct LEFT JOIN client c on c.id = ct.client_id WHERE c.email = ?;', email, (error, result)=>{

  if(error) throw error;

    response.send(result);
  });
});




app.get('/user', (request, response) => { 
	var name = request.query.name;
	var surname = request.query.surname;
	//var patronymic = request.query.patronymic;
	var email = request.query.email;
	var password = request.query.password;
	var phone_num = request.query.phone_num;
	var active = request.query.active;
	//var card_num = request.query.card_num;
	var gender = request.query.gender;
	//var adress = request.query.adress;
	var trainer_id = request.query.trainer_id;

	pool.query("INSERT INTO client SET name=?, surname=?, email=?, password=?, phone_num=?, active=?, gender=?, trainer_id=?;", [name, surname, email, password, phone_num, active, gender, trainer_id], (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
  
    	pool.query("INSERT INTO type_check SET email=?, type='client';", email, (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });

});

app.get('/getTask', (request, response) => { 
	
	var type = request.query.type;
   
	pool.query('SELECT DISTINCT subtype FROM tasks WHERE type = ?;', type, (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
});


app.get('/getAllTask', (request, response) => {

        var type = request.query.type;
	var subtype = request.query.subtype;

        pool.query('SELECT * FROM tasks WHERE type = ? AND subtype = ?;', [type, subtype], (error, result) => {
    if(error) throw error;

    response.send(result);
  });
});



app.get('/userTwo', (request, response) => {
        var name = request.query.name;
        var surname = request.query.surname;
        //var patronymic = request.query.patronymic;
        var email = request.query.email;
        var password = request.query.password;
        var phone_num = request.query.phone_num;
        var active = request.query.active;
        //var card_num = request.query.card_num;
        var gender = request.query.gender;
        //var adress = request.query.adress;
        var trainer_id = request.query.trainer_id;
        var weight = request.query.weight;
	var height = request.query.height;

        pool.query("INSERT INTO client SET name=?, surname=?, email=?, password=?, phone_num=?, active=?, gender=?, trainer_id=?;", [name, surname, email, password, phone_num, active, gender, trainer_id], (error, result) => {
    if(error) throw error;

    response.send(result);
  });

        pool.query("INSERT INTO type_check SET email=?, type='client';", email, (error, result) => {
    if(error) throw error;

    response.send(result);
  });

	//goal - это email пользователя
        pool.query("INSERT INTO client_form SET weight=?, height=?, goal=?, client_id = 1, pressure = -1, activity_lvl = 1, sport_experience = 'no', negative_effects = 'no', date = '1683-01-01';", [weight, height, email], (error, result) => {

    if(error) throw error;

    response.send(result);
  });



});



app.get('/trainer_login', (request, response) => { 
	var email = request.query.email;
	var password = request.query.password;
	pool.query('SELECT * FROM trainer WHERE email = ? AND password = ?', [email, password], (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
});

app.get('/trainer', (request, response) => { 
	var name = request.query.name;
	var surname = request.query.surname;
	//var patronymic = request.query.patronymic;
	var email = request.query.email;
	var password = request.query.password;
	var phone_num = request.query.phone_num;
	var gender = request.query.gender;
	//var adress = request.query.adress;

	pool.query("INSERT INTO trainer SET name=?, surname=?, email=?, password=?, phone_num=?, gender=?;", [name, surname, email, password, phone_num, gender], (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });

  	pool.query("INSERT INTO type_check SET email=?, type='trainer';", email, (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });

});

app.get('/deleteEx', (request, response) => { 
	var id = request.query.id;
	pool.query('DELETE FROM client_tasks WHERE id = ?;', id, (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
});


app.get('/updateEx', (request, response) => { 
    var val = request.query.val;
    var id = request.query.id;
	pool.query('UPDATE client_tasks SET done = ? WHERE id = ?', [val, id], (error, result) => {
    if(error) throw error;
 
    response.send(result);
  });
});


app.get('/login', (request, response) => { 
	var email = request.query.email;
	var password = request.query.password;


		pool.query("SELECT type FROM type_check WHERE email = ?", email, (error, result) => {
    if(error) throw error;
 
   var typ = result[0].type;

	pool.query("SELECT * FROM " + typ + " WHERE email = ? AND password = ?", [email, password], (error, result) => {
    if(error) throw error;
 
  response.send(result);
  });

});
});


app.listen(8008);
