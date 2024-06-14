'use client';
import { Layout, Pagination } from 'antd';
import MainNavigation from '@/app/components/MainNavigation';
import useAxiosFetch from '@/app/hooks/axios.hook';
import VideoSkeleton from '@/app/components/VideoSkeleton';
import VideoCard from '@/app/components/VideoCard';
import GenericFooter from '@/app/components/GenericFooter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@/app/container/ThemeProvider';
import Head from 'next/head';

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

type VideoAPIResponse = {
  next: string | null;
  previous: string | null;
  count: number;
  results: Video[]
}

type PaginationInfo = {
  page: number;
  page_size: number;
}

const skeletonCount = new Array(24).fill(0);

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [pageInfo, setPageInfo] = useState<PaginationInfo>({ 'page': 1, page_size: 50})

  const { data, setQueryParams } = useAxiosFetch<VideoAPIResponse>({
    url: 'http://127.0.0.1:8000/api/v1/all',
    method: 'GET',
  });

  useEffect(() => {
    const searchParamsJSON = Object.fromEntries(new URLSearchParams(searchParams).entries());
    setPageInfo({ 'page': Number(searchParamsJSON.p ?? 1), 'page_size': Number(searchParamsJSON.page_size ?? 50)})
  }, [pathname, searchParams])

  const handlePageChange = (page: number, pageSize: number) => {
    setQueryParams({ 'p': page, 'page_size': pageSize})
    // @ts-ignore
    router.push(`?p=${page}&page_size=${pageSize}`, undefined, { shallow: true })
  };

  return (
    <Layout className='mb-[40px]' style={{ backgroundColor: theme.color.background }}>
      <MainNavigation />
      <main className='max-w-[1536px]'>
        {
          data ? (<>
              <div className='grid-container'>
                {data?.results.map((video, index) => (<VideoCard video={video} key={index} />))}
              </div>
              <div style={{ padding: '10px 16px 0 16px'}}>
                <div className='grid justify-center items-center mt-[20px] py-2.5'>
                  <Pagination
                    current={pageInfo.page}
                    pageSize={pageInfo.page_size}
                    total={data.count}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Total ${total} items`}
                    onChange={(page, pageSize) => handlePageChange(page, pageSize)}
                  />
                </div>
              </div>
            </>)
            : (
              <div className='grid-container'>
                {skeletonCount.map((_, index) => (<VideoSkeleton key={index} />))}
              </div>
            )
        }
      </main>
      <footer className='max-w-[1536px] mt-[20px]'>
        <GenericFooter />
      </footer>
    </Layout>
  );
};

export default Home;
