import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['service', 'bible_study', 'special'], 
    required: true 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EventSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
