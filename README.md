<a name="readme-top"></a>

<div align="right">
<a href="./README.en.md"><img src="https://img.shields.io/badge/%F0%9F%8C%8D%20lang-en-blue?style=flat"></a>
</div>

<!-- INTRO --> 
<br />
<div align="center">
  
  <img width="144" height="144" src="https://img.icons8.com/fluency/144/steam.png" alt="steam"/>

  <h3 align="center">Platforma za distribuciju videoigara</h3>

  <p align="center">
    Jednostavna web-aplikacija za interakciju sa MongoDB bazom podataka koristeći NodeJS. <br> Inspirirano servisom <a href="https://steamdb.info/">SteamDB</a> ✨
    <br /> 
    <a href="https://nastava.foi.hr/course/72610"><strong>Saznajte više »</strong></a>
    <br />

  </p>

  <br>
  
  <!-- TABLE OF CONTENTS -->

  <a href="#-uvod">Uvod</a> • 
  <a href="#-opis-projekta">Opis projekta</a> • 
  <a href="#-konfiguracija">Konfiguracija</a> • 
  <a href="#-upotreba">Upotreba</a> • 
  <a href="#-korišteni-alati">Korišteni alati</a>
</div>

<br>

<!-- ABOUT THE PROJECT -->
## 📖 Uvod

### Općenito

<table>
  <tbody>
    <tr>
      <td>👦🏽 Autor</td>
      <td>Marijan Kovač</td>
    </tr>
    <tr>
      <td>🧑🏽‍🏫 Nastavnik</td>
      <td>Prof. dr. sc. Kornelije Rabuzin</td>
    </tr>
    <tr>
      <td>📚 Kolegij</td>
      <td>Baze podataka 2</td>
    </tr>
    <tr>
      <td>🏛️ Ustanova</td>
      <td>Sveučilište u Zagrebu <br> Fakultet organizacije i informatike <br> Varaždin</td>
    </tr>
    <tr>
      <td>📆 Godina <br>polaganja</td>
      <td>2022</td>
    </tr>
  </tbody>
</table>

<p align="right">(<a href="#readme-top">povratak na vrh</a>)</p>

## 📝 Opis projekta

### Aplikacijska domena

Simulacija Steam
baze podataka, u obliku third-party web stranice pod nazivom SteamDB, koja služi
informiranju drugih korisnika o postojećim korisnicima, njihovim postignućima, videoigrama te
kolekcijama videoigara koje posjeduju.

### ERA model

Ključni entiteti:

* Korisnik
* Recenzija
* Videoigra
* Žanr
* Izdavač
* Platforma

Pomoćni entiteti:

* korisnik_videoigra
* korisnik_status
* je_igrao
* videoigra_platforma

<br>

ERA model:

<div align="center">
  <a href="./Documentation/images/Slika1.png"><img alt="era_model" src="./Documentation/images/Slika1.png"></a>
</div>

<br>

Za više detalja kliknite <a href="./Documentation/Platforma za distribuciju videoigara.pdf"><strong>ovdje</strong></a>.

<p align="right">(<a href="#readme-top">povratak na vrh</a>)</p>

## ⚙️ Konfiguracija

### Preduvjeti

Za pokretanje rješenja bit će vam potrebno sljedeće:

* MongoDB 

  ```
  👉🏽 Napomena: S obzirom da će zbog neaktivnosti moj klaster biti isključen, potrebno je kreirati vlastiti na način opisan u nastavku. Shemu nije potrebno kreirati ručno, važno je samo da naziv klastera i baze bude dosljedan kako bi sve bilo kompatibilno, dok se shema kreira automatski prilikom pokretanja skripte server.js, a također se vrši i popunjavanje inicijalnih podataka.
  ```

  * Posjetite <a href="https://www.mongodb.com/"><strong>MongoDB</strong></a> kako biste izradili korisnički račun

  * S kreiranim računom se prijavite na <a href="https://www.mongodb.com/atlas"><strong>MongoDB Atlas</strong></a>

    * Kliknite na `Create` i zatim odaberite `Shared` > `Create Cluster`

    * Naziv neka bude `steamdb-cluster`

  * Preuzmite i instalirajte <a href="https://www.mongodb.com/products/tools/compass"><strong>MongoDB Compass</strong></a> 

    * U MongoDB Compass kliknite na `New Connection`

    * Na MongoDB Atlas kliknite na `Connect` kod novokreiranog `steamdb-cluster` klastera i potom odaberite `Compass`

    * Kopirajte connection string i zalijepite u Compass

      ⚠️ Potrebno je zamijeniti `<password>` sa vlastitom lozinkom

      Primjer connection stringa:

      ```bash
      mongodb+srv://mkovac:<password>@steamdb-cluster.8iebd.mongodb.net/
      ```

    * Unutar Compass-a proširite `Advanced Connection Options` te odaberite `mongodb+srv`

    * Sada se može kliknuti na `Connect` te pristupiti i upravljati bazama podataka na prethodno kreiranom klasteru

    <div align="center">
      <a href="./Documentation/images/Screenshot_1.png"><img alt="steamdb" src="./Documentation/images/Screenshot_1.png"></a>
    </div>

  * Povežite MongoDB bazu podataka s aplikacijom:

    * Na MongoDB Atlas kliknite na `Connect` kod novokreiranog `steamdb-cluster` klastera i ovaj put odaberite `Drivers`

    * Odaberite `Mongoose` kao Driver

    * Korak za instalaciju drivera nije potrebno izvršavati jer će to biti napravljeno drugačijim postupkom u nastavku

    * Kopirati kreirani connection string

    * U datoteci `server.js` u liniji `23` (naredba `mongoose.connect`) na odgovarajuće mjesto zalijepiti vlastiti connection string, te ga prilagoditi kao u primjeru:

    ```bash
    mongodb+srv://mkovac:<password>@steamdb-cluster.8iebd.mongodb.net/steamdb
    ```

* NodeJS i npm

  * Preuzmite <a href="https://nodejs.org/en"><strong>NodeJS</strong></a>

    👉🏽 npm dolazi u paketu zajedno s NodeJS

    ⚠️ Prilikom instalacije preporuka je označiti da se instaliraju i dodatni alati (Chocolatey i ostalo)

  * Provjerite valjanost instalacije koristeći cmd:

    ```bash
    npm -v

    node -v
    ```

    👉🏽 Ako je sve u redu trebali biste dobiti ispis verzije

* Nodemon

  * Otvorite terminal i instalirajte nodemon koristeći naredbu:

    ```bash
    npm install -g nodemon
    ```

### Priprema

* Smjestite se u korijenski direktorij

  ```bash
  bp2/Software
  ```

* U direktoriju otvorite terminal (cmd) i izvršite naredbu:

  ```bash
   npm install --force
  ```

  👉🏽 Time će se kreirati direktorij `node_modules` s potrebnim modulima za rad aplikacije. Popis potrebnih modula nalazi se u datoteci `package.json`


<p align="right">(<a href="#readme-top">povratak na vrh</a>)</p>

## 🚀 Upotreba

* Pokretanje aplikacije:

  * Otvoriti Command Prompt (cmd) s administratorskim pravima (`Run as Administrator`)

  * Smjestiti se u korijenski direktorij projekta, npr:

    ```bash
    cd C:\Users\Marijan\Documents\bp2\Software
    ```

  * Izvršiti naredbu

    ```bash
    nodemon server.js
    ```

  * Ako je sve u redu, trebao bi se ispisati sljedeći sadržaj:

  <div align="center">
    <a href="./Documentation/images/Slika2.png"><img alt="steamdb" src="./Documentation/images/Slika2.png"></a>
  </div>

  <br>

  * Aplikacija je dostupna na adresi `localhost:3000`

* Početna stranica:

<div align="center">
  <a href="./Documentation/images/Slika3.png"><img alt="steamdb" src="./Documentation/images/Slika3.png"></a>
</div>

* Registracija:

<div align="center">
  <a href="./Documentation/images/Slika4.png"><img alt="steamdb" src="./Documentation/images/Slika4.png"></a>
</div>

* Prijava:

<div align="center">
  <a href="./Documentation/images/Slika5.png"><img alt="steamdb" src="./Documentation/images/Slika5.png"></a>
</div>

<br>


👉🏽 Napomena: Web-stranica nema neku posebnu ulogu, osim prikaza nekih podataka te funkcionalnosti prijave i registracije s demonstracijom rada okidača, dok je naglasak projekta više na korištenju NodeJS kao backend-a te rad sa MongoDB bazom podataka 😉


<p align="right">(<a href="#readme-top">povratak na vrh</a>)</p>

## ⛏️ Korišteni alati

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" width=100/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg" width=100/> &emsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width=100/> &emsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width=100/> &emsp;
  <img src="data:image/png;base64,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" width=100>
          

          



          
</div>

<p align="right">(<a href="#readme-top">povratak na vrh</a>)</p>


