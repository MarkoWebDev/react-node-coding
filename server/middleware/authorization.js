const encoder = require("../encoder/encoder");

module.exports = function authorization(req, res) {
  const authHeader = req.headers.authorization;
  //query from encoder API body call encoderPage
  const { query } = req.body;
  if (authHeader !== "xyz0987654321") {
    //return res.sendStatus(401);
    return res.status(401).json("Your are not authorized");
  } else {
    const encoded = encoder(query);
    return res.status(200).json(encoded);
  }
};
