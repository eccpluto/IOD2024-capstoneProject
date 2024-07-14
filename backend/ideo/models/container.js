const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

const containerSchema = new Schema({
    // _id is auto-generated by MongoDB, and is our primary key
    name: { type: Types.String, trim: true, required: true, unique: true },
    owner: { type: Types.ObjectId, ref: "user", required: true, unique: true }, // 1 owner per container
    parent: { type: Types.ObjectId, ref: "container" },
    children: [{ type: Types.ObjectId, ref: "container" }],
    resources: [{ type: Types.ObjectId, ref: "resource" }], // array of foreign keys into resources collection
})

module.exports = mongoose.model("container", containerSchema);