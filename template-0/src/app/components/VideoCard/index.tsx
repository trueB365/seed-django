'use client';
import { Video } from '../../views/home/page';
import ImageWithFallback from '../ImageFallback';
import React from 'react';

const companyLogoHandler = (video_source: string | undefined) => {
  if (video_source === 'xvideos') {
    return (<img className='w-[40px] h-[40px] rounded-[50%] object-cover' src="/xvideo.svg" alt='xvideos-logo' />);
  } else if (video_source === 'xhamster') {
    return (<img className='w-[40px] h-[40px] rounded-[50%] object-cover' src="/xvideo.svg" alt='xhamster-logo' />);
  } else if (video_source === 'pornhub') {
    return (<img className='w-[40px] h-[40px] rounded-[50%] object-cover' src="/pornhub.svg" alt='pornhub-logo' />);
  }
};

const VideoCard: React.FC<PropVideo> = ({ video, video_key }: PropVideo) => {
  return (
    <a className='no-underline block text-[#fff] text-[.875rem]' href={video.video_url}
       title={video.video_title} rel='noreferrer' target='_blank' key={video_key}>
      <div className='relative w-full md:w-[352px] lg:w-[352px] h-[198px]'>
        <ImageWithFallback
          fallbackSrc="/Video-Placeholder-1024x684.png"
          className='absolute z-0 aspect-video object-cover rounded-[10px]'
          src={video.video_image}
          alt={video.video_title}
        />
        <div className='absolute z-10 top-0 right-0.5 text-sm text-right'>
           <span>{video.video_length}</span>
        </div>
      </div>
      <div className='flex flex-row pt-[12px] pb-[12px] align-start'>
        <div
          className='bg-white w-[40px] h-[40px] rounded-[50%] grow-0 shrink-0 mr-[12px] border  border-main-white-lighter'>
          {companyLogoHandler(video.video_source)}
        </div>
        <div className='w-[85%]'>
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap mb-0">
            {video.video_title}
          </p>
          <div className='flex flex-row gap-2'>
            <span>11.6k</span>
            <svg className='mr-1 mt-1 align-self-center' viewBox='0 0 16 16' width='1em' height='1em'
                 xmlns='http://www.w3.org/2000/svg' aria-hidden='true' fill='currentColor'>
              <path
                d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641
                2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542
                6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8
                2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12
                3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'>
              </path>
            </svg>
            <span>2k</span>
          </div>
        </div>
      </div>
    </a>
  );
};

interface PropVideo {
  video: Video;
  video_key?: string | number | undefined;
}

export default VideoCard;
