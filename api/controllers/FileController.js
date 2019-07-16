/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    saveImage: async function(req, res) {
        const file = req.file('file');

        file.upload({
            dirname: '../../assets/images/'
        }, function(err, files) {
            if (err) return res.serverError(err);

            let fullPathArray = files[0].fd.split("/");
            let fullPath = fullPathArray[fullPathArray.length - 1];

            let fileName = fullPath.split("\\")[fullPath.split("\\").length - 1];

            res.json({
                status: 201,
                message: 'File uploaded successfully',
                fileName: 'http://localhost:1337/images/' + fileName
            });
        });

        
    }
};

