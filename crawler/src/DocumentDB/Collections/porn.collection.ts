import { model, Schema, Document } from 'mongoose';

export interface PornVideo {
  video_link: string;
  video_image: string;
  video_length: number;
  video_title: string;
  video_update?: Date;
  video_day?: Date;
  video_keyword?: string;
  video_quality?: number;
  video_url?: string;
  video_source: string;
  video_recomend?: number;
  video_views?: number;
  video_preview_link?: string;
  video_original_id?: string;
}

interface MongoPornVideo extends PornVideo, Document {}

const pornVideoSchema = new Schema<MongoPornVideo>({
  video_link: { type: String, required: true },
  video_image: { type: String, required: true },
  video_length: { type: Number, required: true },
  video_title: { type: String, required: true },
  video_update: { type: Date },
  video_day: { type: Date },
  video_keyword: { type: String },
  video_quality: { type: Number },
  video_url: { type: String },
  video_source: { type: String, required: true },
  video_recomend: { type: Number },
  video_views: { type: Number },
  video_preview_link: { type: String },
  video_original_id: { type: String },
});

export const PornCollection = model<PornVideo>('porn', pornVideoSchema);
