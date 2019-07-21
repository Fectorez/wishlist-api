const amazonUrl = "https://www.amazon.fr";

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {

  recomendation: async function(req, res) {
    var result, $, item, title, link;
    var stringsAmazon = req.query.categories.replace(/ /g, '+');
    stringsAmazon = stringsAmazon.split(';');

    var array = {
        result: []
    };

    for (var i = stringsAmazon.length - 1; i >= 0; i--) {
      result = await axios.get(amazonUrl + "/s?k=" + stringsAmazon[i]);
      $ = cheerio.load(result.data);
      item = $(".a-size-base-plus");

      title = item.get(0).children[0].data;
      link = amazonUrl + item.get(0).parent.attribs.href;
      array.result.push({ 
          "title" : title,
          "link" : link
      });

      title = item.get(1).children[0].data;
      link = amazonUrl + item.get(0).parent.attribs.href;
      array.result.push({ 
          "title" : title,
          "link" : link
      });

      title = item.get(2).children[0].data;
      link = amazonUrl + item.get(0).parent.attribs.href;
      array.result.push({ 
          "title" : title,
          "link" : link
      });
    }

    return res.send({
      status: 200,
      result: array
    });
  }

};
