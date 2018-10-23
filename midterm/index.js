// https://github.com/toddmotto/public-apis#weather

// https://developer.valvesoftware.com/wiki/Steam_Web_API#GetNewsForApp_.28v0002.29
// http://steamwebapi.azurewebsites.net/

// Steam web API Key: BE68484C46B850AACC83630F2EF9C8A3
// Domain Name: localhost

async function getData(url) {
    var valreturn = fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
        return valreturn
}

async function warframeapi() {
    var warframeWeb = document.querySelector('#warframeWeb')
    // var warframeAlerts = document.querySelector('#warframeAlerts')
    warframeWeb.innerHTML = '<h2 class="card-header"> Warframe Updates <button type="button" class="btn btn-success" onclick="warframeapi()">Refresh</button></h2>'

    let warframeData = await Promise.all([getData('https://api.warframestat.us/pc')])

    //console.log(warframeData[0])
    warframeNews = warframeData[0]['news']
    // warframeAlert = warframeData[0]['alerts']

    for (let i in warframeNews) {
        let postDiv = document.createElement('div')

        let postHead = document.createElement('div')
        //postHead.classList.add('row')

        let PostTitleDiv = document.createElement('h2')
        PostTitleDiv.classList.add('alert', 'alert-dark')
        PostTitleDiv.setAttribute('href', warframeNews[i]['link'])
        PostTitleDiv.innerHTML = 
            '[' + warframeNews[i]['eta'] + '] ' + 
            '<a href=' + warframeNews[i]['link'] + '>' + warframeNews[i]['message'] + '</a>'
        postHead.appendChild(PostTitleDiv)

        postDiv.appendChild(postHead)

        warframeWeb.appendChild(postDiv)
    }
}

async function warframealertsapi() {
    var warframeAlerts = document.querySelector('#warframeAlerts')

    warframeAlerts.innerHTML = '<h2 class="card-header"> Warframe Alerts <button type="button" class="btn btn-success" onclick="warframealertsapi()" >Refresh</button></h2>'

    let warframeData = await Promise.all([getData('https://api.warframestat.us/pc')])

    warframeAlert = warframeData[0]['alerts']

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

    //let news = await Promise.all([getData('http://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=BE68484C46B850AACC83630F2EF9C8A3&appid=230410&count=5&maxlength=300&format=json')])

    let news = await Promise.all([getData('http://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=BE68484C46B850AACC83630F2EF9C8A3&appid=230410&count='+ numLength +'&maxlength=300&format=json')])

    
    //console.log(news[0]['appnews']['newsitems'])
    let steamapi = news[0]['appnews']['newsitems']
    
    for (let i in steamapi) {
        let postDiv = document.createElement('div')

        let postHead = document.createElement('div')
        //postHead.classList.add('row')

        let PostTitleDiv = document.createElement('h3')
        PostTitleDiv.classList.add()
        PostTitleDiv.innerHTML = steamapi[i]['title']
        postHead.appendChild(PostTitleDiv)

        let userInfo =  document.createElement('div')
        userInfo.classList.add('alert','alert-info')
        userInfo.innerHTML = steamapi[i]['contents'] + '<a href='+ steamapi[i]['url'] + '>' + ' Click here to read more' + '</a>'
        postHead.appendChild(userInfo)
        //console.log('passed description')

        postDiv.appendChild(postHead)

        steamweb.appendChild(postDiv)
    }
}

async function feedData() {
    let warframeData = await Promise.all([getData('https://api.warframestat.us/pc')]);

    //let data = warframeData[0]['news'][rns]['message'];
    
    let info = warframeData[0]['news'][1]['message'];
    let info2 = warframeData[0]['news'][4]['message'];
    let info3 = warframeData[0]['news'][5]['message'];
    let info4 = warframeData[0]['news'][8]['message'];

    let lst = [];
    lst.push(info);
    lst.push(info2);
    lst.push(info3);
    lst.push(info4);


    var rand = lst[Math.floor(Math.random() * lst.length)];


    let search = document.getElementById('search');
    search.setRangeText("Warframe " + rand);

}

function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}


$(document).ready(function () {
    warframeapi();
    warframealertsapi();
    steamPopulate();
    feedData();

    $("form").on("submit", function(e) {
        e.preventDefault();
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        }); 
        request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
            $.get("item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
            });
        });
    });
});

function init() {
    gapi.client.setApiKey("AIzaSyBFxTVvC75Myiq7srk3LyvcxbwngviK9V0");
    gapi.client.load("youtube", "v3", function() {
    });
}
