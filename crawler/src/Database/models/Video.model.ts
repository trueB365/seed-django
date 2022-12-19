import { Table, Column, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Base } from '../base';

export interface IVideo {
  video_link: string;
  video_image: string;
  video_length: string;
  video_title: string;
  video_update: Date;
  video_day: Date;
  video_keyword: string;
  video_quality: number;
  video_url: string;
  video_source: string;
  video_recomend: number;
}

@Table({
  tableName: 'video_video',
  paranoid: true,
  timestamps: true,
})
export default class Video extends Base<Video> implements IVideo {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  meeting_id: number;
  video_day: Date;
  video_image: string;
  video_keyword: string;
  video_length: string;
  video_link: string;
  video_quality: number;
  video_recomend: number;
  video_source: string;
  video_title: string;
  video_update: Date;
  video_url: string;
}
