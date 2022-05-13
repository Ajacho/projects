const { promiseImpl } = require('ejs');
var express = require('express');
const res = require('express/lib/response');
const { json, append } = require('express/lib/response');
var router = express.Router();

// });

router.get("/", async (req,res) => {
    const characterName = await getcharacters();

    console.log("------------");
    console.log(characterName);
    console.log("------------");

    res.render("characterList.ejs", characterName);
});

router.get("/:name", async(req, res, next) => {
    const getEachPerson = await getcharacters();
    const characterName = req.params.name;
    const getlocation = req.params.location;
    
    console.log("------------");
    console.log(characterName);
    console.log("---------ddd---");
    let index = -1;

    getEachPerson.results.forEach((value, i) => {
        if(value.name == characterName) {
            index = i;
        }
    });

    let personas = getEachPerson.results[index];

    if (index !== -1) res.render("singleCharacter.ejs", personas);
    else next();
});


router.get('/api/users', async(req, res) => {
    
    const signId = req.query.sign;
    res.send({
        'sign': signId
    });
});


module.exports = router;

let fetch = require("node-fetch");
const { response } = require('../app');

async function getcharacters() {
    let responsePromise = await fetch(
      "https://rickandmortyapi.com/api/character"
    );
    let json = await responsePromise.json();
    return json;
  }