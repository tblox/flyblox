require('dotenv').config()

module.exports = (req, res, next) => {
  const apiKey = req.headers["api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "You miss a api key." });
  }


  console.log({apiKey});

  console.log( process.env.MY_API_KEY)
   

  if (apiKey !== process.env.MY_API_KEY) {
    return res.status(401).json({ message: "You don't have permission. !"})
  }

  next()
};
