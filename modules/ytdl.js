const ytdl = require('ytdl-core')

getList = (info)=>{
  ytInfo = {"video":[],"audio":[]}
  for(i=0;i<info.length;i++){
    let ytn = info[i]
    if(ytn.mimeType.includes('video'))ytInfo.video.push({"mimeType":ytn.mimeType,"qualityLabel":ytn.qualityLabel,"fps":ytn.fps,"audioQuality":ytn.audioQuality,"url":ytn.url})
    if(ytn.mimeType.includes('audio'))ytInfo.audio.push({"mimeType":ytn.mimeType,"fps":ytn.fps,"audioQuality":ytn.audioQuality,"url":ytn.url})
  }
  console.log(info.length)
  return ytInfo
}

getInfo = async(url) =>{
   let info = await ytdl.getInfo(url)
   let list = getList(info.formats)
   return list
}

module.exports ={
  getInfo
}