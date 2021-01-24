const fetch = require('node-fetch')

var api = {}
api.fst= 'aplz6uCJp3SOUaI7YWdYur26EJHqkvS6'
api.snd = 'UUWmuA9QI5KDT83m7aKEzqvpdjhtAP1P'

var domain = {}
domain.fst = ['pndk.xyz','linkku.cf']
domain.snd = ['anjay.tk','kucing.gq','anjg.gq','mang.ga']

function random(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

perpendek =async(dataS)=>{
  dom = dataS.domain
  originalURL = dataS.url
  path = dataS.path
  if(dom === undefined)dom = domain.snd[Math.floor((Math.random()*4)+1)]
  if(domain.fst.includes(dom)) apiKey = api.fst
  if(domain.snd.includes(dom)) apiKey = api.snd
  if(path === undefined)path = random(6)
const data = {
    "domain":dom,
    "originalURL": originalURL,
    "path": path + Math.floor((Math.random() * 100) + 1)
    }
 let response = await fetch('https://api.short.cm/links/public', {
    method: 'post',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': apiKey
    },
    body: JSON.stringify(data)
  })
    return result = await response.json()
    }

    module.exports ={
      perpendek
    }
