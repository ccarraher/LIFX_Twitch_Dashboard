const dotenv = require('dotenv')
const TES = require('tesjs')
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');
const PORT = process.env.PORT || 3001;
const AppToken = "";
var stateURL;
var effectsURL;
var BASE_URL = "https://api.lifx.com/v1/lights/all/effects/";
/*
if (effect == "None")
    {
      URL = BASE_URL + "off";
    }
    else {
      URL = BASE_URL + effect.toLowerCase();
    }
///////////////////////////////////////////////////
*/
// create our Express server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var followerStateData;
var followerEffectsData;
var subStateData;
var subEffectsData;
var duration;
var effect;
const stateAllURL = "https://api.lifx.com/v1/lights/all/state";

app.post('/api/followerState', (req, res) => {
    console.log(req.body);
    const selector = req.body.selector;
    console.log(selector);
    if (typeof selector != "undefined") {
        delete req.body.selector;
        stateURL = "https://api.lifx.com/v1/lights/all|" + selector.join("|") + "/state";
    } else {
        stateURL = "https://api.lifx.com/v1/lights/all/state";
    }
    followerStateData = req.body;
});
app.post('/api/followerEffects', (req, res) => {
    followerEffectsData = null;
    console.log(req.body);
    effect = req.body.Effect;
    delete req.body.Effect;
    var period = req.body.period;
    var cycles = req.body.cycles;
    duration = (period * cycles) * 1000;
    if (effect == "None")
    {
        effectsURL = BASE_URL + "off";
    }
    else {
        effectsURL = BASE_URL + effect.toLowerCase();
    }
    followerEffectsData = req.body;
});
app.get('/api/subState', (req, res) => {
    console.log('Inside Home Login');
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    console.log('Sub State Data : ', JSON.stringify(subStateData));
    res.end(JSON.stringify(subStateData));
});
app.get('/api/subEffects', (req, res) => {
    console.log('Inside Home Login');
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    console.log('Sub Effects Data : ', JSON.stringify(subEffectsData));
    res.end(JSON.stringify(subEffectsData));
});

const tes = new TES({
    identity: {
        id: "x2bfzk1uii2v7sevq4zda6tkse9grq",
        secret: "" //do not ship this in plaintext!! use environment variables so this does not get exposed
    },
    listener: {
        baseURL: "https://lifxtwitch.ngrok.io",
        server: app
    }
});


// define an event handler for the 'channel.update' event
// NOTES: 
//   this handles ALL events of that type
//   events will not be fired until there is a subscription made for them
tes.on('channel.follow', event => {
    console.time('Execution Time: ');
    var headers = {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + AppToken, 
    }
    console.log(followerStateData);
    if (effect == "Move") {
        try {
            const response = axios.put(stateURL, followerStateData, {headers});
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    function getFollowerEffectRequest(){
        try {
            const response = axios.post(effectsURL, followerEffectsData, {headers});
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    setTimeout(getFollowerEffectRequest, 1000);
    console.timeEnd("Execution Time: ");
    const infoURL = "https://api.lifx.com/v1/lights/all";
    const params = {
        method: 'GET',
        url: 'https://api.lifx.com/v1/lights/all',
        headers: {
            Authorization: "Bearer " + AppToken,
        },
    };
    var hue;
    if (effect == "Move") {
        async function getInfo(){
            try {
                const response = await axios(params);
                hue = response.data[0].color.hue;
                var payload = {
                    "color": {
                        "hue": hue,
                    }
                };
                console.log(payload);
                try {
                    const response = axios.put(stateAllURL, payload, {headers});
                    console.log(response.data);
                } catch (err) {
                    console.error(err);
                }
            } catch (err) {
                console.error(err);
            }
            
        };
        setTimeout(getInfo, duration + 2000);  
    }
});

// create a new subscription for the 'channel.follow' event for broadcaster '140629706'
tes.subscribe('channel.follow', {
    broadcaster_user_id: '140629706'
}).then(_ => {
    console.log('Subscription successful');
}).catch(err => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

