import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugService } from '../services/BugsService'
import { notesService } from '../services/NotesService';



//PUBLIC
export class BugsController extends BaseController {
    constructor() {
        super("api/bugs")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/notes', this.getNotesByBugId)
            .post('', this.create)
            .put('/:id', this.edit)
    }
    async getAll(req, res, next) {
        try {
            let data = await bugService.getAll(req.query);
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            let data = await bugService.getById(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async getNotesByBugId(req, res, next) {
        try {
            let data = await notesService.getNotesByBugId(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await bugService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await bugService.edit(req.params.id, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

}
