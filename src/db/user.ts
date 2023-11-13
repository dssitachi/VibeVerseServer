import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
})

export const UserModel = mongoose.model('User', UserSchema);

export function getUsers() {
    return UserModel.find();
}

export function getUserByEmail(email: string) {
    return UserModel.findOne({ email })
}

export function getUserBySessionToken(sessionToken: string) {
    return UserModel.findOne({
        'authentication.sessionToken': sessionToken
    })
}

export function createUser(values: Record<string, any>) {
    return new UserModel(values).save().then((user) => user.toObject());
}