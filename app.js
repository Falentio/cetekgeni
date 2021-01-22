const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const {
   pndk,
   fbtol,
   ytdl
} = require('./modules')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(bodyParser.json())
app.use(allowCrossDomain)

app.get('/',(req,res)=>{
	return res.send('Halo Dunia')
})

app.get('/shortener/:path',async (req,res)=>{
  path = req.params.path
  link = req.originalUrl.replace('/shortener/' + path + '?url=','')
  pendek = await pndk.perpendek(link, path)
  return res.send({"URL":pendek.shortURL,
    "original URL":pendek.originalURL
  })
})


app.get('/shortener',async (req,res)=>{
  link = req.originalUrl.replace('/shortener?url=','')
  pendek = await pndk.perpendek(link)
  return res.send({"URL":pendek.shortURL,
    "original URL" : pendek.originalURL,
    "note":"if you want the short URL look neat,try use /shortener/YOUR_NAME?url=YOUR_LINK,so it will become pndk.xyz/YOUR_NAME + 2 random number"
   })
  
})

app.get('/fb',async (req,res)=>{
  postLink = req.originalUrl.replace('/fb?url=','')
  vidLink = await fbtol.download(postLink)
  return res.send(vidLink)
})

app.get('/yt',async (req,res)=>{
  url = req.originalUrl.replace('/yt?url=','')
  ytInfo = await ytdl.getInfo(url)
  return res.send(ytInfo)
})

app.listen(process.env.PORT || 3000,() => console.log('mendengarkan port 3000'))
