const express = require("express");
const {Client} = require('pg');

const fs=require('fs');
const ejs=require('ejs');
const sass=require('sass');
const path = require('path');


// local
var client = new Client({ user: 'alex', password: 'alex', database: 'proiectweb', host: 'localhost', port:5432});

//heroku
// var client = new Client({ user: 'xxjdvwlznjtcyj',
//     password: '8675f6d5f4b84481a91549da464692685ee5a9c0965d7378375d8db9a6121387',
//     database: 'd6535g70b36fck', host: 'ec2-52-0-174-248.compute-1.amazonaws.com', port:5432,
//     ssl:{
//         rejectUnauthorized: false
//     }
// });

client.connect();
var app = express();

app = express();

console.log(__dirname);

app.set("view engine", "ejs");


// cale catre resurse pentru sv sa gaseasca resursele
app.use("/resurse", express.static(__dirname+"/resurse"));

app.get("*/galerie-animata.css", function(req,res){
    res.setHeader("Content-Type","text/css");//pregatesc raspunsul de tip css
    let sirScss=fs.readFileSync("./resurse/scss/galerie-animata.scss").toString("utf-8");
    nr_img=[8,10,12];
    let nr_aleator = nr_img[Math.floor(Math.random()*nr_img.length)];
    let rezScss=ejs.render(sirScss,{nr_imagini:nr_aleator});
    fs.writeFileSync("./resurse/temp/galerie-animata.scss",rezScss);

    let cale_css=path.join(__dirname,"resurse/temp","galerie-animata.css");//__dirname+"/temp/galerie-animata.css"
    let cale_scss=path.join(__dirname,"resurse/temp","galerie-animata.scss");

    sass.render({file: cale_scss, sourceMap:true}, function(err, rezCompilare) {
        if (err) {
            console.log(`eroare: ${err.message}`);
            //to do: css default
            res.end();//termin transmisiunea in caz de eroare
            return;
        }
        fs.writeFileSync(cale_css, rezCompilare.css, function(err){
            if(err){console.log(err);}
        });
        res.sendFile(cale_css);
    });
})
app.get("*/galerie-animata.css.map",function(req, res){     
    res.sendFile(path.join(__dirname,"resurse/temp/galerie-animata.css.map")); 
});

// trimite html ul dar nu si css ul
app.get(["/","/home","/index"], function(req, res){
    
    var buf_an=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf-8");
    obImagini_an=JSON.parse(buf_an);
    console.log(obImagini_an);
        res.render("pagini/index",{ip:req.ip,imagini_an:obImagini_an.imagini, cale_an:obImagini_an.cale_galerie})
        });


app.get("/produse", function(req, res){
    //console.log(req.query)
    var conditie=""
    if(req.query.tip)
        conditie+=` and tip_produs='${req.query.tip}'`;
    client.query(`select * from produse where 1=1 ${conditie}`, function(err,rez){
        //console.log(err)
        if (!err){
            //console.log(rez);
            client.query("select * from unnest(enum_range(null::culori))", function(errCulori, rezCulori){
                optiuni=[];
                //console.log(rezCulori);
                for(let elem of rezCulori.rows){
                    optiuni.push(elem.unnest);
                }
                //console.log(optiuni);
                res.render("pagini/produse",{produse:rez.rows, culori:optiuni});
            })
        } else {//TO DO curs
        }
    })
})

app.get("/produs/:id", function(req, res){
    console.log(req.params)
    client.query(`select * from produse where id=${req.params.id}`, function(err,rez){
        if (!err){
            console.log(rez);
            res.render("pagini/produs",{prod:rez.rows[0]});
        }
        else{//TO DO curs
        }
    })
})

app.get("/ceva", function(req, res){
    // console.log(req.url);
    res.write("Pagina2!");
    res.end();
});

app.get("/FAQ", function(req, res){
    console.log(res.url);
    res.render("pagini/FAQ");
})

// * wild card pentru orice
app.get("/*", function(req, res){
    // console.log(req.url);
    if(req.url.toString().includes(".ejs")){
        res.render("pagini/403")
    }
    else
    {
        res.render("pagini"+req.url, function(err, rezultatRender){
            // console.log(err);
            if(err){
                res.render("pagini/404.ejs")
                res.status(404).send();
            }
            else{
                // console.log(rezultatRender);
                res.send(rezultatRender);
            }
        })
    }
});






// local 
app.listen(8080);

// heroku
// var s_port = process.env.PORT || 5000;
// app.listen(s_port);

console.log("Serverul a pornit");

