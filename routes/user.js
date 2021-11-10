exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var email = post.email;
      var phone = post.phone;
      var country = post.country;
      var city = post.city;
      var address = post.address;
      var password = post.password;
      var confpassword = post.confpassword;
     console.log(post);
	  if(username !='' && password!='' && password==confpassword) {
		  var sql = "INSERT INTO users(name,email,phone,country,city,address,password) VALUES ('" + username + "','" + email + "','" + phone + "','" + country + "','" + city + "','" + address + "','" + password + "')";

		  var query = db.query(sql, function(err, result) {
			 message = "Your account has been created succesfully2.";
			 res.render('signup.ejs',{message: message});
         // console.log(post);
		  });
	  } else {
		  message = "Username and password is mandatory field.";
		  res.render('signup.ejs',{message: message});
	  }

   } else {
      res.render('signup');
   }
};
 
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var email = post.email;
      var password= post.password;
     
      var sql="SELECT id, name, email, phone, country, city, address FROM `users` WHERE `email`='"+email+"' and password = '"+password+"'";                           
      db.query(sql, function(err, results){       
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/signupdeal');
         }
         else{
            message = 'You have entered invalid username or password.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};

           


exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};

exports.signupdeal = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var deal_title = post.deal_title;
      var company_name = post.company_name;
      var client_name = post.client_name;
      var client_email = post.client_email;
      var client_phone = post.client_phone;
      var offer_cost = post.offer_cost;
     
     if(deal_title !='') {
        var sql = "INSERT INTO deals(deal_title,company_name,client_name,client_email,client_phone,offer_cost) VALUES ('" + deal_title + "','" + company_name + "','" + client_name + "','" + client_email + "','" + client_phone + "','" + offer_cost + "')";

        var query = db.query(sql, function(err, result) {
          message = "Your deal has been created.";
          res.render('signupdeal.ejs',{message: message});
         
        });
        
     } else {
        message = "Fill in the deal details";
        res.render('signupdeal.ejs',{message: message});
     }

   } else {
     var sql='SELECT * FROM deals';

 db.query(sql, function(err, result){
     
      res.render('signupdeal.ejs', {data: result});    
   });  
   }
};

exports.deallist = function(req, res){
          
  
 var data = '';
   var sql='SELECT * FROM deals';

 db.query(sql, function(err, result){
      
      res.render('signupdeal.ejs', {data: result});    
   });     
};


exports.dealdelete = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var dealid = post.dealid;
   var sql="DELETE FROM `deals` WHERE `id`='"+dealid+"'";

   db.query(sql, function(err, result){
      message = "Deal deleted.";
      res.redirect('/signupdeal');    
   });
   
          
} else {
      res.redirect('/signupdeal');
   }
};