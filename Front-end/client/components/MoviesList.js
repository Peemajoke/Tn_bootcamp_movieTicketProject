import React, {useCallback} from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Card, Space } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

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
        <Card
          onClick={() => {
            selectMovie(item)
            router.push('/showTime')
        }}
          hoverable
          style={{ width: 240, padding: 10 }}
          cover={
            <img
              alt="example"
              src={item.coverURL}
            />
          }
        >
          <Meta title={item.name} description={item.genre} />
        </Card>
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
    <>
      <h1 style={{textAlign:'center'}}>Movie List</h1>
      <Space direction="horizontal">
      {data&&genMovieCard()}
      </Space>
    </>
  );
}

export default MoviesList;
