var      fs = require('fs'),
    express = require('express'),
 bodyParser = require('body-parser'),
     multer = require('multer'),

    navData = require('../json/navData.json'),
  themeData = require('../json/themeData.json'),
         cv = require('../json/cv/cv.json'),
  stateData = require('../json/stateData.json'),

     // upload = multer(),
     router = express.Router(); 



AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var bucket = {Bucket: 'mikeontheweb-content'};
var s3 = new AWS.S3( { params: bucket} );



app = require('../app');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



var isDS = function (link) {
    if (link.includes('.DS_Store') === true) {
        return true;
    } else {
        return false;
    }
};

var isVid = function (link) {
    if (link.includes('video') === true){
        return true;
    } else {
        return false;
    }
};






router.post('/creativeProjects', function (req, res) {

    console.log('htting function');

    var mapProjects = function () {

        var project,
        images = [],
        videos = [],
        urlParams,
        awsParams = function(collection) {
            if (collection === 'featured') {
                return {Bucket: bucket.Bucket, Prefix: 'grids/creative/' + req.body.folder + '/' + 'featured' + '/' + req.body.project + '/content'};
            } else {
                return {Bucket: bucket.Bucket, Prefix: 'grids/creative/' + req.body.folder + '/' + req.body.collection + '/' + req.body.project + '/content'};
            }
        };

        // console.log(awsParams(req.body.collection));

        s3.listObjectsV2(awsParams(req.body.collection), function(err, data){
            // console.log(data);
            var bucketContents = data.Contents;

            for (var i = 0; i < bucketContents.length; i++){

                urlParams = {Bucket: 'mikeontheweb-content', Key: bucketContents[i].Key};

                if (isDS(bucketContents[i].Key) !== true && isVid(bucketContents[i].Key) !== true) {
                    s3.getSignedUrl('getObject',urlParams, function(err, url){
                        images.push(url);
                    });
                } else if (isVid(bucketContents[i].Key) === true) {
                    s3.getSignedUrl('getObject',urlParams, function(err, url){
                        videos.push(url);
                    });
                }
            }

            fs.readdir('json/projects/creative/' + req.body.folder + '/' + req.body.collection, function(err, files) {
                if(err){
                    res.json({payload : err});
                } else {
                    for(var i = 0; i < files.length; i++) {
                        var temp = files[i];
                        if (temp === req.body.project + '.json'){
                            
                            project = require('../json/projects/creative/' + req.body.folder  + '/' + req.body.collection + '/' + temp);

                            var imageNum = 0;
                            var vidNum = 0;

                            // convert urls to amazon links
                            for(var x = 0; x < project.length; x++) {
            
                                if (project[x].slideshow){
                                    console.log(images);
                                    for (var y = 0; y < project[x].slides.length; y++) {
                                        project[x].slides[y].image = images[imageNum];
                                        imageNum++;
                                    }
                                } if (project[x].video) {
                                    for (var z = 0; z < project[x].films.length; z++) {
                                        project[x].films[z].video = videos[vidNum];
                                        vidNum++;
                                    }  
                                }
                            }
                            
                            res.json({
                                payload : project
                            });

                        }
                    }
                } 
            }); 

        }); 

    }; mapProjects();

});

router.post('/workProjects', function (req, res) {

    var mapProjects = function () {

        var project,
        images = [],
        videos = [],
        urlParams,
        awsParams = {Bucket: bucket.Bucket, Prefix: 'grids/work/' + req.body.folder + '/' + req.body.collection + '/' + req.body.project + '/content'};
        // console.log(awsParams);

        s3.listObjectsV2(awsParams, function(err, data){

            var bucketContents = data.Contents;
            // console.log(bucketContents);

            for (var i = 0; i < bucketContents.length; i++){

                urlParams = {Bucket: 'mikeontheweb-content', Key: bucketContents[i].Key};

                if (isDS(bucketContents[i].Key) !== true && isVid(bucketContents[i].Key) !== true) {
                    s3.getSignedUrl('getObject',urlParams, function(err, url){
                        images.push(url);
                    });
                } 
                else if (isVid(bucketContents[i].Key) === true) {
                    s3.getSignedUrl('getObject',urlParams, function(err, url){
                        videos.push(url);
                    });
                }
            }

            fs.readdir('json/projects/work/' + req.body.folder + '/' + req.body.collection, function(err, files) {
                if(err){
                    res.json({payload : err});
                } else {
                    for(var i = 0; i < files.length; i++) {
                        var temp = files[i];
                        if (temp === req.body.project + '.json'){

                            project = require('../json/projects/work/' + req.body.folder  + '/' + req.body.collection + '/' + temp);

                            var imageNum = 0;
                            var vidNum = 0;

                            // convert urls to amazon links
                            for(var x = 0; x < project.length; x++) {
                                
                                if (project[x].slideshow){
                                    for (var y = 0; y < project[x].slides.length; y++) {
                                        project[x].slides[y].image = images[imageNum];
                                        imageNum++;
                                    }
                                } if (project[x].video) {
                                    console.log(videos);
                                    for (var z = 0; z < project[x].films.length; z++) {
                                        project[x].films[z].video = videos[vidNum];
                                        vidNum++;
                                    }  
                                }
                            }
                            
                            res.json({
                                payload : project
                            });

                        }
                    }
                } 
            }); 

        }); 

    }; mapProjects();

});

exports.index = router;