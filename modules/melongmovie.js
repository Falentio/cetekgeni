const got = require('got')
const cheerio = require('cheerio')
const sort = require('sort-array')

mm = 'https://melongmovie.com/'
str = JSON.stringify
scrape = async (url)=>{
	try{
		response = await got(url)
		return response.body
	}catch(error){
		console.log(error)
	}
}

desc = async(url) =>{
	res = {}
	response = await scrape(url)

    $ = cheerio.load(response)
    res.ratingRate = $("span[itemprop='ratingValue']").text()
    res.ratingVotes = $("span[itemprop='ratingValue']").next().text()

    data = []
    $('ul[class=data] li').each(function(){
    	data.push($(this).text())
    })
    for(i in data){
    	obj = data[i].split(':')[0]
    	res[obj] = data[i].split(':')[1].trim().split(',')
    	if(res[obj].length === 1)res[obj] = res[obj][0].trim()
    	else for(our in res[obj]){
    		res[obj][our] = res[obj][our].trim()
    	}
    }

    res.link = {}
    res.link.batch = {}
    $("div[style='text-align: center;'] div[style='background: #a3000d; padding: 7px; text-align: center; color: white;']:contains(BATCH)").next().find('p').each(function(){
    	data = []
    	reso = $(this).text().split('=')[0].trim()
    	$(this).find('a').each(function(){
    		data.push($(this).attr('href'))
    	})
    	res.link.batch[reso] = data
    })

    res.link.eps = {}
    $("div[style='text-align: center;'] div[style='background: #a3000d; padding: 7px; text-align: center; color: white;']:contains(EPISODE)").next().find('p').each(function(){
    	data = []
    	reso = $(this).text().split('')[0].trim()
    	$(this).find("a[href]").each(function(){
    		data.push($(this).attr('href'))
    	})
    	res.link.eps[reso] = data
    })

    if(str(res.link.eps) !== str({}) && str(res.link.batch) !== str({}))return res
    delete res.link

    res.link = {}
    $("div[class=dzdesu] h2:contains(LINK DOWNLOAD)").parent().find('p').each(function(){
    	obj = $(this).text().replace(':','').trim()
    	if(!res.link[obj]) res.link[obj] = {}
    	$(this).next().find('li').each(function(){
    		data = []
    		$(this).find('a').each(function(){
    			data.push($(this).attr('href'))
    		})
    		$(this).each(function(){
    			reso = $(this).find('strong').text()
    		})
    		res.link[obj][reso] = data
    	})
    })
    if(str(res.link) !== str({}))return res
    delete res.link

    res.link = {}
    $("div[style='background: #f8ff4d; padding: 7px; text-align: center; color: white;'] span[style='color: brown;']").parent().next().find('p').each(function(){
    	data = []
    	reso = $(this).text().split('=')[0].trim()
    	if(!res.link[reso])res.link[reso] = {}
    	$(this).find('a[href]').each(function(){
    		data.push($(this).attr('href'))
    	})
    	res.link[reso] = data
    })
    return res
}

search = async (name) =>{
	res = []
	url = (mm + '?s=' + name)
	response = await scrape(url)
	$ = cheerio.load(response)
    $('article[class=box]').each(async function(){
    	p = {}
    	p.title = $(this).find('a[class=tip]').attr('title')
    	p.eps = ( $(this).find('div[class=eps]').text() || 'Movie' )
    	p.webUrl = $(this).find('a[class=tip]').attr('href')
    	p.imgUrl = $(this).find('img').attr('src')
    	return res.push(p)
    })
    return res
}

module.exports ={
	search,
	desc
}
