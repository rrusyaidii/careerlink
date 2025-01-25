import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "Rusyaidi",
  },
  location: {
    type: String,
    default: "Kuala Lumpur",
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
