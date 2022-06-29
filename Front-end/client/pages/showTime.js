import React, { useState, useCallback } from "react";
import MovieDetail from "../components/MovieDetail";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DatePicker, Space, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

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
            <Card
              style={{ width: 300 }}
              hoverable
              onClick={() => {
                proceedToReservation(item)
              }}
            >
              <p>{item.dateTime.slice(11,16)}</p>
            </Card>
          );
        })}
      </Space>
    );
  };

  return (
    <>
      <Navbar />
      <h1>Movie Detail and Showtime.</h1>
      <MovieDetail />
      <Space direction="vertical">
        <h3>Select the day you want to reserve seats.</h3>
        <DatePicker onChange={onChange} />
        {!isSelectShowTime&&genShowtime()}
      </Space>
      <Footer />
    </>
  );
}

export default showTime;
