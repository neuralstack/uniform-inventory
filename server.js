var fs = require("fs");
var express = require("express");
var http = require("http");
var https = require("https");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var path = require("path");
var cookieParser = require('cookie-parser');
var Items = require('./models/items');
var Styles = require('./models/styles');
var Raw_Items = require('./models/raw_items');
var Vendors = require('./models/vendors');
var Info = require('./models/info');
var Clients = require('./models/clients');
var Lpos = require('./models/lpos');
var Pos = require('./models/po');
var Job_Slip = require('./models/job_slips');
var pdf = require('html-pdf');
//  var   cookieSession = require('cookie-session');

 


// your express configuration here


// var formidable = require("formidable");
var sessions = require("express-session");
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyAHDeQsOYYGJsxpteeRbGPZHAqgEOih9h8",
    authDomain: "quizapp1-a28b4.firebaseapp.com",
    databaseURL: "https://quizapp1-a28b4.firebaseio.com",
    projectId: "quizapp1-a28b4",
    storageBucket: "quizapp1-a28b4.appspot.com",
    messagingSenderId: "351903158212"
}
config2 = {
    apiKey: "AIzaSyA7rfBhIutZdEG0R7xANM3Wy27lV7GP2-Q",
    authDomain: "yaseen-site.firebaseapp.com",
    databaseURL: "https://yaseen-site.firebaseio.com",
    projectId: "yaseen-site",
    storageBucket: "yaseen-site.appspot.com",
    messagingSenderId: "1093689830600"
  };
  firebase.initializeApp(config);
  
//var url = "mongodb://rapshek:natsikap1@ds263590.mlab.com:63590/cinstagram";
mongoose.connect("mongodb://rapshek:natsikap1@ds127604.mlab.com:27604/sap",{ useNewUrlParser: true  }, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connection with mongodb is successfull");

    }
});
var bodyParser = require("body-parser");
var app = express();
// app.use(cookieSession({
//     name: 'session',
//     keys: ['123'],
//     maxAge: 30 *24 * 60 * 60 * 1000
// }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: 'ddfd344f4dud8d8d8d8j',
    resave: false,
    saveUninitialized: true
}));



app.get("/", (req, res) => {

});
app.post("/add_style",(req,res)=>{
    let obj = {};
     obj.title = req.body.title;
    obj.fabric_code = req.body.fabric_code;
    obj.size = req.body.size ;
    obj.details = req.body.details;
    obj.measurements = req.body.measurements;
    obj.embroidry = req.body.embroidry ;
    obj.logo = req.body.logo;
    obj.gender = req.body.gender ;
    new Styles(obj).save((err,style)=>{
        if(err){throw err};
        console.log(style);
        res.redirect('/master.html');
    })
});
app.post("/add_item",(req,res)=>{
    let name = req.body.name;
    let detail = req.body.detail;
    let price = req.body.price ;
    let obj = {name:name,detail:detail,price:price} ;
    new Items(obj).save((err,item)=>{
        if(err){throw err};
        console.log(item);
        res.redirect('/master.html');
    })
});
app.post("/add_raw_item",(req,res)=>{
    let name = req.body.name;
    let detail = req.body.detail;
    let price = req.body.price ;
    let obj = {name:name,detail:detail,price:price} ;
    new Raw_Items(obj).save((err,item)=>{
        if(err){throw err};
        console.log(item);
        res.redirect('/master.html');
    })
});
app.post("/add_vendor",(req,res)=>{
    let name = req.body.name;
    let company_name = req.body.company_name;
    let street = req.body.street ;
    let city = req.body.city ;
    let phone = req.body.phone ;

    let obj = {name:name,company_name:company_name,street:street,city:city,phone:phone} ;
    new Vendors(obj).save((err,vendor)=>{
        if(err){throw err};
        console.log(vendor);
        res.redirect('/master.html');
    })
});
app.post("/job_slip/cutting",(req,res)=>{
    let number = req.body.number;
    let quantity = parseInt(req.body.quantity);
    Job_Slip.findOneAndUpdate({number:number},{$inc:{cutting:quantity}},(err,job_slip)=>{
        console.log(job_slip);
        res.redirect('/');
    })
});
app.post("/job_slip/stitching",(req,res)=>{
    let number = req.body.number;
    let quantity = parseInt(req.body.quantity);
    Job_Slip.findOneAndUpdate({number:number},{$inc:{stitching:quantity}},(err,job_slip)=>{
        console.log(job_slip);
        res.redirect('/');
    })
});
app.post("/job_slip/packing",(req,res)=>{
    let number = req.body.number;
    let quantity = parseInt(req.body.quantity);
    Job_Slip.findOneAndUpdate({number:number},{$inc:{packing:quantity}},(err,job_slip)=>{
        console.log(job_slip);
        res.redirect('/');
    })
});
app.post("/job_slip/delivering",(req,res)=>{
    let number = req.body.number;
    let quantity = parseInt(req.body.quantity);
    Job_Slip.findOneAndUpdate({number:number},{$inc:{delivery:quantity}},(err,job_slip)=>{
        console.log(job_slip);
        res.redirect('/');
    })
})
app.post("/add_client",(req,res)=>{
    let name = req.body.name;
    let company_name = req.body.company_name;
    let street = req.body.street ;
    let city = req.body.city ;
    let phone = req.body.phone ;

    let obj = {name:name,company_name:company_name,street:street,city:city,phone:phone} ;
    new Clients(obj).save((err,vendor)=>{
        if(err){throw err};
        console.log(vendor);
        res.redirect('/master.html');
    })
});
app.get('/get_vendors',(req,res)=>{
    Vendors.find({},(err,vendors)=>{
        res.json({vendors:vendors});
        res.end();
    })
});
app.get('/get_job_slips',(req,res)=>{
    Job_Slip.find({},(err,js)=>{
        res.json({job_slips:js});
        res.end();
    })
});
app.get('/get_styles',(req,res)=>{
    Styles.find({},(err,styles)=>{
        res.json({styles:styles});
        res.end();
    })
});
app.get('/get_items',(req,res)=>{
    Items.find({},(err,items)=>{
        res.json({items:items});
        res.end();
    })
});
app.get('/get_raw_items',(req,res)=>{
    Raw_Items.find({},(err,raw_items)=>{
        res.json({raw_items:raw_items});
        res.end();
    })
});
app.get('/get_pos',(req,res)=>{
    Pos.find({},(err,pos)=>{
        res.json({pos:pos});
        res.end();
    })
});
app.get('/get_lpos',(req,res)=>{
    if(req.query.flag){
        Lpos.find({flag:req.query.flag},(err,lpos)=>{
            res.json({lpos:lpos});
            res.end();
        })
    }
    else{
        Lpos.find({},(err,lpos)=>{
            res.json({lpos:lpos});
            res.end();
        })
    }
   
})
app.get('/get_clients',(req,res)=>{
    Clients.find({},(err,clients)=>{
        res.json({clients:clients});
        res.end();
    })
});
app.get('/get_client',(req,res)=>{
    let ref = req.query.lpo;
    console.log(ref);
    Lpos.findOne({ref:ref},(err,lpo)=>{
        let client_name = lpo.client;
        Clients.findOne({company_name:client_name},(err,client)=>{
            res.json({client:client});
            res.end();
        })
    })
    
});
app.get('/get_vendor',(req,res)=>{
    let ref = req.query.lpo;
    Lpos.findOne({ref:ref},(err,lpo)=>{
        let vendor_name = lpo.vendor;
        Vendors.findOne({company_name:vendor_name},(err,vendor)=>{
            res.json({vendor:vendor});
            res.end();
        })
    })
    
});
app.get('/get_info',(req,res)=>{
     
     Info.find({},(err,info)=>{
        res.json({info:info});
        res.end();
     })
})
app.post('/create_job_slip',(req,res)=>{
    let starting_number = req.body.starting_number,
     lpo_ref = req.body.lpo_ref,
      company_name = req.body.company_name ,
       product = req.body.product,
       quantity = req.body.quantity ,
      style = req.body.style ;
       let unique = Math.floor(Math.random()*9999999999 +  Math.random()*9999999999);
       let last_number = parseInt(starting_number)+parseInt(quantity)-1;
       console.log(last_number);
    new Job_Slip({ref:lpo_ref,number:unique,product:product,style:style,quantity:quantity,starting_number:starting_number,cutting:0,stitching:0,packing:0,delivery:0}).save((err,job_slip)=>{
        console.log("job slip ",job_slip);
        Info.findOneAndUpdate({last_number:(parseInt(starting_number)-1)},{last_number:last_number},(err,info)=>{
            res.redirect('/');
        })
    }) 
})
app.post('/add_lpo',(req,res)=>{
    let client = req.body.client;
    let lpo_num = req.body.lpo_num;
    let date = req.body.date;
    let ref = req.body.ref;
    let items_array = req.body.items_array;
   let parsed_items = JSON.parse(items_array);
   let str ;
   parsed_items.forEach((item,index)=>{
       str += `<tr><td>`+(index+1)+`</td><td>`+item.item+`</td><td>`+item.description+`</td><td>`+item.size+`</td><td>`+item.quantity+`</td><td>`+item.price+`</td><td>`+(parseInt(item.price)*parseInt(item.quantity))+`</td></tr>` ;
    })
    console.log(client);
    console.log(lpo_num);
    console.log(date);
    console.log(ref);
    console.log(items_array);
    // GENERATING PDF FILE
    var options = { format: 'A4' };
let html = `<html><head></head><body>
<div>

                    <div style="width:100%;display:block;max-width:100%;height:230px">
                        <div class="col-12" style="width:100%;display:block;max-width:100%;">
                            <img src="`+path.normalize('file://'+__dirname+'/public/assets/img/optimized-logo.png') +`" style='float:right;border-radius:5px' class="rounded float-right md-logo" alt="logo">
                        </div>
                    </div>
                    <hr>

                    <div style="width:100%;display:block;max-width:100%;height:210px">

                        <div style="width:100%;display:block;max-width:100%">

                            <div style="width:50%;display:inline;float:left">
                            <h3>ABBAS ALI & SONS check</h3>
                            <p><address id="address"></address></p> <!-- fetch address -->
                            <p><address id="city">karachi,pk</address></p> <!-- fetch city -->
                            <p>Phone: <span id="phone-no">+923452462819,+923452965650</span></p> <!-- fetch phone number -->
                            <p>Tel: <span id="fax-no">+92-31-3-4242673</span></p> <!-- fetch fax number -->
                            <p>Website: <span id="phone-no">www.abbasaliandsons.com</span></p> <!-- fetch website name of company -->

                            </div>

                            <div style="width:50%;display:inline;float:right">
                                <h3>Packing Slip</h3>
                                <div style='width:100%;display:block'>
                                    <div class="col-4" style='width:33%;display:inline'>
                                        <p>Date:</p>
                                    </div>
                                    <div class="col-8" style='width:66%;display:inline'>
                                        <p id="pur-date-g">`+req.body.date+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-4">
                                        P.O #
                                    </div>
                                    <div class="col-8">
                                        <p id="pur-po-g">`+req.body.lpo_num+`</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- packing address section -->
                    <div class="supply-content" style="width:100%;display:block;max-width:100%;height:250px">
                        <div class="row" style="width:100%;display:block;max-width:100%">
                            <div class="col-6" style="width:50%;display:inline;float:left">
                                <h3 class="main-subject">Bill To:</h3>
                                <div class="row">
                                    <div class="col-5">
                                        <p>Name:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-name-g">`+req.body.pur_name+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>Company Name:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-company-name-g">`+req.body.client+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>Street Address</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-vender-address-g">`+req.body.pur_vendor_address+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>City or ZIP:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-vender-city-g">`+req.body.pur_vendor_city+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>Phone:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-vender-phone-g">`+req.body.pur_vendor_phone+`</p>
                                    </div>
                                </div>

                            </div>

                            <div class="col-6" style="width:50%;display:inline;float:right">
                                <h3 class="main-subject">Ship To:</h3>
                                <div class="row">
                                    <div class="col-5">
                                        <p>Name:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-ship-name-g">`+req.body.pur_ship_name+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>Company Name:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-ship-company-name-g">`+req.body.pur_ship_company_name+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>Street Address</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-ship-address-g">`+req.body.pur_ship_address+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>City or ZIP:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-ship-city-g">`+req.body.pur_ship_city+`</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-5">
                                        <p>Phone:</p>
                                    </div>
                                    <div class="col-7">
                                        <p id="pur-ship-phone-g">`+req.body.pur_ship_phone+`</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <!-- product list section -->
                <table class="table table-bordered" style='display:block;width:100%;max-width:100%'>
                    <thead>
                        <tr class="d-flex">
                            <td class="col-1">S.no</td>
                            <td class="col-2">Product Category</td>
                            <td class="col-4">Description</td>
                            <td class="col-1">Size</td>
                            <td class="col-1">Order Qty</td>
                            <td class="col-1">Unit Price</td>
                            <td class="col-2">Total Price</td>
                        </tr>

                    <tbody id="create-lists">
                    `+str+`

                    </tbody>
                    </thead>
                </table>

</body></html>`
pdf.create(html, options).toFile('./test.pdf', function(err, resp) {
    if (err) return console.log(err);
    console.log(resp); // { filename: '/app/businesscard.pdf' }
    let attachments = [{ filename: 'lpo.pdf', path: __dirname + '/test.pdf', contentType: 'application/pdf' }];
    var mailOptions = {
        from: "Neural stack <rapshek@gmail.com>",
        to: "rapshek@gmail.com",
        subject: "local Purchasing Order",
        attachments: attachments,
        html: "<h1>lpo</h1>"
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, response){
        if(error) console.log(error);
        else console.log("Message sent: " + response.messageId);
        // shut down the connection pool, no more messages
       // transporter.close();
    });
     new Lpos({client:client,lpo_number:lpo_num,date:date,ref:ref,items_array:items_array,flag:'order_phase'}).save((err,lpo)=>{
        res.json({success:true,lpo:lpo});
        res.end();
    })  ;
    
  });

// GENERATING PDF FILE
   
    
});
app.post("/update_lpo_2",(req,res)=>{
    let flag;
    let po_num= req.body.ref;
    let qtys = JSON.parse(req.body.qtys);
    console.log(po_num);
    Pos.findOne({po_num:po_num},(err,po)=>{
        let purchase_array = JSON.parse(po.purchase_array);
             console.log("before:",purchase_array);
             purchase_array.forEach((item,index) => {
                 item.quantity = parseInt(item.quantity) - parseInt(qtys[index]);
             });
             console.log("mid:",purchase_array);
        
         let filtered = purchase_array.filter((item)=>
          item.quantity!=0
        )   
        if(filtered.length<1){
            flag = "purchased_done";
            po.flag=flag;
        }      
          po.purchase_array = JSON.stringify(purchase_array);
          po.save((err,po)=>{
            // lpos
                    Lpos.findOne({ref:po.ref},(err,lpo)=>{
     let purchase_array = JSON.parse(lpo.purchase_array);
     console.log("before:",purchase_array);
     purchase_array.forEach((item,index) => {
         item.quantity = parseInt(item.quantity) - parseInt(qtys[index]);
     });
     console.log("mid:",purchase_array);

 let filtered = purchase_array.filter((item)=>
  item.quantity!=0
)   
if(filtered.length<1){
    flag = "purchased_done";
    lpo.flag=flag;
}      
  lpo.purchase_array = JSON.stringify(purchase_array);
  lpo.save((err,lpo)=>{
    
    res.json({success:true,lpo:lpo});
    res.end();

  });

});

            //lpos
          });
    })






})
app.post('/update_lpo_1',(req,res)=>{
    let vendor = req.body.vendor;
    let po_num = req.body.po_num;
    let requisitioner = req.body.requisitioner;
    let ref = req.body.ref;
    let purchase_array = req.body.purchase_array;
    console.log(vendor);
    console.log(po_num);
    console.log(requisitioner);
    console.log(ref);
    console.log(purchase_array);
    Lpos.findOne({ref:ref},(err,lpo)=>{
        lpo.vendor = vendor;
        lpo.purchase_array = purchase_array;
        lpo.po_num = po_num;
        lpo.requisitioner = requisitioner;
        lpo.flag = 'order_phase';
        lpo.save((err,lpo)=>{
            new Pos({ref:ref,vendor:vendor,po_num:po_num,requisitioner:requisitioner,purchase_array:purchase_array}).save();
            res.json({success:true,lpo:lpo});
            res.end();
    
        })
    })
        
    
});





    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "rapshek@gmail.com", // generated ethereal user
            pass: "logical007" // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });



 

   
    
   
    //
    app.listen(80,()=>{
        console.log("server is running on port 80");
    })
