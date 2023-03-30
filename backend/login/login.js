var bcrypt = require("bcryptjs");
queryString = require("query-string")
const axios = require('axios');
require('dotenv').config();
const hash = require("./cookie.json")

async function checkLogin(app){
    app.post("/login/pas", async (req, res) =>{
        var pas = req.body.pas
        bcrypt.compare(pas, hash.text, function(err, result) {
            if (result){
                res.status(200).send("2")
            } else {
                bcrypt.compare(pas, hash.text2, function(err, result) {
                    if (result){
                        res.status(200).send("1")
                    } else {
                        bcrypt.compare(pas, hash.text3, function(err, result) {
                            if (result){
                                res.status(200).send("3")
                            } else {
                                bcrypt.compare(pas, hash.text4, function(err, result) {
                                    if (result){
                                        res.status(200).send("4")
                                    } else {
                                        bcrypt.compare(pas, hash.text5, function(err, result) {
                                            if (result){
                                                res.status(200).send("5")
                                            } else {
                                                bcrypt.compare(pas, hash.text8, function(err, result) {
                                                    if (result){
                                                        res.status(200).send("8")
                                                    } else {
                                                        bcrypt.compare(pas, hash.text7, function(err, result) {
                                                            if (result){
                                                                res.status(200).send("7")
                                                            } else {
                                                                bcrypt.compare(pas, hash.text6, function(err, result) {
                                                                    if (result){
                                                                        res.status(200).send("6")
                                                                    } else {
                                                                        res.status(401).send({text:"Es wurde das falsche Passwort eingegben"})
                                                                    }  
                                                                });
                                                            }  
                                                        });
                                                    }  
                                                });
                                            }  
                                        });
                                    }  
                                });
                            }  
                        });
                    }  
                });
            }  
        });
        /*Password Generator
        const saltRounds = 9001;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(pas, salt, function(err, hash) {
                console.log("-----------")
                console.log("~"+hash+"~")
                console.log("-----------")
            });
        });*/
    })
    app.get("/auth", (req, res) => {
        const params = queryString.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            scope: ['read:user', 'user:email'].join(' '), 
            allow_signup: true,
          });
        res.redirect(
            `https://github.com/login/oauth/authorize?${params}` 
        )
    })
    app.get("/oauth-callback", ({ query: { code } }, res) => {
        const body = {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_SECRET,
          code,
        };
        const opts = { headers: { accept: 'application/json' } };
    axios
    .post('https://github.com/login/oauth/access_token', body, opts) 
    .then((_res) => _res.data.access_token)
    .then(async (token) => {
      // eslint-disable-next-line no-console
      console.log('My token:', token);
      const data = await axios({
        url: 'https://api.github.com/user', 
        method: 'get',
        headers: {
          Authorization: `token ${token}`,
        },
      });
      console.log(data.data )
      var id = data.data.id; 
      res.redirect(`http://localhost:4200/?id=${id}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
    })
    return("ok")
}

module.exports = checkLogin;