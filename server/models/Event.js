import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    catsitter: String,
    start: Date,
    end: Date,
    allDay: Boolean
});

export const Event = mongoose.model('Event', EventSchema);