import React, {useCallback} from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Card, Space } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from "js-cookie";
const { Meta } = Card;

const getMovies = gql`
  query {
    getAllMovie {
      data {
        _id
        movie_id
        name
        description
        genre
        length
        coverURL
        showTime {
          theater
          dateTime
          reservedSeat
        }
      }
    }
  }
`;

function MoviesList(props) {
  const router = useRouter()
  const { loading, error, data } = useQuery(getMovies);
  console.log(data);
  console.log(Cookies.get('token')===undefined )

  function sentSelectedMovie(movieObject){
    console.log("action params:", movieObject)
    const temp = {
      type: 'movieSelectMode',
      movie_id: movieObject.movie_id,
      movieName: movieObject.name,
      description: movieObject.description,
      genre: movieObject.genre,
      length: movieObject.length,
      coverURL: movieObject.coverURL,
      showTime: movieObject.showTime
    }
    // console.log(temp)
    return temp
  }

  const dispatch = useDispatch()
  const selectMovie = useCallback((clickedMovie) => {dispatch(sentSelectedMovie(clickedMovie))})

  const genMovieCard = () => {
    return data.getAllMovie.data.map((item) => {
      return (
        <>
        <Card
          onClick={() => {
            selectMovie(item)
            router.push('/showTime')
        }}
          hoverable
          style={{ width: 260, padding: 0 }}
          cover={
            <img
              alt="example"
              src={item.coverURL}
              style={{width: "250px", height:"320px", paddingLeft:10, paddingTop:10}}
            />
          }
          size={'large'}
        >
          <Meta title={item.name} description={item.genre} />
        </Card>
        <span style={{marginLeft: '20px'}}></span>
        </>
      );
    });
    // return [<Card
    //     onClick={() => console.log(data.getAllMovie.data)}
    //     hoverable
    //     style={{ width: 240, padding: 10 }}
    //     cover={
    //       <img
    //         alt="example"
    //         src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    //       />
    //     }
    //   >
    //     <Meta title="Europe Street beat" description="www.instagram.com" />
    //   </Card>,
    //   <Card
    //     hoverable
    //     style={{ width: 240, padding: 10 }}
    //     cover={
    //       <img
    //         alt="example"
    //         src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
    //       />
    //     }
    //   >
    //     <Meta title="Europe Street beat" description="www.instagram.com" />
    //   </Card>]
  };

  return (
    <Space direction="vertical" style={{height: '100vh', width:'100%'}}>
      <h1 style={{textAlign:'center', paddingTop:'30px'}}>Movie List</h1>
      <Space direction="horizontal" style={{paddingLeft:'100px', paddingRight:'100px', paddingTop: '20px', paddingBottom:'20px'}}>
      {data&&genMovieCard()}
      </Space>
    </Space>
  );
}

export default MoviesList;
