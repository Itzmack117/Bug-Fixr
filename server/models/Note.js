import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Note = new Schema({
    body: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    bugId: { type: ObjectId, ref: 'Bug', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Note