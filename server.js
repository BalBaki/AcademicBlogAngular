const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var shortid = require('shortid')
var { Article } = require('./db')

var app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())





const port = 3000;
app.listen(port, () => {
  console.log("Server Work at " + port + ". port")
})


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware

  next();
});

const folder = './pdfler/';






//Get all Articlessssssssssssss
app.get('/articles', function (request, response) {
  Article.findAll().then((articles) => {
    articles.sort((a,b)=> (a.createdAt > b.createdAt) ? -1 : (b.createdAt > a.createdAt) ? 1 : 0)
    response.status(200).json(articles.length > 0 ? articles : []);
  })
})

//Get article with id
app.get('/article/:id', function (request, response) {
  Article.findOne({
    where: { id: request.params.id }
  }).then(article => {
    response.status(200).json(article ? article : "Article Not Found")
  })
})

//Save new article
app.post('/article', function (request, response) {
  Article.findOrCreate({
    where: { title: request.body.title, fileName: request.files.file.name },
    defaults: {
      id: shortid.generate(),
      title: request.body.title,
      fileName: request.files.file.name,
      explanation: request.body.explanation
    }
  }).then(() => {
    let sampleFile = request.files.file;
    uploadPath = folder + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err)
        return response.status(500).send(err);
      else
        response.json({
        status: "200",
        responseType: "string",
        response: "success"
      });
    });

  }).catch(err => {
    response.json({
      status: "500",
      responseType: "string",
      response: "fail",
      error: err
    });
  })
})

//delete article
app.delete('/deleteArcticle/:id', function (request, response) {
  Article.findOne({
    where: { id: request.params.id }
  }).then(article => {
    Article.destroy({
      where: { id: article.dataValues.id }
    }).then(result => {
      direct = folder + article.dataValues.fileName;
      fs.unlink(direct, function () {
        response.send({
          message: result,
          status: "200",
          responseType: "string",
          response: "success"
        });
      })
      // .catch(err => {
      //   response.status(500).json(err)
      // })
    })
  })
})

//update article details
app.put('/changeArticle/:id', function (request, response) {

  let oldFileName ;
  
  Article.findOne({
    where: { id: request.params.id }
  }).then(article => {
    oldFileName = article.fileName;
  })

  Article.update({
    title: request.body.title,
    fileName: request.body.fileName,
    explanation: request.body.explanation
  },
    {
      where: { id: request.params.id },
    }).then(result => {
      fs.rename(folder + oldFileName, folder + request.body.fileName, function (err) {
        if (err) 
          console.log(err);
         else 
          response.status(200).json({ success: "true" });
      })
    }).catch(err => {
      response.status(500).json({ success: "false" })
    })

})

//change article file
app.post('/changeFile/:fileId', function (request, response) {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.');
  }
  Article.findOne({
    where: { id: request.params.fileId }
  }).then(article => {
    fs.unlink(folder + article.fileName, err => {
      return err;
    })
    let sampleFile = request.files.file;
    uploadPath = folder + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err)
        return response.status(500).send(err);
      else{
        Article.update({
          fileName : sampleFile.name
        },
        {
          where: { id: request.params.fileId }
        }).then(() =>{
          response.send({
            status: "200",
            responseType: "string",
            response: "success"
          });
        }).catch(err => {
          response.status(500).json({ success: "false" })
        })    
      }  
    });
  })
})
