const facebookTools = require('facebook-tools')

download =async (url) =>{
let videoObj;
   try {
     videoObj = await facebookTools.getVideoUrl(url)
   } catch (e) {
     return e
   } 
   return videoObj
}

module.exports ={
  download
}