const fetch = require('node-fetch')
const fs = require ('fs-extra')

let domainData = JSON.parse(fs.readFileSync('data/shortener.json'))

ranum = (max) =>{
	return num = Math.floor(Math.random() * max)
}

random = (max) =>{
	all = "qazwsxedcrfvtgbyhnujmiklopQAZWSXEDCRFVTGBYHNUJKMILOP1234567890"
	res = ''
	for(our = 0 ; our < max ; our++){
		res += all[ranum(all.length)]
	}
}

short = async(data) =>{
    if(data.domain === undefined) data.domain = 'mang.ga'
	if(data.path === undefined) data.path = random(8) + ranum(99)
    else data.path += ranum(99)
	for(our = 0 ; our < domainData.apikey.length ; our++){
		if(domainData.domain[our].includes(data.domain)) data.apikey = domainData.apikey[our]
	}
    if(data.url === undefined)return 'error, url not defined'
    let bodyData = {
    	"domain" : data.domain,
    	"originalURL" : data.url,
    	"path" : data.path
    }
    let res = await fetch('https://api.short.cm/links/public',{
    	method : 'post',
        headers: {
        	'accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': data.apikey
        },
        body: JSON.stringify(bodyData)
    })
    return a = res.json()
}

module.exports ={
	short
}