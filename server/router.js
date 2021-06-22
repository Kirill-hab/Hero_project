import * as db from "../database/mongo";
import {Router} from "express";

export function createRoutes() {
    const router = new Router();

    router.get('/heroes', (req, res) => {
        db.heroesList().then(data => res.send(data))
    });

    router.post('/heroes', (req, res) => {
        db.creatHero(req.body).then(data => res.send(data))
    });

    router.patch('/heroes/:id', (req, res) => {
        const { id } = req.params;
        db.updateHero(id, req.body).then(data => res.send(data))
    });

    router.delete('/heroes/:id', (req, res) => {
        const {id} = req.params;
        db.deleteHero(id).then(data => res.send(data))
    });

    return router;
}