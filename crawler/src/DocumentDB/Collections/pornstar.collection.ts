import { model, Schema, Document } from 'mongoose';

interface Pornstar {
  name: string;
  age?: number;
  country?: string;
  video_count?: number;
  video_views?: number;
  bio?: string;
}

interface MongoPornstar extends Pornstar, Document {}

const pornstarSchema = new Schema<MongoPornstar>({
  name: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  video_count: { type: Number },
  video_views: { type: Number },
  bio: { type: String },
});

export const PornstarCollection = model<MongoPornstar>('pornstar', pornstarSchema);
