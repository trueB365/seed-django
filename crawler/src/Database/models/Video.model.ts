import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Default,
  DataType,
} from "sequelize-typescript";
import { Base } from "../base";

export interface IVideo {
  video_link?: string;
  video_image?: string;
  video_length?: string;
  video_title?: string;
  video_update?: Date;
  video_day?: Date;
  video_keyword?: string;
  video_quality?: number;
  video_url?: string;
  video_source?: string;
  video_recomend?: number;
}

@Table({
  tableName: "video_video",
  paranoid: true,
  timestamps: true,
})
export default class Video extends Base<IVideo> implements IVideo {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Default(new Date())
  @Column
  video_day: Date;

  @Column(DataType.TEXT)
  video_image: string;

  @Default("straight")
  @Column(DataType.TEXT)
  video_keyword: string;

  @Column
  video_length: string;

  @Column(DataType.TEXT)
  video_link: string;

  @Default(0)
  @Column
  video_quality: number;

  @Default(0)
  @Column
  video_recomend: number;

  @Column
  video_source: string;

  @Column(DataType.TEXT)
  video_title: string;

  @Default(new Date())
  @Column
  video_update: Date;

  @Column
  video_url: string;
}
