/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

async function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function warframeapi() {
    var warframeWeb = document.querySelector('#warframeWeb');
    //var warframeAlerts = document.querySelector('#warframeAlerts');

    let warframeData = await Promise.all([getData('https://api.warframestat.us/pc')]);

    let warframeNews = warframeData[0]['news'];
    //let warframeAlert = warframeData[0]['alerts'];
  
    for (let i in warframeNews) {
        let postDiv = document.createElement('div');

        let postHead = document.createElement('div');
        postHead.classList.add('row');

        let PostTitleDiv = document.createElement('h2');
        PostTitleDiv.classList.add('alert', 'alert-dark');
        PostTitleDiv.setAttribute('href', warframeNews[i]['link']);
        PostTitleDiv.innerHTML = 
            '[' + warframeNews[i]['eta'] + '] ' + 
            '<a href=' + warframeNews[i]['link'] + '>' + warframeNews[i]['message'] + '</a>'
        postHead.appendChild(PostTitleDiv);

        postDiv.appendChild(postHead);

        warframeWeb.appendChild(postDiv);
    }

    // for (let i in warframeAlert) {
    //     let postDiv = document.createElement('div')

    //     let postHead = document.createElement('div')
    //     postHead.classList.add('row')

    //     let PostTitleDiv = document.createElement('h2')
    //     PostTitleDiv.classList.add('alert', 'alert-dark')
    //     PostTitleDiv.setAttribute('href', warframeNews[i]['link'])
    //     PostTitleDiv.innerHTML = warframeAlert[i]['mission']['node'] +  ' - ' + warframeAlert[i]['eta'] + ' left'
    //     postHead.appendChild(PostTitleDiv)

    //     let postBody = document.createElement('h3')
    //     postBody.classList.add('alert', 'alert-info')
    //     postBody.innerHTML = 
    //         '<p> Mission:' + warframeAlert[i]['mission']['type'] + '</p>' +
    //         '<p> Level: ' + warframeAlert[i]['mission']['minEnemyLevel'] + ' - ' + warframeAlert[i]['mission']['maxEnemyLevel'] + '</p>' +
    //         '<p> Rewards: ' + warframeAlert[i]['mission']['reward']['itemString'] + ' ' + warframeAlert[i]['mission']['reward']['credits'] + ' credits' + '</p>'
    //     postHead.appendChild(postBody)

    //     postDiv.appendChild(postHead)

    //     warframeAlerts.appendChild(postDiv)
    // }
}

async function warframealertsapi() {
    var warframeAlerts = document.querySelector('#warframeAlerts')

    warframeAlerts.innerHTML = '<h2 class="card-header"> Warframe Alerts <button type="button" class="btn btn-success" onclick="warframealertsapi()" >Refresh</button></h2>'

    let warframeData = await Promise.all([getData('https://api.warframestat.us/pc')])

    let warframeAlert = warframeData[0]['alerts']

    for (let i in warframeAlert) {
        let postDiv = document.createElement('div')

        let postHead = document.createElement('div')
        //postHead.classList.add('row')

        let PostTitleDiv = document.createElement('h2')
        PostTitleDiv.classList.add('alert', 'alert-dark')
        //PostTitleDiv.setAttribute('href', warframeNews[i]['link'])
        PostTitleDiv.innerHTML = 'Location: ' + warframeAlert[i]['mission']['node'] +  '   Timer: ' + warframeAlert[i]['eta'] + ' left'
        postHead.appendChild(PostTitleDiv)

        let postBody = document.createElement('h3')
        postBody.classList.add('alert', 'alert-info')
        postBody.innerHTML = 
            '<p> Mission Type: ' + warframeAlert[i]['mission']['type'] + '</p>' +
            '<p> Enemy Levels: ' + warframeAlert[i]['mission']['minEnemyLevel'] + ' - ' + warframeAlert[i]['mission']['maxEnemyLevel'] + '</p>' +
            '<p> Rewards: ' + warframeAlert[i]['mission']['reward']['itemString'] + ' ' + warframeAlert[i]['mission']['reward']['credits'] + ' credits' + '</p>'
        postHead.appendChild(postBody)

        postDiv.appendChild(postHead)

        warframeAlerts.appendChild(postDiv)
    }

}

async function steamPopulate() {
    var steamweb = document.querySelector('#steamWeb')

    var numLength = document.querySelector('#numLength').value

    steamweb.innerHTML = '<h2 class="card-header"> Steam News <input type="number" id="numLength" size="3" value="' + numLength + '"/><button type="button" class="btn btn-success" onclick="steamPopulate()">Refresh</button> </h2><p></p>'

    //let news = await Promise.all([getData('http://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=BE68484C46B850AACC83630F2EF9C8A3&appid=230410&count=6&maxlength=300&format=json')])
    
    let news = await Promise.all([getData('http://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=BE68484C46B850AACC83630F2EF9C8A3&appid=230410&count='+ numLength +'&maxlength=300&format=json')])

    
    let steamapi = news[0]['appnews']['newsitems']
    
    for (let i in steamapi) {
        let postDiv = document.createElement('div')

        let postHead = document.createElement('div')
        // postHead.classList.add('row')

        let PostTitleDiv = document.createElement('h1')
        PostTitleDiv.classList.add('col','h1')
        PostTitleDiv.innerHTML = steamapi[i]['title']
        postHead.appendChild(PostTitleDiv)

        let userInfo =  document.createElement('div')
        userInfo.classList.add('alert','alert-info')
        userInfo.innerHTML = steamapi[i]['contents'] + '<a href='+ steamapi[i]['url'] + '>' + ' Click here to read more' + '</a>'
        postHead.appendChild(userInfo)

        postDiv.appendChild(postHead)

        steamweb.appendChild(postDiv)
    }
}

async function weatherPopulate() {
    let search = document.getElementById("searchinput").value;
    console.log(search);

    let [location] = await Promise.all([
        getData(`https://www.metaweather.com/api/location/search/?query=${search}`)
    ]);

    console.log(location[0]['woeid']);
    let id = location[0]['woeid'];

    let warframeData = await Promise.all([getData('https://api.warframestat.us/pc')]);

    let warframeNews = warframeData[0]['news'];

    console.log(warframeNews);

    let [weatherData] = await Promise.all([
        getData(`https://www.metaweather.com/api/location/${id}/`)
    ]);

    let todayDiv = document.querySelector('#today');
    let tomorrowDiv = document.querySelector('#tomorrow');
    let dayAfTomDiv = document.querySelector('#dayaftertomorrow');

    let todayMaxTemp = (weatherData['consolidated_weather']["0"]['max_temp']);
    let todayMinTemp = (weatherData['consolidated_weather']["0"]['min_temp']);
    let tomorrowMaxTemp = weatherData['consolidated_weather']["1"]['max_temp'];
    let tomorrowMinTemp = weatherData['consolidated_weather']["1"]['min_temp'];
    let dATMaxTemp = weatherData['consolidated_weather']["2"]['max_temp'];
    let dATMinTemp = weatherData['consolidated_weather']["2"]['min_temp'];

    let todaySky = weatherData['consolidated_weather']['0']['weather_state_name'];
    let tomorrowSky = weatherData['consolidated_weather']['1']['weather_state_name'];
    let dayAfterTomSky = weatherData['consolidated_weather']['2']['weather_state_name'];

    let todayWeatherState = weatherData['consolidated_weather']['0']['weather_state_abbr'];
    let tomorrowWeatherState = weatherData['consolidated_weather']['1']['weather_state_abbr'];
    let dayAfterTomWeatherState = weatherData['consolidated_weather']['2']['weather_state_abbr'];

    ///////////////////////////////////
    
    let postDiv = document.createElement('div');
    postDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-3');

    let todayMessDiv = document.createElement('div');
    todayMessDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-1');
    if (todayWeatherState == 'c') {
        todayMessDiv.innerHTML = "Looks like it will be clear skies -- Stop playing Warframe and GO OUTSIDE!!!";
    } else if ((todayWeatherState == 'hc') || (todayWeatherState == 'lc')) {
        todayMessDiv.innerHTML = "Looks like it will be cloudy -- Maybe go outside? But first, consider the following Warframe news: " + warframeNews[8]['message'];
    } else {
        tomMessDiv.innerHTML = "Bad weather incoming -- Stay Inside!! Enjoy Warframe!! Remember: " + warframeNews[7]['message'];
    }
    
    let postHead = document.createElement('div');
    postHead.classList.add('row');
    
    let skyDiv = document.createElement('div');
    skyDiv.classList.add('col', 'h5');
    skyDiv.innerHTML = todaySky;
    let tt = document.createElement("h5");
    tt.innerHTML = "Skies:";
    postHead.appendChild(tt);

    var img = document.createElement("img");
    img.src = `https://www.metaweather.com//static/img/weather/${todayWeatherState}.svg`;
    img.style.height = '50px';
    img.style.width = '50px';
    postHead.appendChild(img);

    postHead.appendChild(skyDiv);

    let maxTempDiv = document.createElement('div');
    maxTempDiv.classList.add('col', 'h5');
    maxTempDiv.innerHTML = todayMaxTemp + '&deg';
    let tmxt = document.createElement("h5");
    tmxt.innerHTML = " Max Temp:";
    postHead.appendChild(tmxt);
    postHead.appendChild(maxTempDiv);

    let minTempDiv = document.createElement('div');
    minTempDiv.classList.add('col', 'h5');
    minTempDiv.innerHTML = todayMinTemp + '&deg';
    let tmnt = document.createElement("h5");
    tmnt.innerHTML = " Min Temp:";
    postHead.appendChild(tmnt);
    postHead.appendChild(minTempDiv);

    postDiv.appendChild(postHead);

    todayDiv.appendChild(postDiv);
    todayDiv.appendChild(todayMessDiv);

    /////////////////////////////////////

    let tomDiv = document.createElement('div');
    tomDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-3');

    let tomMessDiv = document.createElement('div');
    tomMessDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-1');
    if (tomorrowWeatherState == 'c') {
        tomMessDiv.innerHTML = "Looks like it will be clear skies -- Stop playing Warframe and GO OUTSIDE!!!";
    } else if ((tomorrowWeatherState == 'hc') || (tomorrowWeatherState == 'lc')) {
        tomMessDiv.innerHTML = "Looks like it will be cloudy -- Maybe go outside? But first consider:" + warframeNews[6]['message'];
    } else {
        tomMessDiv.innerHTML = "Bad weather incoming -- Stay Inside!! Enjoy Warframe!! Remember: " + warframeNews[5]['message']
    }
    
    let tomHead = document.createElement('div');
    tomHead.classList.add('row');

    let tomorrowSkyDiv = document.createElement('div');
    tomorrowSkyDiv.classList.add('col', 'h5');
    tomorrowSkyDiv.innerHTML = tomorrowSky;
    let ts = document.createElement("h5");
    ts.innerHTML = "Skies:";
    tomHead.appendChild(ts);

    var img2 = document.createElement("img");
    img2.src = `https://www.metaweather.com//static/img/weather/${tomorrowWeatherState}.svg`;
    img2.style.height = '50px';
    img2.style.width = '50px';
    tomHead.appendChild(img2);

    tomHead.appendChild(tomorrowSkyDiv);

    let tomMaxTempDiv = document.createElement('div');
    tomMaxTempDiv.classList.add('col', 'h5');
    tomMaxTempDiv.innerHTML = tomorrowMaxTemp + '&deg';
    let tmmxt = document.createElement("h5");
    tmmxt.innerHTML = "Max Temp:";
    tomHead.appendChild(tmmxt);
    tomHead.appendChild(tomMaxTempDiv);

    let tomMinTempDiv = document.createElement('div');
    tomMinTempDiv.classList.add('col', 'h5');
    tomMinTempDiv.innerHTML = tomorrowMinTemp + '&deg';
    let tmmnt = document.createElement("h5");
    tmmnt.innerHTML = "Min Temp:";
    tomHead.appendChild(tmmnt);
    tomHead.appendChild(tomMinTempDiv);

    tomDiv.appendChild(tomHead);

    tomorrowDiv.appendChild(tomDiv);
    tomorrowDiv.appendChild(tomMessDiv);

    /////////////////////////////////////////////////////

    let dATDiv = document.createElement('div');
    dATDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-3');

    let dayAfTomMessDiv = document.createElement('div');
    dayAfTomMessDiv.classList.add('container', 'border', 'border-dark', 'rounded', 'mt-1');
    if (dayAfterTomWeatherState == 'c') {
        dayAfTomMessDiv.innerHTML = "Looks like it will be clear skies -- GO OUTSIDE!!!";
    } else if ((dayAfterTomWeatherState == 'hc') || (dayAfterTomWeatherState == 'lc')) {
        dayAfTomMessDiv.innerHTML = "Looks like it will be cloudy -- Maybe go outside? But consider the following Warframe news: " + warframeNews[4]['message'];
    } else {
        tomMessDiv.innerHTML = "Bad weather incoming -- Stay Inside!! Enjoy Warframe!! Remember: " + warframeNews[3]['message'];
    }
    
    let dATHead = document.createElement('div');
    dATHead.classList.add('row');

    let dayAfTomSkyDiv = document.createElement('div');
    dayAfTomSkyDiv.classList.add('col', 'h5');
    dayAfTomSkyDiv.innerHTML = dayAfterTomSky;
    let das = document.createElement("h5");
    das.innerHTML = "Skies:";
    dATHead.appendChild(das);

    var img3 = document.createElement("img");
    img3.src = `https://www.metaweather.com//static/img/weather/${dayAfterTomWeatherState}.svg`;
    img3.style.height = '50px';
    img3.style.width = '50px';
    dATHead.appendChild(img3);

    dATHead.appendChild(dayAfTomSkyDiv);

    let dATMaxTempDiv = document.createElement('div');
    dATMaxTempDiv.classList.add('col', 'h5');
    dATMaxTempDiv.innerHTML = dATMaxTemp + '&deg';
    let datmxt = document.createElement("h5");
    datmxt.innerHTML = " Max Temp:";
    dATHead.appendChild(datmxt);
    dATHead.appendChild(dATMaxTempDiv);

    let dATMinTempDiv = document.createElement('div');
    dATMinTempDiv.classList.add('col', 'h5');
    dATMinTempDiv.innerHTML = dATMinTemp + '&deg';
    let datmnt = document.createElement("h5");
    datmnt.innerHTML = "Min Temp:";
    dATHead.appendChild(datmnt);
    dATHead.appendChild(dATMinTempDiv);

    dATDiv.appendChild(dATHead);

    dayAfTomDiv.appendChild(dATDiv);
    dayAfTomDiv.appendChild(dayAfTomMessDiv);
}

$(document).ready(function () {
    warframeapi();
    warframealertsapi();
    steamPopulate();
    //weatherPopulate();
});
