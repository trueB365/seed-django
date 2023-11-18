import { Video } from "../../views/home/home";
import ImageWithFallback from "../ImageFallback";
import fallbackImage from '../../assets/Video-Placeholder-1024x684.png'

const VideoCard = ({ video }: PropVideo) => {
    return (
        <a className="text-[#fff] text-[.875rem]" href={video.video_url} rel="noreferrer" target="_blank">
            <div className="relative">
                <ImageWithFallback
                    fallbackSrc={fallbackImage}
                    className="w-[352px] h-[198px] rounded-[10px]"
                    src={video.video_image}
                    alt={video.video_title}
                />
                <span className="absolute block bottom-0.5 right-0.5 duration-badge delay-300 text-sm text-right transition-all duration-300">
                    <span className="inline-grid bg-dark gap-1 grid-flow-col w-auto px-1 rounded">{video.video_length}</span>
                </span>
            </div>
            <p className="mt-[2px] text-white">{video.video_title}</p>
            <div className="flex flex-row gap-4">
                <p>{video.video_source}</p>
                <div className="grow"></div>
                <p>{video.video_length}</p>
            </div>
        </a>
    )
}

type PropVideo = {
    video: Video
}

export default VideoCard;
