import { Video } from '../../views/home/home';
import ImageWithFallback from '../ImageFallback';
import fallbackImage from '../../assets/Video-Placeholder-1024x684.png';
import xvideos from '../../assets/xvideo.svg';
import xhamster from '../../assets/xhamster.svg';
import pornhub from '../../assets/pornhub.svg';

const companyLogoHandler = (video_source: string | undefined) => {
  if (video_source === 'xvideos') {
    return (<img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={xvideos} alt='xvideos-logo' />);
  } else if (video_source === 'xhamster') {
    return (<img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={xhamster} alt='xhamster-logo' />);
  } else if (video_source === 'pornhub') {
    return (<img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={pornhub} alt='pornhub-logo' />);
  }
};

const VideoCard = ({ video }: PropVideo) => {
  return (
    <a className='w-full item-link rate-link overflow-hidden block text-[#fff] text-[.875rem]' href={video.video_url}
       title={video.video_title} rel='noreferrer' target='_blank'>
      <div className='relative z-0'>
        <ImageWithFallback
          fallbackSrc={fallbackImage}
          className='aspect-video object-cover w-[352px] h-[198px] rounded-[10px]'
          src={video.video_image}
          alt={video.video_title}
        />
        <span
          className='absolute block top-0 right-0.5 duration-badge delay-300 text-sm text-right transition-all duration-300'>
            <span className='inline-grid bg-dark gap-1 grid-flow-col w-auto px-1 rounded video_duration'>
              <span className='font-bold italic'></span>
              {video.video_length}
            </span>
        </span>
      </div>
      <a title={video.video_title} dir='ltr' href={video.video_link}
         className='flex flex-row pt-[12px] pb-[12px] align-start'>
        <div
          className='bg-white w-[40px] h-[40px] rounded-[50%] grow-0 shrink-0 mr-[12px] border  border-main-white-lighter'>
          {companyLogoHandler(video.video_source)}
        </div>
        <div className='truncate text-ellipsis overflow-hidden w-full text-md m-0'>
          {video.video_title}
          <div className='flex flex-row gap-2 mt-2'>
            <span>11.6k</span>
            <svg className='mr-2 align-self-center' viewBox='0 0 16 16' width='1em' height='1em'
                 xmlns='http://www.w3.org/2000/svg' aria-hidden='true' fill='currentColor'>
              <path
                d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
            </svg>
            <span>2k</span>
          </div>
        </div>
      </a>
    </a>
  );
};

type PropVideo = {
  video: Video
}

export default VideoCard;
