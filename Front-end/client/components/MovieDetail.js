import React from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import {Space} from "antd"

function MovieDetail(props) {

  const selectedMovie = useSelector((state) => state.movieSelect)

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title={selectedMovie.movieName} bordered={false} style={{ width: '90%', backgroundColor: "#efefef" }}>
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
