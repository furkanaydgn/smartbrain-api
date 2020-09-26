

const signinHandler= (req,res,db,bcrypt)=> {
	const {email,passwords} =req.body;
	if(!email || !passwords){
		return res.status(400).status("yanlış syntax");
	}
	db.select("email","hash").from("login")
	.where("email","=",email)
	.then(data=> {req,res,db,bcrypt
		const isValid=bcrypt.compareSync(req.body.passwords,data[0].hash);
	
		if(isValid){
			return db.select("*").from("users")
			.where("email","=",email)
			.then(user=>{
				
				res.json(user[0])
			}) 
			}else{
				res.status(400).json("Kullanıcaya erişilemiyor")
			}
		res.status(400).json("yanlış kimlik")
	})
	.catch(err => res.status(400).json("Kimlik hatasu"))
}

module.exports={
	signinHandler:signinHandler
}