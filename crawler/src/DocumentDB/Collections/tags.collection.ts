import { model, Schema, Document } from 'mongoose';

export interface Tags {
  title: string;
  count?: number;
  popularity?: number;
}

interface MongoTags extends Tags, Document {}

const tagsSchema = new Schema<MongoTags>({
  title: { type: String, required: true },
  count: { type: Number },
  popularity: { type: Number },
});

export const TagsCollection = model<MongoTags>('tag', tagsSchema);
