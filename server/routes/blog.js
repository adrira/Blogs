const router = require("express").Router();
const mongoose = require("mongoose");
const articleSchema = require("../models/article");
const commentSchema = require("../models/comment");
mongoose.connect("mongodb://localhost:27017/tododb" , { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


const articleModel = mongoose.model('article', articleSchema);
const commentModel = mongoose.model('comment', commentSchema);

router.post("/article", upload.single('fileimage'), async (req, res) => {
    console.log(req.file);
    req.body['image'] = req.file.filename;
    const result = await articleModel.create(req.body).then().catch();
    res.send(result);
});

router.get("/article", async (req, res) => {
    const result = await articleModel.find().populate({path:"author"}).populate({path:"comments"});
    res.send(result);
});

router.get("/search/:id", async (req, res) => {
    const result = await articleModel.findById(req.params.id).populate({path:"author"}).populate({path:"comments"});
    res.send(result);
});

router.get("/search-titre/:titre", async (req, res) => {
  const result = await articleModel.find({'titre' : {'$regex': req.params.titre} }).populate({path:"author"}).populate({path:"comments"});
  res.send(result);
});

router.post("/article/:id", async (req, res) => {
  const result = await articleModel.updateOne({'_id': req.params.id}, {$set:req.body}).then().catch();
  res.send(result);
});

router.post("/comment/:idArticle", async(req,res)=>{
    const resultcom = await commentModel.create(req.body);
    const result = await articleModel.findByIdAndUpdate(req.params.idArticle, {$addToSet:{comments:resultcom._id}})
    res.send(result)
});

router.post("/likes/:idArticle/:idUser", async(req,res)=>{
    const result = await articleModel.findByIdAndUpdate(req.params.idArticle, {$addToSet:{likes: req.params.idUser}})
    res.send(result);
});

module.exports = router;
