const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

app.use(session({
    secret:"steamdb",
    saveUninitialized: true,
    resave: true
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("combined"));
app.use(flash());

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://mkovac:nsLbzzPjJgBM9Sx@steamdb-cluster.8iebd.mongodb.net/steamdb", 
                {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Succesfully connected to MongoDB."))
.catch(err => console.error("Connection error: ", err));

const Korisnik = require("./models/korisnik")
const Korisnik_Status = require("./models/korisnik_status")
const Korisnik_Videoigra = require("./models/korisnik_videoigra")
const Recenzija = require("./models/recenzija")
const Je_Igrao = require("./models/je_igrao")
const Videoigra = require("./models/videoigra")
const Zanr = require("./models/zanr")
const Izdavac = require("./models/izdavac")
const Videoigra_Platforma = require("./models/videoigra_platforma")
const Platforma = require("./models/platforma");
const { findOne, insertMany } = require("./models/korisnik");

//popunjavanje tablica

Zanr.insertMany([
    {zanr_id: 1, oznaka: "Sandbox"},
    {zanr_id: 2, oznaka: "Shooter"},
    {zanr_id: 3, oznaka: "Action"},
    {zanr_id: 4, oznaka: "MOBA"},
    {zanr_id: 5, oznaka: "Simulation"}
])
.then(zanr => {
    console.log("> Dodani su novi žanrovi.\n", zanr)

    Izdavac.insertMany([
        {izdavac_id: 1, naziv_izdavaca: "SCS Software"},
        {izdavac_id: 2, naziv_izdavaca: "Rockstar Games"},
        {izdavac_id: 3, naziv_izdavaca: "Activision"},
        {izdavac_id: 4, naziv_izdavaca: "Mojang"},
        {izdavac_id: 5, naziv_izdavaca: "Riot Games"}
    ])
    .then(izdavac => {
        console.log("> Dodani su novi izdavači.\n", izdavac)

        Videoigra.insertMany([
            {videoigra_id: 1, zanr_id: 4, izdavac_id: 5, naziv_igre: "League of Legends"},
            {videoigra_id: 2, zanr_id: 3, izdavac_id: 2, naziv_igre: "Grand Theft Auto V"},
            {videoigra_id: 3, zanr_id: 5, izdavac_id: 1, naziv_igre: "Euro Truck Simulator 2"},
            {videoigra_id: 4, zanr_id: 1, izdavac_id: 4, naziv_igre: "Minecraft"},
            {videoigra_id: 5, zanr_id: 2, izdavac_id: 3, naziv_igre: "Call of Duty: Black Ops 3"},
            {videoigra_id: 6, zanr_id: 4, izdavac_id: 5, naziv_igre: "Call of Duty: World at War"}
        ])
        .then(videoigra => console.log("> Dodane su nove videoigre!\n", videoigra))
        .catch(err => console.log("Greška u dodavanju videoigara: ", err))
    })
    .catch(err => console.log("Greška u dodavanju izdavaca: ", err))
})
.catch(err => console.log("Greška u dodavanju žanrova: ", err))

Platforma.insertMany([
    {platforma_id: 1, naziv_platforme: "PC"},
    {platforma_id: 2, naziv_platforme: "Playstation 4"},
    {platforma_id: 3, naziv_platforme: "XBOX 360"}
])
.then(platforma => {
    console.log("> Dodane su nove platforme!\n", platforma)

    Videoigra_Platforma.insertMany([
        {videoigra_platforma_id: 1, videoigra_id: 1, platforma_id: 1},
        {videoigra_platforma_id: 2, videoigra_id: 2, platforma_id: 1},
        {videoigra_platforma_id: 3, videoigra_id: 2, platforma_id: 2},
        {videoigra_platforma_id: 4, videoigra_id: 2, platforma_id: 3},
        {videoigra_platforma_id: 5, videoigra_id: 3, platforma_id: 2},
        {videoigra_platforma_id: 6, videoigra_id: 4, platforma_id: 1},
        {videoigra_platforma_id: 7, videoigra_id: 5, platforma_id: 1},
        {videoigra_platforma_id: 8, videoigra_id: 5, platforma_id: 2},
        {videoigra_platforma_id: 9, videoigra_id: 5, platforma_id: 3},
        {videoigra_platforma_id: 10, videoigra_id: 6, platforma_id: 1}
    ])
    .then(videoigra_platforma => console.log("> Dodane su nove veze videoigra-platforma!\n", videoigra_platforma))
    .catch(err => console.log("Greška u dodavanju veza videoigra-platforma: ", err))
})
.catch(err => console.log("Greška u dodavanju platformi: ", err))

Korisnik.insertMany([
    {korisnik_id: "pero_djetlic", lozinka: "pero123", nadimak: "Djetlic", lokacija: "Velika Gorica, Hrvatska", br_mobitela: null, email: "pero_djetlic@gajba.com"},
    {korisnik_id: "njiha_njiha", lozinka: "aloba123", nadimak: "Njiha", lokacija: "Široki brijeg, Bosna i Hercegovina", br_mobitela: "+38599847271452", email: "njiha@bhtel.com"},
    {korisnik_id: "znjkf", lozinka: "lovehell321", nadimak: "Znjkf", lokacija: null, br_mobitela: null, email: "znjkf@hotmail.com"}
])
.then(korisnik => {
    console.log("> Dodani su novi korisnici!\n", korisnik)

    korisnik.forEach(element => {
        Korisnik_Status.create({korisnik_id: element.korisnik_id, razina: 0, vidljivost: "PRIVATNO"})
        .then(korisnik_status => {
            console.log("> Dodana je nova veza korisnik-status korisnika!\n", korisnik_status)
        })
        .catch(err => {console.log("Greška u dodavanju veze korisnik-status korisnika: ", err)})
    });
})
.catch(err => {console.log("Greška u dodavanju novih korisnika: ", err)})

Korisnik_Videoigra.insertMany([
    {korisnik_videoigra_id: 1, korisnik_id: "pero_djetlic", videoigra_id: 1, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 2, korisnik_id: "pero_djetlic", videoigra_id: 4, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 3, korisnik_id: "njiha_njiha", videoigra_id: 2, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 4, korisnik_id: "znjkf", videoigra_id: 1, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 5, korisnik_id: "znjkf", videoigra_id: 2, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 6, korisnik_id: "znjkf", videoigra_id: 3, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 7, korisnik_id: "znjkf", videoigra_id: 4, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 8, korisnik_id: "znjkf", videoigra_id: 5, datum_dodavanja: Date.now()},
    {korisnik_videoigra_id: 9, korisnik_id: "znjkf", videoigra_id: 6, datum_dodavanja: Date.now()}
])
.then(korisnik_videoigra => {
    console.log("> Dodane su nove veze korisnik-videoigra! \n", korisnik_videoigra)

    Recenzija.insertMany([
        {korisnik_videoigra_id: 1, opis_recenzije: "Nemojte igrat ovu igricu.", preporuka: NE},
        {korisnik_videoigra_id: 2, opis_recenzije: "Najbolja igrica ikad napravljena.", preporuka: DA},
        {korisnik_videoigra_id: 3, opis_recenzije: "FPS dropovi, ne valja ništa.", preporuka: NE},
        {korisnik_videoigra_id: 5, opis_recenzije: "Money money money", preporuka: DA},
        {korisnik_videoigra_id: 8, opis_recenzije: "Cheaters.", preporuka: NE}
    ])
    .then(recenzija => {
        console.log("> Dodane su nove recenzije! ", recenzija)

        Je_Igrao.insertMany([
            {korisnik_videoigra_id: 1, zadnji_datum: Date.now(), broj_sati: 1954},
            {korisnik_videoigra_id: 2, zadnji_datum: Date.now(), broj_sati: 2068},
            {korisnik_videoigra_id: 3, zadnji_datum: Date.now(), broj_sati: 14},
            {korisnik_videoigra_id: 5, zadnji_datum: Date.now(), broj_sati: 558},
            {korisnik_videoigra_id: 8, zadnji_datum: Date.now(), broj_sati: 3},
        ])
        .then(je_igrao => {
            console.log("> Dodane su nove veze videoigre korisnika-je igrao! ", je_igrao)
        })
        .catch(err => {
            console.log("Greška u dodavanju nove veze videoigre korisnika-je igrao: ", err)
        })
    })
    .catch(err => {
        console.log("Greška u dodavanju novih recenzija: ", err)
    })
})
.catch(err => {
    console.log("Greška u dodavanju novih veza korisnik-videoigra: ", err)
})

//web-stranica

app.get("/", function(req, res){
    Korisnik_Videoigra.aggregate([
        {
            $lookup:{
                from: "korisnik",
                localField: "korisnik_id",
                foreignField: "korisnik_id",
                as: "podaci_korisnik"
            }
        },
        {
            $unwind: "$podaci_korisnik"
        },
        {
            $lookup:{
                from: "videoigra",
                localField: "videoigra_id",
                foreignField: "videoigra_id",
                as: "podaci_videoigra"
            }
        },
        {
            $unwind: "$podaci_videoigra"
        },
        {
            $lookup:{
                from: "recenzija",
                localField: "korisnik_videoigra_id",
                foreignField: "korisnik_videoigra_id",
                as: "podaci_recenzija"
            }
        },
        {
            $unwind: "$podaci_recenzija"
        },
        {
            $project:{
                nadimak: "$podaci_korisnik.nadimak",
                naziv_igre: "$podaci_videoigra.naziv_igre",
                opis_recenzije: "$podaci_recenzija.opis_recenzije",
                preporuka: "$podaci_recenzija.preporuka"
            }
        }
    ],
    function(err, rezultat){
        res.render("pages/dobrodosli",{
            lista_rezultat: rezultat
        })
    })
})

app.get("/registracija", function(req, res){
    const message = req.flash("message");
    res.render("pages/registracija", {message})
})

app.post("/registracija", async (req, res) => {
    const korisnicko_ime = req.body.korisnicko_ime
    const lozinka = req.body.lozinka
    const nadimak = req.body.nadimak
    const lokacija = req.body.lokacija
    const br_mobitela = req.body.br_mobitela
    const email = req.body.email

    Korisnik.findOne({$or: [{korisnik_id: korisnicko_ime}, {email: email}]})
    .then(korisnik => {
        if(korisnik){
            req.flash("message", "Već je registriran korisnik s istim korisničkim imenom ili e-mail računom!");
            res.redirect("/registracija");
        }
        else{
            Korisnik.create({korisnik_id: korisnicko_ime, lozinka: lozinka, nadimak: nadimak, lokacija: lokacija, br_mobitela: br_mobitela, email: email})
            .then(korisnik => {
                console.log("> Podaci o korisniku spremljeni! \n", korisnik)
                
                Korisnik_Status.create({korisnik_id: korisnicko_ime, razina: 0, vidljivost: "privatno"})
                .then(korisnik_status => {
                    console.log("> Podaci o statusu korisnika spremljeni! \n", korisnik_status)
                    res.redirect("/prijava")
                })
                .catch(err => {
                    console.error("> Greska u spremanju podataka: ", err)
                    req.flash("message", "Greška u spremanju podataka u bazu!");
                    res.redirect("/registracija")
                })
            })
            .catch(err => {
                console.error("> Greska u spremanju podataka: ", err)
                req.flash("message", "Greška u spremanju podataka u bazu!");
                res.redirect("/registracija")
            }); 
        }
    })
})

app.get("/prijava", function(req, res){
    const message = req.flash("message");
    res.render("pages/prijava", {message})
})

app.post("/prijava", async (req, res) => {
    const korisnicko_ime = req.body.korisnicko_ime;
    const lozinka = req.body.lozinka;

    Korisnik.findOne({korisnik_id: korisnicko_ime})
    .then(korisnik => {
        if(korisnik){
            if(korisnik.lozinka === lozinka){
                res.redirect("/portfolio") 
            }
            else{
                req.flash("message", "Netočna lozinka!");
                res.redirect("/prijava");
            }
        }
        else{
            req.flash("message", "Korisnik ne postoji!");
            res.redirect("/prijava");
        }
    })
    .catch(err => {
        req.flash("message", err);
        res.redirect("/prijava")
    })
})

app.get("/portfolio", function(req, res){
    res.render("pages/portfolio")
})

const port = 3000;
app.listen(port, function(){
    console.log("Server is running on port [%d].", port);
})

