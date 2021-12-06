const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true],
      minlength: [6],
    },
    age: {
      type: String,
    },
    famille: {
      type: String,
    },
    race: {
      type: String,
    },
    nourriture: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
