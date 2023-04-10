var Sequelize = require('sequelize');
var ArticleModule = require('./models/article')

//Db Connection String
//dbname,username,password
var sequelize = new Sequelize('AcademicBlog','baki','123456789',{
    dialect : 'mssql',
    host: 'localhost',
    timezone : '+03:00'
        // define:{
        //     timestamps: false // zamanları kapatır.
        // }
  });
  
  //Db Connection Test
  sequelize
  .authenticate()
  .then(()=>{
      console.log("Db connected")
  })
  .catch(err=>{
      console.error("Not connected to db : ", err)
  })

  let Article = ArticleModule(sequelize,Sequelize) // call article moduleeeeeeeeeeeeeeee

  sequelize.sync()
  .then(()=>{
      console.log("Tables created");
  })
  .catch(()=>{
    console.log("Tables dont created")
  })

  module.exports  = {
      Article
  }