/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    saveImage: async function(req, res) {
        const file = req.file('file');
        let fileName;

        file.upload({
            dirname: '../../assets/images/'
        }, function(err, files) {
            if (err) return res.serverError(err);

            let fileNameArray = files[0].fd.split("/");
            fileName = fileNameArray[fileNameArray.length - 1];

            res.json({
                status: 201,
                message: 'File uploaded successfully',
                fileName: fileName
            });
        });

        
    }
};

