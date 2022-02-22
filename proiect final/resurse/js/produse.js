window.onload= function(){

    
    var btn=document.getElementById("filtrare");
    btn.onclick=function(){
        var articole=document.getElementsByClassName("produs");
        
        for(let art of articole){

            art.style.display="none";

            
            /*
            v=art.getElementsByClassName("nume")
            nume=v[0]*/
            var nume=art.getElementsByClassName("val-nume")[0];//<span class="val-nume">aa</span>
            // console.log(nume.innerHTML)
            var conditie1=nume.innerHTML.startsWith(document.getElementById("inp-nume").value)
            
            var pret=art.getElementsByClassName("val-pret")[0]
            var conditie2=parseInt(pret.innerHTML) > parseInt(document.getElementById("inp-pret").value);

            
            var radbtns=document.getElementsByName("gr_rad");
            for (let rad of radbtns){
                if (rad.checked){
                    var nrButon=rad.value;//poate fi 1, 2 sau 3
                    break;
                }
            }
            console.log(nrButon);
            
            
            
            var tip_produs = art.getElementsByClassName("val-tip_produs")[0].innerHTML;
            var conditie3=false;

            console.log(tip_produs);

            switch (nrButon){
                case "1": conditie3 = (tip_produs == 'Samsung'); break;
                case "2": conditie3 = (tip_produs == 'Apple'); break;
                case "3": conditie3 = (tip_produs == 'Huawei'); break;
                default: conditie3 = true;
            }
            
            var descriere = art.getElementsByClassName("val-descriere")[0].innerHTML;
            var conditie4 = descriere.includes(document.getElementById("inp-descriere").value);
            
            var data_lansarii = art.getElementsByClassName("val-data_lansarii")[0].innerHTML;
            var conditie5 = true;
            var checked = document.getElementsByName("check_box")[0].checked;
            
            if( data_lansarii.substring(11, 15) != new Date().getFullYear() && checked == true)
                conditie5 = false;

            var selCateg=document.getElementById("inp-categorie_simplu");
            var conditie6= (art.getElementsByClassName("val-promotie")[0].innerHTML == selCateg.value || selCateg.value=="toate");
            
            var opMultiple = Array.prototype.slice.call(document.querySelectorAll('#inp-categorie_multiplu option:checked'),0).map(function(v,i,a) { 
                return v.value;
            });
            var conditie7 = (opMultiple.includes(art.getElementsByClassName("val-culoare")[0].innerHTML) || opMultiple.includes("toate"));

            if(conditie1 && conditie2 && conditie3 && conditie4 && conditie5 && conditie6 && conditie7)
                art.style.display="grid";
            
        }
    }

    var rng=document.getElementById("inp-pret");
    rng.onchange=function(){
        var info = document.getElementById("infoRange");//returneaza null daca nu gaseste elementul
        if(!info){
            info=document.createElement("span");
            info.id="infoRange"
            this.parentNode.appendChild(info);
        }
        
        info.innerHTML="("+this.value+")";
    }



    function sorteaza(semn){
        var articole=document.getElementsByClassName("produs");
        var v_articole=Array.from(articole);
        v_articole.sort(function(a,b){
            var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
            var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
            if(nume_a!=nume_b){
                return semn*nume_a.localeCompare(nume_b);
            }
            else{
                var pret_a=parseInt(a.getElementsByClassName("val-pret")[0].innerHTML);
                var pret_b=parseInt(b.getElementsByClassName("val-pret")[0].innerHTML);
                var dimensiune_a=parseInt(a.getElementsByClassName("val-dimensiune")[0].innerHTML);
                var dimensiune_b=parseInt(b.getElementsByClassName("val-dimensiune")[0].innerHTML);
                return semn*((dimensiune_a/pret_a)-(dimensiune_b/pret_b));
            }
        });
        for(let art of v_articole){
            art.parentNode.appendChild(art);
        }
    }

    var btn2=document.getElementById("sortCrescNume");
    btn2.onclick=function(){
        
        sorteaza(1)
    }

    var btn3=document.getElementById("sortDescrescNume");
    btn3.onclick=function(){
        sorteaza(-1)
    }


    document.getElementById("resetare").onclick=function(){
        //resetare inputuri
        document.getElementById("i_rad4").checked=true;
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("infoRange").innerHTML="("+document.getElementById("inp-pret").min+")";

        //de completat...


        //resetare articole
        var articole=document.getElementsByClassName("produs");
        for(let art of articole){

            art.style.display="grid";
        }
    }
 }


 window.onkeydown=function(e){
    //console.log(e);
    if(e.key=="c" && e.altKey==true){
        var suma=0;
        var articole=document.getElementsByClassName("produs");
        for(let art of articole){
            if(art.style.display!="none")
                suma+=parseFloat(art.getElementsByClassName("val-pret")[0].innerHTML);
        }

        var spanSuma;
        spanSuma=document.getElementById("numar-suma");
        if(!spanSuma){
            spanSuma=document.createElement("span");
            spanSuma.innerHTML=" Suma:"+suma;//<span> Suma:...
            spanSuma.id="numar-suma";//<span id="..."
            document.getElementById("p-suma").appendChild(spanSuma);
            setTimeout(function(){document.getElementById("numar-suma").remove()}, 1500);
        }
    }
 }