const { response } = require('express');
const express = require('express');

app = express();

console.log(__dirname);

app.set("view engine", "ejs");


// cale catre resurse pentru sv sa gaseasca resursele
app.use("/resurse", express.static(__dirname+"/resurse"));

// trimite html ul dar nu si css ul
app.get("/", function(req, res){
    console.log(req.url);
    res.render("pagini/index.ejs");//calea e relativa la folderul views
});

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
    console.log(req.url);
    if(req.url.toString().includes(".ejs")){
        res.render("pagini/403")
    }
    else
    {
        res.render("pagini"+req.url, function(err, rezultatRender){
            console.log(err);
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
app.listen(8080);

console.log("Serverul a pornit");

