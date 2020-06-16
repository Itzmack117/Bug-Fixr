import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class NotesService {
    async getNotesByBugId(id) {
        let data = await dbContext.Notes.find({ bugId: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async createNote(rawData) {
        let data = await dbContext.Notes.create(rawData)
        return data
    }

    async editNote(id, userEmail, update) {
        let data = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
    }

    async deleteNote(id) {
        let data = await dbContext.Notes.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const notesService = new NotesService()