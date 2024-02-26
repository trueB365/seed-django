'use client';
import { Layout } from 'antd';
import MainNavigation from '@/app/components/MainNavigation';
import useAxiosFetch from '@/app/hooks/axios.hook';

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

const menuArgs = [
  { name: 'home', path: '/' },
  { name: 'categories', path: '/categories' },
  { name: 'models', path: '/models' },
  { name: 'popular videos', path: '/popular'},
  { name: 'new Videos', path: '/new' },
  { name: 'Advertise', path: '/ads'}
];

const brandingArgs = {
  website_title: "AssoAss",
  logo_url: "https://www.assoass.com/templates/assoass/images/logo-8.png?85ea655d"
}

const langArgs = [
  {label: "English", key: '1'},
  {label: "Swahili", key: '2'},
  {label: "Russian", key: '3'}
]

const Home = () => {
  const { data, isLoading } = useAxiosFetch<{ data: Video[] }>({
    url: 'http://127.0.0.1:8000/api/v1/all',
    method: 'GET',
  });

  return (
    <Layout>
      <MainNavigation menuitems={menuArgs} branding={brandingArgs} lang={langArgs} />
      <main className='grid-container max-w-[1536px]'>
        {data ? data?.data.map((video, index)=>(
          <div className='card' key={index}>
            <div className='relative'>
              <a href={video.video_url} target="_blank" title={video.video_title} rel="nofollow">
                <div className='relative z-0'>
                  <img src={video.video_image} alt={video.video_title} width="240" height="135" className='aspect-video object-cover w-full rounded' />
                  <span className="absolute bg-[red] top-[7px] left-[7px] z-3">
                    <span className="rounded py-[2px] px-[4px]">{video.video_source}</span>
                  </span>
                  <span className="absolute top-[7px] right-[7px] z-3">
                    <span className="rounded py-[2px] px-[4px] bg-[red]">{video.video_length}</span>
                  </span>
                  <h4>{video.video_title}</h4>
                </div>
              </a>
            </div>
          </div>
        )) : (<>
          <p>Loading</p>
        </>)
        }
      </main>
    </Layout>
  );
};

export default Home;
