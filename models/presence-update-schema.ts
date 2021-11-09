import mongoose, { Schema } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const presenceUpdateSchema = new Schema({
    _id: reqString,
    channelId: reqString,
})

const name = 'presence-update-channel'

export default mongoose.models[name] || mongoose.model(name, presenceUpdateSchema, name)