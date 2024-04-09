import mongoose, { Schema } from 'mongoose';

export interface ShortenedUrlModel extends mongoose.Document {
  url: string;
  short_url: string
  slug: string;
  visits: number;
  user: Schema.Types.ObjectId;
}

const ShortenedUrlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  short_url: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  visits: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const ShortenedUrl = mongoose.model<ShortenedUrlModel>('ShortenedUrl', ShortenedUrlSchema);