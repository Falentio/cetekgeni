const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const {
   pndk,
   fbtol,
   ytdl,
   sh,
   melong
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
	return res.redirect('https://github.com/Falentio/cetekgeni')
})

app.get('/melong/:method',async (req,res)=>{
  method = req.params.method
  if(method === 'search')data = await melong.search(req.query.name)
  if(method === 'desc')data = await melong.desc(req.query.url)
  if(method === 'help')data = `pertama gunakan ${req.hostname}/search?name=[nama film], lalu gunakan ${req.hostname}/desc?url=[webUrl pada search]`
  res.json(data)
})

app.get('/sh',async (req,res) =>{
  if(req.query.urlSH === undefined) return res.send('URL not defined')
  data = req.originalUrl.replace('/sh?urlSH=','').replace(`&pathSH=${req.query.pathSH}`,'').replace(`&domainSH=${req.query.domainSH}`,'')
  short = await sh.short({url : data , path : req.query.pathSH , domain : req.query.domainSH})
  res.send(short)
})

app.get('/shortener/:path/:domain',async (req,res)=>{
  path = req.params.path
  domain = req.params.domain
  url = req.originalUrl.replace(`/shortener/${path}/${domain}?url=`).replace('undefined','')
  pendek = await pndk.perpendek({"path":path,"url":url,"domain":domain})
  return res.send({"shortURL" : pendek.shortURL,"originalURL":pendek.originalURL})
})

app.get('/shortener/:path',async (req,res)=>{
  path = req.params.path
  link = req.originalUrl.replace('/shortener/' + path + '?url=','')
  pendek = await pndk.perpendek({"url":link,"path": path})
  return res.send({"pndkURL":pendek.shortURL,
    "original URL":pendek.originalURL
  })
})


app.get('/shortener',async (req,res)=>{
  link = req.originalUrl.replace('/shortener?url=','')
  pendek = await pndk.perpendek({"url":link})
  return res.send({"pndkURL":pendek.shortURL,
    "original URL" : pendek.originalURL,
    "note":"if you want the short URL look neat,try use /shortener/YOUR_NAME?url=YOUR_LINK,so it will become (pndk.xyz or linkku.cf)/YOUR_NAME + 2 random number"
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
