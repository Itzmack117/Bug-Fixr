import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugsService {
    async getAll(query = {}) {
        return await dbContext.Bugs.find(query)
    }

    async getById(id) {
        let data = await dbContext.Bugs.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Bugs.create(rawData)
        return data
    }

    async edit(id, update) {
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, closed: false }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or Bug Report Closed");
        }
        return data;
    }

    async delete(id) {
        let data = await dbContext.Bugs.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const bugService = new BugsService()