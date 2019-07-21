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

        // android
        if ( req.body.caption) {
            file = req.file('image');
            options['saveAs'] = req.body.caption;
        }

        // angular
        else {
            file = req.file('file');
        }

        
        
        file.upload(options, function(err, files) {
            if (err) return res.serverError(err);
            console.log("HERE");

            if ( req.body.caption ) {
                return res.send();
            }

            let fullPath = files[0].fd;
            let fileName = fullPath.split("\\")[fullPath.split("\\").length - 1];

            res.json({
                status: 201,
                message: 'File uploaded successfully',
                fileName: 'http://localhost:1337/images/' + fileName
            });
        });

        
    }
};

