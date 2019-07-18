const amazonUrl = "https://www.amazon.fr/s?k=";
const commerceUrl = "https://www.rueducommerce.fr/recherche/";

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {

  comparator: async function(req, res) {
    var stringAmazon = req.query.string.replace(' ', '+');
    var stringCommerce = req.query.string.replace(' ', '-');

    const result = await axios.get(amazonUrl + stringAmazon);
    const $ = cheerio.load(result.data);
    
    const item = $(".a-price-whole");
    var priceAmazon = item.text().substring(0, item.text().indexOf(',') + 3);

    const result2 = await axios.get(commerceUrl + stringCommerce);
    const $2 = cheerio.load(result2.data);
    
    const item2 = $2(".price");
    var priceCommerce = item2.text().substring(0, item2.text().indexOf('€') + 3);
    priceCommerce = priceCommerce.replace('€', ',');

    return res.send({
          status: 200,
          priceAmazon: priceAmazon,
          linkAmazon: amazonUrl + stringAmazon,
          priceCommerce: priceCommerce,
          linkCommercenode: commerceUrl + stringCommerce
        });
  }

};