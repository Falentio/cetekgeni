const tiktok = require('tiktok-scraper')

videoMeta = async(url)=>{
  data = await tiktok.getVideoMeta(url)
  return data
}

module.exports = {
  videoMeta
}