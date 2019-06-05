//Install express server
const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ozfooty'));

app.route('/api/cats').get((req, res) => {
  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }],
  })
});

// app.route('/api/getTopPlayers').get((req, res) => {

//   getPlayers().then(
//     (d) =>
//     {
//       res.send({
//         cats: [{ name: 'lilly' }, { name: 'lucy' }],
//       })
//     }
//   );


// });


// app.get("/api/getTopPlayers", function(req, res)
// {
//     getPlayers().then(
//     (d) =>
//     {
//       console.log(d);
//       res.send({
//         cats: [{ name: 'lilly' }, { name: 'lucy' }],
//       })
//     }
//   );
// });



//Api for getting all the users
app.get("/api/getTopPlayers", function (req, res) {

  getPlayers().then(function(result) {
      //console.log(result); // "Stuff worked!"
        var lastupdatestring = result.substring(
          result.indexOf('Last Updated:'),
          result.indexOf('Last Updated:')+60
        );
        lastupdatestring= lastupdatestring.substring(
          lastupdatestring.indexOf('ong>')+4,
          lastupdatestring.indexOf('</div')
        );
        console.log(lastupdatestring);

        var startIndex = result.indexOf('<table class="ladder zebra player-ratings">');
        console.log(startIndex);
        var truncatedResult = result.substring(startIndex);
        var i = truncatedResult.indexOf('<tbody>');
        var end = truncatedResult.indexOf('</tbody>');
        truncatedResult = truncatedResult.substring(i,end);
        var arr = truncatedResult.split('\n');
     //   console.log(arr);
        var players = [];
        for(var i = 0 ; i < arr.length ;i++)
        {
          var playerName , points;

          if(arr[i].includes('data-playerid') )
          {
           // console.log(arr[i]);
            var playerName = arr[i].substring(arr[i].indexOf('">')+2, arr[i].lastIndexOf('</a>'));
           // console.log(playerName);
          }else if( arr[i].includes('pts'))
          {

            var points = arr[i].substring(
              arr[i].indexOf('">')+2,
              arr[i].lastIndexOf('</td>')
            );
            players.push({name: playerName, pts: points});
            //console.log(points);
          }


        }
     //  console.log(players);

     res.send({topPlayers: players, lastUpdated: lastupdatestring});
    // res.send({
    //           cats: [{ name: 'lilly' }, { name: 'lucy' }],
    //         });
    }, function(err) {
      console.log(err); // Error: "It broke"
    });
});


app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/ozfooty/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


function getPlayers() {


    var promise = new Promise(function (resolve, reject) {
        // do a thing, possibly async, then…

        https.get('https://www.afl.com.au/stats/player-ratings/ratings-hub', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(Error('It broke'));
        });

    });

    return promise;

}
