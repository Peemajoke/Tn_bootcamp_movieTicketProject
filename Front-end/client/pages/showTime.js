import React, { useState, useCallback } from "react";
import MovieDetail from "../components/MovieDetail";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DatePicker, Space, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Head from "next/head";

function showTime(props) {
    const router = useRouter()

  const selectedMovieShowTime = useSelector(
    (state) => state.movieSelect.showTime
  );

  const selectedMovie = useSelector(
    (state) => state.movieSelect
  );

  function sentSelectedShowTime(showTimeObject){
    console.log("action params:", showTimeObject)
    const temp = {
      type: 'reserveSeatMode',
      movie_id: selectedMovie.movie_id,
      theater: showTimeObject.theater,
      movieName: selectedMovie.movieName,
      showTime: showTimeObject.dateTime
    }
    console.log("to be in redux", temp)
    return temp
  }

  const dispatch = useDispatch()
  const selectShowTime = useCallback((clickedShowTime) => {dispatch(sentSelectedShowTime(clickedShowTime))})

  const [selectedDate, setSelectedDate] = useState("");
  const [isSelectShowTime, setIsSelectShowTime] = useState(false);

  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
    console.log(date, dateString);
  };

  const filterDate = (showTime) => {
    return selectedDate===showTime.dateTime.slice(0,10)
  }

  const proceedToReservation = (item) => {
    setIsSelectShowTime(true)
    selectShowTime(item)
    router.push('/reserveSeat')
  }

  const genShowtime = () => {
    const filteredShowTime = selectedMovieShowTime.filter(filterDate)
    return (
      <Space direction="horizontal">
        {filteredShowTime.map((item) => {
          return (
            <>
            <Card
              style={{ width: 250, height: 80 }}
              hoverable
              onClick={() => {
                proceedToReservation(item)
              }}
            >
              <p>{item.dateTime.slice(11,16)}</p>
            </Card>
            <span style={{marginLeft: '20px'}}></span>
            </>
          );
        })}
      </Space>
    );
  };

  return (
    <>
     <Head>
        <title>S Major F: Showtime</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {/* <h1>Movie Detail and Showtime.</h1> */}
      <div style={{height:'87vh'}}>
      <MovieDetail />
        <h2 style={{textAlign:'center', paddingTop:'30px'}}>Select the day you want to reserve seats.</h2>
      <DatePicker onChange={onChange} style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'300px', marginLeft:'43%' }}/>
      <Space direction="vertical" style={{paddingLeft: '25%', paddingRight: '25%', paddingTop: '3%', paddingBottom: '3%'}}>
        {!isSelectShowTime&&genShowtime()}
      </Space>
      </div>
      <Footer />
    </>
  );
}

export default showTime;
