const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

const userSchema = new Schema({
    // _id is auto-generated by MongoDB, and is our primary key
    name: { type: Types.String, trim: true, required: true, unique: true },
    email: { type: Types.String, trim: true, required: true, unique: true },
    password: { type: Types.String, trim: true, required: true },
    theme: { type: Types.String, trim: true, default: "Light" },
})

module.exports = mongoose.model("user", userSchema);