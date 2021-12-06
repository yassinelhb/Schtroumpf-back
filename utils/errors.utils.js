module.exports.signUpErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.code === 11000)
    errors.username = "Ce nom d'utilisateur est déjà enregistré";

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = "";

  if (
    err.message === "incorrect username" ||
    err.message === "incorrect password"
  ) {
    errors = "Le nom d'utilisateur ou mot de passe est incorrect";
  }

  return errors;
};
