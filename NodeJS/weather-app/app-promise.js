const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    const encodedAddr = encodeURIComponent(argv.address)
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=AIzaSyDSk8U4QcNkQz1JHhweRSOocZIy8rq8OYs`
     
    axios.get(geocodeUrl).then((response) => {
        if (response.data.results.length !== 1) {
            throw new Error('Undable to find that address.')
        }
        console.log(response.data)
    }).catch(e => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers. ')
        } else {
            console.log(e.code, e.message)
        }
    })
