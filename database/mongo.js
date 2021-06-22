import mongoose from "mongoose";
import Hero from '../models/model.js';

export function setUpConnection() {
    mongoose.connect(`mongodb://${process.env.DB_CONNECTION_STRING}`);
}

export function heroesList() {
    return Hero.find();
}

export function creatHero(data) {
    const hero = new Hero(data);

    return hero.save();
}

export function updateHero(id, data) {
    const hero = Hero.findById(id);

    return hero.update(data);
}

export function deleteHero(id) {
    return Hero.deleteOne({
        _id: id
    });
}