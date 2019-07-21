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

function findNextPositionInList(positions) {
    let i = 0;
    while ( i < 100 ) {
        if ( positions.indexOf(i) < 0) {
            return i;
        }
        i++;
    }
    return -1;
}

async function findNextPosition(wishlistId) {
    let takenPos = [];
    const items = await Item.find({where: {wishlist: wishlistId}});
    items.forEach( item => {
        takenPos.push(item.position);
    });

    return findNextPositionInList(takenPos);
}

module.exports = {
  
    findDataFromAmazonUrl: function(req, res) {
        const url = req.body.url;
        let itemData = {link: url};
        
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
    },

    createItemFromAmazonUrl: async function(req, res) {
        const url = req.body.url;
        const position = parseInt(req.body.position) || await findNextPosition(req.body.wishlistId);
        if ( position === -1 ) return res.serverError("Item positon not found");
        let itemData = {
            wishlist: parseInt(req.body.wishlistId),
            position: position,
            link: url
        };
        
        axios.get(url)
        .then( response => {
            if ( response.status === 200 ) {
                const html = response.data;
                const $ = cheerio.load(html); 

                itemData.name = $("#title").text().trim();
                itemData.amount = parseFloat(getPriceFromString($("#priceblock_ourprice").text()).replace(',','.'));
                itemData.image = $('#landingImage').attr('data-old-hires');

                Item.create(itemData).exec( (err, item) => {
                    if ( err ) {
                        res.serverError(err);
                    }
                    else {
                        res.status(201).send(item);
                    }
                });

                res.send(itemData);
            }

            else {
                res.status(response.status).send(response);
            }
        }, error => res.serverError(error) );
    }

};

