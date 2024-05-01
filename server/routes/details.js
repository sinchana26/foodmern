const router = require("express").Router();
const { Router } = require("express");
const { Details, validate } = require("../models/detailsModel");
//saves new customer details
router.post("/", async (req, res) => {
    await new Details({ ...req.body}).save();
});
//fetches all the customer details to API
router.get("/get", async (req, res) => {
	try{
		const user = await Details.find({});
	res.send(user).status(200);
	}catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
  });
//Delete the specific customer by using id
  router.delete('/Details/:id', (req, res) => {
	Details.findById(req.params.id)
	  .then(item => item.remove().then(() => res.json({ success: true })))
	  .catch(err => res.status(404).json({ success: false }));
  });
//Updates specific customer DEtails by using id
  router.put('/update/:id', (req, res) => {
	Details.findByIdAndUpdate(req.params.id, req.body, { new: true })
	  .then(item => res.json(item))
	  .catch(err => res.status(400).json(err));
  });
//fetches the specific customer Details by using id
  router.get('/data/:id', async (req, res) => {
	try {
	  const data = await Details.findById(req.params.id);
	  if (!data) {
		return res.status(404).json({ error: 'Data not found' });
	  }
	  res.json(data);
	} catch (error) {
	  console.error("Error fetching data:", error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });
  
  
module.exports = router;