import { CompassOutlined } from '@ant-design/icons';
import { Video } from '@/app/page';

type VideoProp = {
  video: Video;
}

const VideoCard = ({ video }: VideoProp) => (
  <div className='card'>
    <div className='relative'>
      <a href={video.video_url} target="_blank" title={video.video_title} rel="nofollow">
        <div className='relative z-0'>
          <img src={video.video_image} alt={video.video_title} width="240" height="135"
               className='aspect-video object-cover w-full rounded' />
          <span className="absolute rounded bg-[red] top-[7px] right-[7px] z-3">
                    <span className="capitalize py-[2px] px-[4px]">
                      <CompassOutlined className="mr-1" />
                      {video.video_source}
                    </span>
                  </span>
          <span className="absolute bottom-[27px] right-[7px] z-3">
                    <span className="rounded py-[2px] px-[4px] bg-[red]">{video.video_length}</span>
                  </span>
          <h4 className="overflow-hidden truncate">{video.video_title}</h4>
        </div>
      </a>
    </div>
  </div>
)

export default VideoCard;
