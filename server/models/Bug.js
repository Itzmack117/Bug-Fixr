import mongoose from "mongoose"
let Schema = mongoose.Schema

const Bug = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    closed: { type: Boolean, required: true },
    closedDate: { type: Date },
    // TODO SET creatorEmail BACK TO TRUE
    creatorEmail: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

Bug.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default Bug