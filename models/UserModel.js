import mongoose from "mongoose";

const UserSchema = new mongoose.SchemaType({
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

export default mongoose.model("User", UserSchema);
