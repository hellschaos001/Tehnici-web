# Magazin de telefoane si servicii gsm
## Proiect - Tehnici web

### ETAPA 1:


1. Creați prima pagină a site-ului (doar prima pagină; fără stilizare încă, fiindcă veți primi taskuri legate de acest aspect). Puteți pune în această pagină text care va fi mutat în alte pagini, mai târziu, dar nu faceți încă mai multe pagini fiindcă le vom genera prin Node! La prezentare vă rog să aveți pentru fiecare task notată linia din program la care l-ați rezolvat ca să nu dureze prezentarea mai mult de 3-4 minute. 
2. Creați o pagină numită index.html. Adăugați doctype și setați limba documentului în tagul html
3. Folositi 4 taguri meta relevante pentru a specifica: charset-ul, autorul, cuvintele cheie, descrierea.
4. Adaugati un title corespunzator continutului textului
5. Adaugati un favicon relevant pentru temă.
6. Împărțiți body-ul în header, main, footer
7. În header faceți un sistem de navigare ca în curs(nav cu listă neordonată de linkuri), cu opțiuni  principale și secundare (pentru opțiunea "Acasă", adică pagina principală, subopțiunile vor cuprinde linkuri către secțiunile paginii, care vor avea id-uri relevante). Folosiți în header h1 pentru titlul site-ului.
8. Folosiți minim un tag dintre: section, article, aside. Trebuie să existe măcar un caz de taguri de secționare imbricate (secțiune în secțiune). Puneți headingul cu nivelul corespunzător nivelului imbricării. Atenție, nu folosim headinguri decât ca titluri pentru tagurile de secționare  
9. În cadrul secțiunilor folosiți minim 2 taguri dintre următoare taguri de grupare: p, ol, ul, blockquoute, dl
10. Textul trebuie să conțină toate cuvintele cheie identificate pentru pagina curentă. Puteți găsi mai multe sintagme cheie pe care le puteți folosi, cu `https://www.wordtracker.com/`  sau `https://app.neilpatel.com/en/ubersuggest/keyword_ideas`
	Acestea trebuie să apară de mai multe ori în pagină, în taguri relevante.
	În cadrul textului îndepliniți 3 dintre cerințele de mai jos, la alegere:
	a. marcați cuvintele și sintagmele cheie cu ajutorul tagului b
	b. marcați textul idiomatic (termeni științifici, în altă limbă, tehnici, de jargon, etc) cu tagul i
	c. marcați textul de atenționare cu strong
	d. marcați textul accentuat cu em
	e. marcați textul șters (corectat sau care nu mai e relevant) cu tagul s și textul inserat în loc cu tagul ins
	f. marcați o abreviere cu abbr și cu atributul title specificați sintagma abreviată
	g. marcați un termen definit cu dfn
	h. marcați un citat cu tagul q
11. Creați următoarele linkuri speciale: un link extern (se va deschide in fereastră nouă), un link în footer către începutul paginii, 2 linkuri care se deschid într-un iframe (se poate face ca în exemplul de curs, linkuri care deschid videoclipuri relevante de pe youtube în iframe)
12. Creați în pagină mai multe zone de details și summary. Pot fi întrebări frecvente, pot fi niște oferte pentru care afișăm titlul și utilizatorul le deschide pe cele care îl interesează, pot fi secțiuni explicative etc.
13. În footer se vor adăuga cu ajutorul tagului address informații de contact (telefon fictiv, marcată cu tagul a corespunzător, adresă fictivă, e-mail fictiv, marcat cu tagul a corespunzător)
14. În footer se va adăuga informație de copyright, folosind tagul small, simbolul specific de copyright cu codul html necesar (forma &cod;) și data creării paginii scrisă în limba română și pusă în tagul time cu atributul datetime corespunzător. 
15. Pagina trebuie sa fie valida din punct de vedere sintactic. Deci verificati cu validatorul html. Validatorul va fi pregătit într-un tab, la prezentare, și pagina se va valida pe loc.

---

### ETAPA 2

1. Task schema cromatica
2. Task layout pagina
3. Task meniu
4. Task taburi iframe
5. Link top
6. Task iconuri si font extern,

---

### ETAPA 3

** Trecerea site-ului pe NodeJs ** si ** crearea de fisiere EJS ** conform cerintelor:
1. Se va crea un obiect server express care va asculta pe portul 8080. (sau alt port daca aveti deja folosit 8080)
2. Se va folosi EJS pentru generarea (randarea) paginilor. Se va face un folder numit views în rădăcina proiectului. În el veți face un folder numit pagini (care conține paginile întregi) și altul numit fragmente (care conține părți de pagini (bucățele de cod html) ce pot fi refolosite pe mai multe pagini).
3. Din index (care va fi redenumit index.ejs) se vor decupa headerul și footerul și se vor pune în ejs-uri separate. De asemenea se va decupa partea de head care conține codul care nu se schimbă în funcție de pagină (de exemplu, tagul meta cu encodingul sau autorul, includerea faviconului, fișierelor css generale (nu specifice paginii) a scripturilor generale etc). Se va folosi funcția include() pentru a include toate aceste fragmente în pagini
4. Se va realiza (dacă nu l-ați făcut deja) un folder special cu toate resursele site-ului (în stilul exemplului de la curs în care am pus toate fișierele statice, precum imagini, fișiere de stil, videoclipuri etc în folderul "resurse"). Numele folderului îl decideți voi, însă va trebui să fie structurat, de asemenea, în subfoldere în funcție de tipul și modul de utilizarea al fișierelor. Se va defini în program acest folder ca fiind static
5. Se vor schimba căile fișierelor-resursă folosite în pagini, astfel încât să nu mai fie relative ci stil cerere către server (de exemplu, /resurse/stiluri/ceva.css în loc de, de exemplu, ../resurse/stiluri/ceva.css)
6. Prima pagină (index) trebuie să se poată accesa atât cu localhost:8080 cât și cu localhost:8080/index.
7. Veți declara un app.get() general care tratează orice cerere de forma /pagina randând fișierul pagina.ejs. Dacă acesta nu există, se va randa o pagină specială de eroare 404. Se va crea o pagină specială pentru eroarea 404. Pagina va avea atât ca titlu cât și heading textul "Eroare 404". Pagina pentru 404 trebuie să conțină headerul (cu tot cu meniu) și footerul. Pagina va avea un text care să se potrivească cu tema site-ului și o imagine care să simbolizeze căutarea fără succes.Se va seta codul de eroare 404 al răspunsului folosind funcția status().
8. Veți mai face încă o pagină (cu puțin text sau imagini, ca să aibă conținut), de exemplu o pagină cu descrierea site-ului sau istoricul său, al firmei virtuale pentru care este făcut etc. Această pagină trebuie să poată fi accesată prin meniu (linkul să fie corect și să transmită o cerere de tip get). Nu faceti încă pagina de produse, findcă pe acelea le preluăm din baza de date. Nici paginile de înregistrare sau login, fiindca le tratăm separat.
9. În zona din layout de date despre utilizator vom afișa ip-ul utilizatorului (prin program). Deocamdată, site-ul fiind local, veți vedea mereu ip-ul de localhost (adică ::1). Ip-ul real se va vedea când adăugați site-ul pe Heroku.
10. La cererea oricărui fișier cu extensia ejs se va transmite o eroare de tip 403 Forbidden. Pagina de 403 va avea format similar cu cea de 404, dar textul și imaginea schimbate corespunzător.

---

### ETAPA 4,5

1. Galerie statica
2. Galierie animata
3. Afisare + sortare/filtare/calculare pagina produse
4. Adaugare pe Heroku
5. Tema dark/light Theme

---

# Check list

- [x] Etapa 1
- [x] Etapa 2
- [x] Etapa 3
- [x] Etapa 4,5