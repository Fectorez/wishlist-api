/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require("axios");
const cheerio = require("cheerio");

function getPriceFromString(string){
    let start = 0;
    while (start < string.length && isNaN(parseInt(string.charAt(start), 10)) ) start++;

    let end = string.length - 1;
    while (end > start && isNaN(parseInt(string.charAt(end), 10)) ) end--;
    return string.substring(start, end);
}

module.exports = {
  
    findDataFromAmazonUrl: function(req, res) {
        const url = req.body.url;
        let itemData = {};
        
        axios.get(url)
        .then( response => {
            if ( response.status === 200 ) {
                const html = response.data;
                const $ = cheerio.load(html); 

                itemData.name = $("#title").text().trim();
                itemData.amount = parseFloat(getPriceFromString($("#priceblock_ourprice").text()).replace(',','.'));
                itemData.image = $('#landingImage').attr('data-old-hires');

                res.send(itemData);
            }

            else {
                res.status(response.status).send(response);
            }
        }, error => res.serverError(error) );
    }

};

