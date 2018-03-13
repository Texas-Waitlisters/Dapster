/**
* @param context {WebtaskContext}
*/

const cloudinary = require('cloudinary');
const express    = require('express');
const Webtask    = require('webtask-tools');
const bodyParser = require('body-parser');
const request = require('request');
const JSONP = require('node-jsonp');
var Algorithmia = require('algorithmia');


var app = express();

var algorithmia_key, musicmatch_api_key, api, artists, tracks, releases , consumerkey, consumersecret;

app.use(bodyParser.json());

// Our Middleware to setup API 
var apiContext = function (req, res, next) {
  const context = req.webtaskContext;
  
  // config cloudinary  
  cloudinary.config({
      "cloud_name": context.secrets.cloud_name,
      "api_key": context.secrets.api_key,
      "api_secret": context.secrets.api_secret
    });

  // paging 
  const page = context.data.page || 1;
  const pageSize = context.data.pageSize || 100;
  
  //Algorithmia key
  algorithmia_key = context.secrets.algorithmia_key;
  
  
  //Music Match
  musicmatch_api_key = context.secrets.musicmatch_api_key;
  
  // 7digital-api
  consumerkey = context.secrets.oauth_consumer_key;
  consumersecret =  context.secrets.oauth_consumer_secret;
  
  api = require('7digital-api').configure({
	  format: 'JSON',
	  consumerkey: context.secrets.oauth_consumer_key,
	  consumersecret: context.secrets.oauth_consumer_secret,
	  defaultParams: { 
	      country: 'GB', 
        shopId: context.secrets.shop_id,
	      usageTypes: 'adsupportedstreaming',  
	      pageSize: pageSize, 
	      page:page, 
	      imageSize:800,
	      sort: 'popularity desc'
	  }
});

// create instances of individual apis
  artists = new api.Artists();
  releases = new api.Releases();
  tracks = new api.Tracks();
  console.log('API Inited.')
  next()
}

// Use our API Middleware
app.use(apiContext)


var getLyrics = function(params){
  
  const data = {
    format:'jsonp',
    callback: 'callback',
    q_track: params.q_track,
    q_artist: params.q_artist,
    track_isrc: params.track_isrc,
    apikey: musicmatch_api_key
  };
  
  // musixmatch api
  const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get';
  return new Promise(function (resolve, reject) {
  
  JSONP(url,data,'callback',function(response){
     console.log(response.message.body);
     const lyrics =  response.message.body.lyrics;
       if(lyrics){
         resolve(lyrics);  
       }else{
         reject("There was an error getting lyrics");
       }
    });
    
  });
  
}

// USMC14673497  
// 'USCJ81000500'// 'GBAFL1700342';  //?Spacewoman

app.get('/lyrics/:isrc', function (req, res) {
  var track_isrc = req.params.isrc  || 'GBAFL1700342'; 
  const context = req.webtaskContext;

  const data = { track_isrc: track_isrc };

   getLyrics(data)
   .then(function(lyrics){
  
    Algorithmia.client(algorithmia_key)
    .algo("nlp/AutoTag/1.0.1")
    .pipe(lyrics.lyrics_body)
    .then(function(response) {
        console.log(response.get());
        var lyrics_body = lyrics.lyrics_body.replace('******* This Lyrics are NOT for Commercial use *******','');
        var results = { words:response.get(), lyrics: lyrics_body};
        res.send(results);
    });
    
          
   })
   .catch(function(error){
          res.send(error);
   });
});


var getSong = function(context, trackid){
// Create a Signed URL
var oauth = new api.OAuth();
    return new Promise(function (resolve, reject) {
       var apiUrl = 'https://stream.svc.7digital.net/stream/catalogue?country=GB&trackid=' + trackid;
       var signedURL = oauth.sign(apiUrl);
       if(signedURL){
          console.log(signedURL)
          resolve({url:signedURL});
       }else{
          reject('we had an error');
       }
      });
}

// /song/70540913/stream/

app.get('/song/:trackid/?:stream', function ( req, res) {
  
  const trackid = req.params.trackid  || '123456';  // /song/12345
  const context = req.webtaskContext;
  const shouldStream = req.params.stream  || "url";
  console.log(trackid);
  console.log(shouldStream);
  
  getSong(context, trackid).then(function(data){
    
      if(shouldStream == 'stream'){
        request(data.url).pipe(res);
      }else{
        res.send( data);   
      }
   }).catch(function(err){
      console.log('ERR:', Err);
      res.send(err);
   })
  
});



var getClip = function(trackid){
  
    return new Promise(function (resolve, reject) {
      var clipUrl = 'http://previews.7digital.com/clip/' + trackid;
      const oauth = new api.OAuth();
      var previewUrl = oauth.sign(clipUrl);
       if(previewUrl){
          resolve({ url:previewUrl });
       }else{
          reject('we had an error');
       }
      });
}
 
 // /song/70540913/stream/

 app.get('/clip/:trackid/?:stream', function ( req, res) {
  var trackid = req.params.trackid || '12345';   // /clip/12345
  const context = req.webtaskContext;
  const shouldStream = req.params.stream  || "url";
  
  getClip(trackid)
  .then(function(data){
      if(shouldStream == 'stream'){
        request(data.url).pipe(res);
      }else{
        res.send( data);   
      }
   })
   .catch(function(err){
      console.log('ERR:', Err);
      res.send(err);
   })
  
});

 
var browse = function(letter) {  
  return new Promise(function (resolve, reject) {
       artists.browse({ letter: letter }, function(err, data) {
              if(err){
               reject(err)
              }
              if(data){
                resolve(data);
              } 
            });    
  });
}
app.get('/browse/:letter', function ( req, res) {
  const letter = req.params.letter;   // /browse/letter

  browse(letter).then(function(data){
        console.log(JSON.stringify(data,null,5));
        res.send( data);   
   }).catch(function(err){
      console.log('ERR:', Err);
      res.send(err);
   })
  
});
  
  
  var search = function(query) {  
  return new Promise(function (resolve, reject) {
        artists.search({ q: query }, function(err, data) {
        if(err){
          console.log(err);
            reject(err)
        }
        if(data){
          console.log(JSON.stringify(data,null,5));
          resolve(data);
        } 
      });
  })
}
  
app.get('/search/:query', function ( req, res) {
  const query = req.params.query || 1;
  search(query).then(function(data){
        res.send( data);   
   })
   .catch(function(error){
      console.log('ERR: ', error);
      res.send(error);
   })
});
  
  
  //14643 The Breeders

var getReleases = function(artistID) {  
  return new Promise(function (resolve, reject) {
    
        artists.getReleases({ artistid: artistID }, function(err, data) {
        if(err){
          console.log(err);
            reject(err)
        }
        if(data){
          console.log(data);
          resolve(data);
        } 
      });
  })
}
    
app.get('/releases/:artistid', function ( req, res) {
const artistid = req.params.artistid || '14643';
  getReleases(artistid)
  .then(function(data){
        res.send( data);   
   }).catch(function(err){
      console.log('ERR:', Err);
      res.send(err);
   })
});


// Save Cover Image 

var uploadImage = function(coverImageURL, public_id){
return  new Promise(function (resolve, reject) {
  var url = coverImageURL || 'http://res.cloudinary.com/de-demo/video/upload/v1520429530/test-audio.mp3' ; 
   
        // uses upload preset:  https://cloudinary.com/console/settings/upload
        cloudinary.v2.uploader.upload(url, 
              { 
              upload_preset: 'sxsw',  
              public_id: public_id,  
              type: "upload",
              resource_type: "image", 
              }, 
          function(error, result) {
            if(error){
                   reject( error);
            }
            if(result){
              console.log(result);
                    resolve(result);
            }
          });
        });
}


app.get('/upload', function ( req, res) {
  
var url = req.params.url || 'http://artwork-cdn.7static.com/static/img/sleeveart/00/055/149/0005514991_800.jpg';

///'http://artwork-cdn.7static.com/static/img/artistimages/00/000/113/0000011319_300.jpg';

var public_id = req.params.publicid || 'Cyndi_Lauper_cover';

console.log(url, public_id);


// res.send({url:url, public_id:public_id}); 

  uploadImage(url,public_id)
  .then(function(data){
        res.send(data);   
  }).catch(function(err){
      console.log('ERR:', Err);
      res.send(err);
  })
});


var getImagesByTags = function(tags){
return  new Promise(function (resolve, reject) {
           cloudinary.v2.api.resources_by_tag(tags,{max_results:100, tags:true}, 
           function(error, result){
             if(error){
               reject(error);
             }
             if(result){
               console.log(result);
               resolve(result);
             }
           });

        });
}




// Get tracks by releaseID: 
var getTracks = function(releaseid) {  
  return new Promise(function (resolve, reject) {
        releases.getTracks({ releaseid: releaseid }, function(err, data) {
        if(err){
          console.log(err);
            reject(err)
        }
        if(data){
          resolve(data);
        } 
      });
  })
}





// Get tracks by releaseID: 7456808
app.get('/tracks/:releaseid', function ( req, res ) {
  
  const releaseid = req.params.releaseid || '7026306';
    console.log(releaseid);
    getTracks(releaseid)
    .then(function(data){
      console.log(JSON.stringify(data,null,5));
      res.send(data); 
      
    }).catch(function(error){
       res.send(error);
    });
    
});




app.get('/', function (req, res) {
  const html = `<a href="https://cloudinary.gitbooks.io/sxsw-2018-hackathon-guide/content/">Hackathon Guide<a>`;
    res.send(html); 
  // res.sendStatus(200);
});


module.exports = Webtask.fromExpress(app);
// module.exports = function(context, cb) {
//   cb(null, { hello: context.query.name || 'Anonymous' });
// };
