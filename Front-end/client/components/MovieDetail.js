import React from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import {Space, Typography} from "antd"

const { Title } = Typography;

function MovieDetail(props) {

  const selectedMovie = useSelector((state) => state.movieSelect)

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title={<Title level={3}>{selectedMovie.movieName}</Title>} bordered={true} style={{ width: '100%', paddingLeft: '100px', paddingRight: '100px', fontSize:'16px' }}>
        <Space direction="horizontal">
        <img
              alt="example"
              src={selectedMovie.coverURL}
              style={{ width: 150, height: 200}}
            />
            <br />
          <Space direction="vertical">  
          <p>{selectedMovie.description}</p>  
          <p>Length: {selectedMovie.length} minutes</p>
          <p>Genre: {selectedMovie.genre}</p>
          </Space>
          </Space>
        </Card>
      </div>
    </>
  );
}

export default MovieDetail;
