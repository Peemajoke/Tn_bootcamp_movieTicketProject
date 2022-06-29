import React, { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieDetail from "../components/MovieDetail";
import SeatPicker from "react-seat-picker";
import Cookies from "js-cookie";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function reserveSeat(props) {
  const rows = [
    [
      { number: 1, id: "A1" },
      { number: 2, id: "A2" },
      { number: 3, id: "A3" },
      { number: 4, id: "A4" },
      { number: 5, id: "A5" },
      { number: 6, id: "A6" },
      { number: 7, id: "A7" },
      { number: 8, id: "A8" },
      { number: 9, id: "A9" },
      { number: 10, id: "A10" },
    ],
    [
      { number: 1, id: "B1" },
      { number: 2, id: "B2" },
      { number: 3, id: "B3" },
      { number: 4, id: "B4" },
      { number: 5, id: "B5" },
      { number: 6, id: "B6" },
      { number: 7, id: "B7" },
      { number: 8, id: "B8" },
      { number: 9, id: "B9" },
      { number: 10, id: "B10" },
    ],
    [
      { number: 1, id: "C1" },
      { number: 2, id: "C2" },
      { number: 3, id: "C3" },
      { number: 4, id: "C4" },
      { number: 5, id: "C5" },
      { number: 6, id: "C6" },
      { number: 7, id: "C7" },
      { number: 8, id: "C8" },
      { number: 9, id: "C9" },
      { number: 10, id: "C10" },
    ],
    [
      { number: 1, id: "D1" },
      { number: 2, id: "D2" },
      { number: 3, id: "D3" },
      { number: 4, id: "D4" },
      { number: 5, id: "D5" },
      { number: 6, id: "D6" },
      { number: 7, id: "D7" },
      { number: 8, id: "D8" },
      { number: 9, id: "D9" },
      { number: 10, id: "D10" },
    ],
    [
      { number: 1, id: "E1" },
      { number: 2, id: "E2" },
      { number: 3, id: "E3" },
      { number: 4, id: "E4" },
      { number: 5, id: "E5" },
      { number: 6, id: "E6" },
      { number: 7, id: "E7" },
      { number: 8, id: "E8" },
      { number: 9, id: "E9" },
      { number: 10, id: "E10" },
    ],
    [
      { number: 1, id: "F1" },
      { number: 2, id: "F2" },
      { number: 3, id: "F3" },
      { number: 4, id: "F4" },
      { number: 5, id: "F5" },
      { number: 6, id: "F6" },
      { number: 7, id: "F7" },
      { number: 8, id: "F8" },
      { number: 9, id: "F9" },
      { number: 10, id: "F10" },
    ],
    [
      { number: 1, id: "G1" },
      { number: 2, id: "G2" },
      { number: 3, id: "G3" },
      { number: 4, id: "G4" },
      { number: 5, id: "G5" },
      { number: 6, id: "G6" },
      { number: 7, id: "G7" },
      { number: 8, id: "G8" },
      { number: 9, id: "G9" },
      { number: 10, id: "G10" },
    ],
    [
      { number: 1, id: "H1" },
      { number: 2, id: "H2" },
      { number: 3, id: "H3" },
      { number: 4, id: "H4" },
      { number: 5, id: "H5" },
      { number: 6, id: "H6" },
      { number: 7, id: "H7" },
      { number: 8, id: "H8" },
      { number: 9, id: "H9" },
      { number: 10, id: "H10" },
    ],
    [
      { number: 1, id: "I1" },
      { number: 2, id: "I2" },
      { number: 3, id: "I3" },
      { number: 4, id: "I4" },
      { number: 5, id: "I5" },
      { number: 6, id: "I6" },
      { number: 7, id: "I7" },
      { number: 8, id: "I8" },
      { number: 9, id: "I9" },
      { number: 10, id: "I10" },
    ],
    [
      { number: 1, id: "J1" },
      { number: 2, id: "J2" },
      { number: 3, id: "J3" },
      { number: 4, id: "J4" },
      { number: 5, id: "J5" },
      { number: 6, id: "J6" },
      { number: 7, id: "J7" },
      { number: 8, id: "J8" },
      { number: 9, id: "J9" },
      { number: 10, id: "J10" },
    ],
  ];

  const addSeatCallback = ({ row, number, id }, addCb) => {
    let selectedSeatList = selectedSeat;
    selectedSeatList.push(id);
    console.log(selectedSeatList);
    setSelectedSeat(selectedSeatList);
    addCb(row, number, id);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    let selectedSeatList = selectedSeat;
    const idx = selectedSeatList.indexOf(id);
    selectedSeatList.splice(idx, 1);
    console.log(selectedSeatList);
    setSelectedSeat(selectedSeatList);
    removeCb(row, number, id);
  };

  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState([]);

  const selectedShowTime = useSelector(
    (state) => state.reserveSeat
  );

  function sentSelectedSeat(list){
    const temp = {
      type: 'reserveSeatMode',
      movie_id: selectedShowTime.movie_id,
      movieName: selectedShowTime.movieName,
      theater: selectedShowTime.theater,
      showTime: selectedShowTime.showTime,
      reservedSeat:list
    }
    console.log("to be in redux", temp)
    return temp
  }
  const dispatch = useDispatch()
  const selectSeat = useCallback((list) => {dispatch(sentSelectedSeat(list))})

  const showSelectAtLeaseOneModal = () => {
    Modal.warning({
        title: 'Cannot perform this reservation!',
        content: 'At least 1 seat must be selected to perform a reservation.',
      });
  }

  return (
    <>
      <Navbar />
      <h1>reserveSeat</h1>
      <MovieDetail />
      <h2 style={{textAlign: 'center'}}>Theater: {selectedShowTime.theater}</h2>
      <h2 style={{textAlign: 'center'}}>Showtime: {selectedShowTime.showTime.slice(11,16)}</h2>

      <div className="App">
        <SeatPicker
          alpha={true}
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rows}
          maxReservableSeats={Cookies.get("token") !== "null" ? 100 : 0}
          visible
        />
        <h1 className="screen">SCREEN</h1>
      </div>
      {Cookies.get("token") === "null" && (
        <>
          <p>Please login to make a reservation</p>
          <Button
            type="primary"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
          <p>Or if you don't have an account</p>
          <Button
            type="text"
            onClick={() => {
              router.push("/register");
            }}
          >
            Register
          </Button>
        </>
      )}
      {Cookies.get("token") !== "null" && (
        <>
          <Button
            type="primary"
            onClick={() => {
              if(selectedSeat.length==0){ 
                showSelectAtLeaseOneModal()
            }else {
                selectSeat(selectedSeat)
                router.push("/confirmation");
            }
            }
        }
          >
            Make a Reservation
          </Button>
        </>
      )}
      <Footer />
    </>
  );
}

export default reserveSeat;
