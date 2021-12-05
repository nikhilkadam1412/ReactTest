module.exports = function(req, res, next) {
  const { user, email, password } = req.body;
  console.log("validatig Emails")
  function validEmail(userEmail) {
    console.log("validating email")
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/registerUser") {
    console.log('email.length',!email.length);
    if (![user, email, password].every(Boolean)) {
      console.log("if loop for all")
      // return res.json("Missing Credentials");
      return "Missing Credentials";
    } else if (!validEmail(email)) {
      console.log("esle if loop")
      // return res.json("Invalid Email");
      return "Invalid Email";
    }
  } 
  // else if (req.path === "/loginUser") {
  //   if (![user, password].every(Boolean)) {
  //     return res.json("Missing Credentials");
  //   }
  // }

  next();
};
