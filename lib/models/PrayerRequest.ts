import mongoose from 'mongoose';

const PrayerRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'in_progress', 'completed'], 
    default: 'new' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PrayerRequestSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.PrayerRequest || mongoose.model('PrayerRequest', PrayerRequestSchema);
