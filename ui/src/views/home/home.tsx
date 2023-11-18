import * as React from "react";
import SideBar from "../../container/sidebar";
import useAxiosFetch from "../../hooks/axios.hook";
import VideoCard from "../../components/VideoCard";

export interface Video {
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


const Home = () => {
    const { data } = useAxiosFetch<{ data: Video[] }>({ url: "http://127.0.0.1:8000/api/v1/all", method: "GET" })

    return (
        <SideBar>
            <div className="grid grid-cols-4 gap-4 mb-[1em]">
                {data ? data.data.map((video) => {
                    return (<div>
                        <VideoCard video={video} />
                    </div>)
                }) : "loading...."}
            </div>
        </SideBar>
    )
}

export default Home;
