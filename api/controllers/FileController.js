/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    saveImage: async function(req, res) {
        let file;
        let options = {dirname: '../../assets/images/'};
        let frontType = req.body.frontType;

        // angular
        if ( req.file('file') ) {
            file = req.file('file');
        }

        // android
        else {
            file = req.file('image');
            options['saveAs'] = file._files[0].stream.filename;
        }        
        
        file.upload(options, function(err, files) {
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

