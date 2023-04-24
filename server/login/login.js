module.exports = function login(req, res) {
  const { email, password } = req.body;

  if (
    email === "optimus.prime@autobots.com" &&
    password === "validPassword1234!"
  ) {
    return res.send({ token: "xyz0987654321" });
  }
  //dont know if user should be redirected only to Encoder page if this email and password were used
  //or every user should login but only the one with authorized token like this email and password should make a api post for encoder function
  return res.send({ token: "Unauthorized" });
  //return res.status(401).json("Login failed. Unauthorized");
};
