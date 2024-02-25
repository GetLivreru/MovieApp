const mongoose = require('mongoose');

// Connection to mongo cloud database
mongoose.connect('mongodb+srv://Lida:oayjqe2005@cluster0.ejidejg.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// User model
const User = new Schema({
    username: String,
    password: String,
    email: String,
    created_at: Date,
    updated_at: Date,
    is_admin: Boolean
});

const UserModel = mongoose.model('User', User);

// Logs model
const Logs = new Schema({
    user: ObjectId,
    request_type: String,
    request_data: String,
    status_code: String,
    timestamp: Date,
    response_data: String
});

const LogsModel = mongoose.model('Logs', Logs);

// Item model
const Item = new Schema({
    names: {
        en: { type: String, required: true },
        ru: { type: String, required: true },
        kz: { type: String, required: true },
    },
    descriptions: {
        en: { type: String, required: true },
        ru: { type: String, required: true },
        kz: { type: String, required: true },
    },
    pictures: [{ type: String, required: true }],
    creationDate: { type: Date, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    budget: { type: Number, required: true },
    timestamps: {
        created_at: { type: Date, required: true, default: Date.now},
        updated_at: { type: Date, required: true, default: Date.now},
        deleted_at: { type: Date, required: false, default: null},
    }
});

const ItemModel = mongoose.model('Item', Item);

// Exports
module.exports = {
    UserModel,
    LogsModel,
    ItemModel
};