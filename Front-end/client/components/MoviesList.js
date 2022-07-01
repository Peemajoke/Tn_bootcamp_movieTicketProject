import React, {useCallback, useState} from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Card, Space, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from "js-cookie";
const { Meta } = Card;

const { Search } = Input;

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
  };

  const [filterMovie, setFilterMovie] = useState("");

  const filterMovieTitle = (data) => {
    return data.name.toLowerCase().includes(filterMovie)
  }

  
  const onSearch = () => {
    const filterMovieList = data.getAllMovie.data.filter(filterMovieTitle)
    if(filterMovieList.length==0){
      return <h2 style={{textAlign:'center', paddingTop:'30px'}}>Sorry, there is no movie you are looking for.</h2>
    }
    return filterMovieList.map((item) => {
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
  }

  return (
    <Space direction="vertical" style={{height: '100vh', width:'100%'}}>
      <h1 style={{textAlign:'center', paddingTop:'30px'}}>Movie List</h1>
      <Search placeholder="input movie title" style={{ width: 500, paddingLeft:'5%', paddingRight:'5%' }} onChange={(e) => setFilterMovie(e.target.value.toLowerCase())}/>
      <Space direction="horizontal" style={{paddingLeft:'5%', paddingRight:'5%', paddingTop: '20px', paddingBottom:'20px'}}>
      {filterMovie!=''&&data&&onSearch()}
      {filterMovie==''&&data&&genMovieCard()}
      </Space>
    </Space>
  );
}

export default MoviesList;
