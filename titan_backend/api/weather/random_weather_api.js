const fs = require('fs')

function useKey() {
    const keys = fs.readFileSync(`${__dirname}/weather_api_keys.json`, 'utf-8')
    const allkeys = JSON.parse(keys)
    for (let key in allkeys) {
        if (allkeys[key].used <= 19) {
            allkeys[key].used++
            fs.writeFile(`${__dirname}/weather_api_keys.json`, JSON.stringify(allkeys, false, '    '), 'utf-8', err => {
                if (err) return false
            })
            return allkeys[key]
        }
    }
}

module.exports = { useKey }