import React, { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieDetail from "../components/MovieDetail";
import SeatPicker from "react-seat-picker";
import Cookies from "js-cookie";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector, } from "react-redux";
import Head from "next/head";

function reserveSeat(props) {

  const selectedShowTime = useSelector(
    (state) => state.reserveSeat
  );

  const filterShowtime = (eachShowTime) => {
    return selectedShowTime.showTime===eachShowTime.dateTime
  }

  const selectedMovieReservedSeat = useSelector(
    (state) => state.movieSelect.showTime.filter(filterShowtime)[0].reservedSeat
  );

  let rows = [
    [
    { number: 1, id: "A1", isReserved: (selectedMovieReservedSeat.indexOf("A1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A1")!==-1) ? true:false },
    { number: 2, id: "A2", isReserved: (selectedMovieReservedSeat.indexOf("A2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A2")!==-1) ? true:false },
    { number: 3, id: "A3", isReserved: (selectedMovieReservedSeat.indexOf("A3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A3")!==-1) ? true:false },
    { number: 4, id: "A4", isReserved: (selectedMovieReservedSeat.indexOf("A4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A4")!==-1) ? true:false },
    { number: 5, id: "A5", isReserved: (selectedMovieReservedSeat.indexOf("A5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A5")!==-1) ? true:false },
    { number: 6, id: "A6", isReserved: (selectedMovieReservedSeat.indexOf("A6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A6")!==-1) ? true:false },
    { number: 7, id: "A7", isReserved: (selectedMovieReservedSeat.indexOf("A7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A7")!==-1) ? true:false },
    { number: 8, id: "A8", isReserved: (selectedMovieReservedSeat.indexOf("A8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A8")!==-1) ? true:false },
    { number: 9, id: "A9", isReserved: (selectedMovieReservedSeat.indexOf("A9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A9")!==-1) ? true:false },
    { number: 10, id: "A10", isReserved: (selectedMovieReservedSeat.indexOf("A10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("A10")!==-1) ? true:false },
  ],
    [
      { number: 1, id: "B1", isReserved: (selectedMovieReservedSeat.indexOf("B1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B1")!==-1) ? true:false },
      { number: 2, id: "B2", isReserved: (selectedMovieReservedSeat.indexOf("B2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B2")!==-1) ? true:false },
      { number: 3, id: "B3", isReserved: (selectedMovieReservedSeat.indexOf("B3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B3")!==-1) ? true:false },
      { number: 4, id: "B4", isReserved: (selectedMovieReservedSeat.indexOf("B4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B4")!==-1) ? true:false },
      { number: 5, id: "B5", isReserved: (selectedMovieReservedSeat.indexOf("B5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B5")!==-1) ? true:false },
      { number: 6, id: "B6", isReserved: (selectedMovieReservedSeat.indexOf("B6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B6")!==-1) ? true:false },
      { number: 7, id: "B7", isReserved: (selectedMovieReservedSeat.indexOf("B7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B7")!==-1) ? true:false },
      { number: 8, id: "B8", isReserved: (selectedMovieReservedSeat.indexOf("B8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B8")!==-1) ? true:false },
      { number: 9, id: "B9", isReserved: (selectedMovieReservedSeat.indexOf("B9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B9")!==-1) ? true:false },
      { number: 10, id: "B10", isReserved: (selectedMovieReservedSeat.indexOf("B10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("B10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "C1", isReserved: (selectedMovieReservedSeat.indexOf("C1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C1")!==-1) ? true:false },
      { number: 2, id: "C2", isReserved: (selectedMovieReservedSeat.indexOf("C2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C2")!==-1) ? true:false },
      { number: 3, id: "C3", isReserved: (selectedMovieReservedSeat.indexOf("C3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C3")!==-1) ? true:false },
      { number: 4, id: "C4", isReserved: (selectedMovieReservedSeat.indexOf("C4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C4")!==-1) ? true:false },
      { number: 5, id: "C5", isReserved: (selectedMovieReservedSeat.indexOf("C5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C5")!==-1) ? true:false },
      { number: 6, id: "C6", isReserved: (selectedMovieReservedSeat.indexOf("C6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C6")!==-1) ? true:false },
      { number: 7, id: "C7", isReserved: (selectedMovieReservedSeat.indexOf("C7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C7")!==-1) ? true:false },
      { number: 8, id: "C8", isReserved: (selectedMovieReservedSeat.indexOf("C8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C8")!==-1) ? true:false },
      { number: 9, id: "C9", isReserved: (selectedMovieReservedSeat.indexOf("C9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C9")!==-1) ? true:false },
      { number: 10, id: "C10", isReserved: (selectedMovieReservedSeat.indexOf("C10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("C10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "D1", isReserved: (selectedMovieReservedSeat.indexOf("D1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D1")!==-1) ? true:false },
      { number: 2, id: "D2", isReserved: (selectedMovieReservedSeat.indexOf("D2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D2")!==-1) ? true:false },
      { number: 3, id: "D3", isReserved: (selectedMovieReservedSeat.indexOf("D3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D3")!==-1) ? true:false },
      { number: 4, id: "D4", isReserved: (selectedMovieReservedSeat.indexOf("D4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D4")!==-1) ? true:false },
      { number: 5, id: "D5", isReserved: (selectedMovieReservedSeat.indexOf("D5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D5")!==-1) ? true:false },
      { number: 6, id: "D6", isReserved: (selectedMovieReservedSeat.indexOf("D6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D6")!==-1) ? true:false },
      { number: 7, id: "D7", isReserved: (selectedMovieReservedSeat.indexOf("D7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D7")!==-1) ? true:false },
      { number: 8, id: "D8", isReserved: (selectedMovieReservedSeat.indexOf("D8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D8")!==-1) ? true:false },
      { number: 9, id: "D9", isReserved: (selectedMovieReservedSeat.indexOf("D9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D9")!==-1) ? true:false },
      { number: 10, id: "D10", isReserved: (selectedMovieReservedSeat.indexOf("D10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("D10")!==-1) ? true:false  },
    ],
    [
      { number: 1, id: "E1", isReserved: (selectedMovieReservedSeat.indexOf("E1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E1")!==-1) ? true:false },
      { number: 2, id: "E2", isReserved: (selectedMovieReservedSeat.indexOf("E2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E2")!==-1) ? true:false },
      { number: 3, id: "E3", isReserved: (selectedMovieReservedSeat.indexOf("E3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E3")!==-1) ? true:false },
      { number: 4, id: "E4", isReserved: (selectedMovieReservedSeat.indexOf("E4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E4")!==-1) ? true:false },
      { number: 5, id: "E5", isReserved: (selectedMovieReservedSeat.indexOf("E5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E5")!==-1) ? true:false },
      { number: 6, id: "E6", isReserved: (selectedMovieReservedSeat.indexOf("E6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E6")!==-1) ? true:false },
      { number: 7, id: "E7", isReserved: (selectedMovieReservedSeat.indexOf("E7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E7")!==-1) ? true:false },
      { number: 8, id: "E8", isReserved: (selectedMovieReservedSeat.indexOf("E8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E8")!==-1) ? true:false },
      { number: 9, id: "E9", isReserved: (selectedMovieReservedSeat.indexOf("E9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E9")!==-1) ? true:false },
      { number: 10, id: "E10", isReserved: (selectedMovieReservedSeat.indexOf("E10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("E10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "F1", isReserved: (selectedMovieReservedSeat.indexOf("F1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F1")!==-1) ? true:false },
      { number: 2, id: "F2", isReserved: (selectedMovieReservedSeat.indexOf("F2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F2")!==-1) ? true:false },
      { number: 3, id: "F3", isReserved: (selectedMovieReservedSeat.indexOf("F3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F3")!==-1) ? true:false },
      { number: 4, id: "F4", isReserved: (selectedMovieReservedSeat.indexOf("F4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F4")!==-1) ? true:false },
      { number: 5, id: "F5", isReserved: (selectedMovieReservedSeat.indexOf("F5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F5")!==-1) ? true:false },
      { number: 6, id: "F6", isReserved: (selectedMovieReservedSeat.indexOf("F6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F6")!==-1) ? true:false },
      { number: 7, id: "F7", isReserved: (selectedMovieReservedSeat.indexOf("F7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F7")!==-1) ? true:false },
      { number: 8, id: "F8", isReserved: (selectedMovieReservedSeat.indexOf("F8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F8")!==-1) ? true:false },
      { number: 9, id: "F9", isReserved: (selectedMovieReservedSeat.indexOf("F9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F9")!==-1) ? true:false },
      { number: 10, id: "F10", isReserved: (selectedMovieReservedSeat.indexOf("F10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("F10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "G1", isReserved: (selectedMovieReservedSeat.indexOf("G1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G1")!==-1) ? true:false },
      { number: 2, id: "G2", isReserved: (selectedMovieReservedSeat.indexOf("G2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G2")!==-1) ? true:false },
      { number: 3, id: "G3", isReserved: (selectedMovieReservedSeat.indexOf("G3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G3")!==-1) ? true:false },
      { number: 4, id: "G4", isReserved: (selectedMovieReservedSeat.indexOf("G4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G4")!==-1) ? true:false },
      { number: 5, id: "G5", isReserved: (selectedMovieReservedSeat.indexOf("G5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G5")!==-1) ? true:false },
      { number: 6, id: "G6", isReserved: (selectedMovieReservedSeat.indexOf("G6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G6")!==-1) ? true:false },
      { number: 7, id: "G7", isReserved: (selectedMovieReservedSeat.indexOf("G7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G7")!==-1) ? true:false },
      { number: 8, id: "G8", isReserved: (selectedMovieReservedSeat.indexOf("G8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G8")!==-1) ? true:false },
      { number: 9, id: "G9", isReserved: (selectedMovieReservedSeat.indexOf("G9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G9")!==-1) ? true:false },
      { number: 10, id: "G10", isReserved: (selectedMovieReservedSeat.indexOf("G10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("G10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "H1", isReserved: (selectedMovieReservedSeat.indexOf("H1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H1")!==-1) ? true:false },
      { number: 2, id: "H2", isReserved: (selectedMovieReservedSeat.indexOf("H2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H2")!==-1) ? true:false },
      { number: 3, id: "H3", isReserved: (selectedMovieReservedSeat.indexOf("H3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H3")!==-1) ? true:false },
      { number: 4, id: "H4", isReserved: (selectedMovieReservedSeat.indexOf("H4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H4")!==-1) ? true:false },
      { number: 5, id: "H5", isReserved: (selectedMovieReservedSeat.indexOf("H5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H5")!==-1) ? true:false },
      { number: 6, id: "H6", isReserved: (selectedMovieReservedSeat.indexOf("H6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H6")!==-1) ? true:false },
      { number: 7, id: "H7", isReserved: (selectedMovieReservedSeat.indexOf("H7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H7")!==-1) ? true:false },
      { number: 8, id: "H8", isReserved: (selectedMovieReservedSeat.indexOf("H8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H8")!==-1) ? true:false },
      { number: 9, id: "H9", isReserved: (selectedMovieReservedSeat.indexOf("H9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H9")!==-1) ? true:false },
      { number: 10, id: "H10", isReserved: (selectedMovieReservedSeat.indexOf("H10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("H10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "I1", isReserved: (selectedMovieReservedSeat.indexOf("I1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I1")!==-1) ? true:false },
      { number: 2, id: "I2", isReserved: (selectedMovieReservedSeat.indexOf("I2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I2")!==-1) ? true:false },
      { number: 3, id: "I3", isReserved: (selectedMovieReservedSeat.indexOf("I3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I3")!==-1) ? true:false },
      { number: 4, id: "I4", isReserved: (selectedMovieReservedSeat.indexOf("I4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I4")!==-1) ? true:false },
      { number: 5, id: "I5", isReserved: (selectedMovieReservedSeat.indexOf("I5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I5")!==-1) ? true:false },
      { number: 6, id: "I6", isReserved: (selectedMovieReservedSeat.indexOf("I6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I6")!==-1) ? true:false },
      { number: 7, id: "I7", isReserved: (selectedMovieReservedSeat.indexOf("I7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I7")!==-1) ? true:false },
      { number: 8, id: "I8", isReserved: (selectedMovieReservedSeat.indexOf("I8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I8")!==-1) ? true:false },
      { number: 9, id: "I9", isReserved: (selectedMovieReservedSeat.indexOf("I9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I9")!==-1) ? true:false },
      { number: 10, id: "I10", isReserved: (selectedMovieReservedSeat.indexOf("I10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("I10")!==-1) ? true:false },
    ],
    [
      { number: 1, id: "J1", isReserved: (selectedMovieReservedSeat.indexOf("J1")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J1")!==-1) ? true:false },
      { number: 2, id: "J2", isReserved: (selectedMovieReservedSeat.indexOf("J2")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J2")!==-1) ? true:false },
      { number: 3, id: "J3", isReserved: (selectedMovieReservedSeat.indexOf("J3")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J3")!==-1) ? true:false },
      { number: 4, id: "J4", isReserved: (selectedMovieReservedSeat.indexOf("J4")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J4")!==-1) ? true:false },
      { number: 5, id: "J5", isReserved: (selectedMovieReservedSeat.indexOf("J5")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J5")!==-1) ? true:false },
      { number: 6, id: "J6", isReserved: (selectedMovieReservedSeat.indexOf("J6")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J6")!==-1) ? true:false },
      { number: 7, id: "J7", isReserved: (selectedMovieReservedSeat.indexOf("J7")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J7")!==-1) ? true:false },
      { number: 8, id: "J8", isReserved: (selectedMovieReservedSeat.indexOf("J8")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J8")!==-1) ? true:false },
      { number: 9, id: "J9", isReserved: (selectedMovieReservedSeat.indexOf("J9")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J9")!==-1) ? true:false },
      { number: 10, id: "J10", isReserved: (selectedMovieReservedSeat.indexOf("J10")==-1 ) ? false:true, isSelected: (selectedShowTime.reservedSeat && selectedShowTime.reservedSeat.indexOf("J10")!==-1) ? true:false },
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
  const [selectedSeat, setSelectedSeat] = useState(selectedShowTime.reservedSeat? selectedShowTime.reservedSeat:[]);

  

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
      <Head>
        <title>S Major F: Reservation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        selectedByDefault
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
