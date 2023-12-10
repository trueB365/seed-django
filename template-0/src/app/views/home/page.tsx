'use client';
import SideBar from '../../container/sidebar';
import useAxiosFetch from '../../hooks/axios.hook';
import VideoCard from '../../components/VideoCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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


const Page = () => {
  const { data } = useAxiosFetch<{ data: Video[] }>({ url: 'http://127.0.0.1:8000/api/v1/all', method: 'GET' });

  return (
    <SideBar>
        <Container fluid>
          <Row className="mt-3 mx-0.5">
            {data ? data.data.map((video, index) => {
              return (
                  <Col lg={3} md={6} sm={12} xs={12}>
                    <VideoCard video={video} video_key={index} />
                  </Col>
              );
            }) : 'loading....'}
          </Row>
        </Container>
    </SideBar>
);
};

export default Page;
