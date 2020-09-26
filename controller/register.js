
const handleRegister=(req,res,db,bcrypt)=> {
	const {name,email,passwords} =req.body;

	const hash=bcrypt.hashSync(passwords)
	
	if(!email || !name || !passwords){
		return res.status(400).status("yanlış syntax");
	}
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into("login")
		.returning("email")
		.then(loginemail=> {
			return trx("users")
				.returning("*")
				.insert({
					email : loginemail[0],
					name: name,
					joined: new Date(),
					})
				.then(user=>
				res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})	
	.catch(err=> res.status(404).json("Kayıt başarsız"))

	}


	module.exports={
		handleRegister:handleRegister
	}