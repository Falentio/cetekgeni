const fetch = require('node-fetch')

function random(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

perpendek =async(originalURL,path)=>{
  if(path === undefined)path = random(6)
const data = {
    "domain":"pndk.xyz",
    "originalURL": originalURL,
    "path": path + Math.floor((Math.random() * 100) + 1)
    }
 let response = await fetch('https://api.short.cm/links/public', {
    method: 'post',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'aplz6uCJp3SOUaI7YWdYur26EJHqkvS6'
    },
    body: JSON.stringify(data)
  })
    return result = await response.json()
    }

    module.exports ={
      perpendek
    }
