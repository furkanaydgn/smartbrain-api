const Clarifai =require("clarifai");
const app = new Clarifai.App({
  apiKey: "",
});

const handleApicall=(req,res)=> {
 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input, { language: "zh" })
 .then(data=>{
  res.json(data);
 })
 .catch(err=>res.status(400).json("APİ ÇALIŞMA HATASI"))
}

 
const imageHandler = (req,res,db) => {
	
	const {id}  = req.body ;

   db("users").where("id", '=', id)
  .increment('entries', 1)
  .returning("entries")
  .then(entries=> {
  	res.json(entries[0]);
  })
  .catch(err=> res.status(400).json("tıklama sayısına ulaşılamıyor"))

}

module.exports={
	imageHandler: imageHandler,
  handleApicall:handleApicall
}
