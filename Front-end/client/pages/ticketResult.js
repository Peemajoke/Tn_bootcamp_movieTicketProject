import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Space, Button } from "antd";
import Link from 'next/link'

function ticketResult(props) {
  const reserved = useSelector((state) => state.reserveSeat);

  const genTicket = () => {
    return (
      <>
        {reserved.reservedSeat.map((item, index) => {
          return (
            <div style={{ alignContent: "center" }}>
              <Descriptions
                title={`Ticket ${index + 1}`}
                style={{ padding: "30px", width: "800px" }}
              >
                <Descriptions.Item label="Movie">
                  {reserved.movieName}
                </Descriptions.Item>
                <Descriptions.Item label="Theater">
                  {reserved.theater}
                </Descriptions.Item>
                <Descriptions.Item label="ShowTime">
                  {reserved.showTime.slice(11, 16)}
                </Descriptions.Item>
                <Descriptions.Item label="Seat">{item}</Descriptions.Item>
                <Descriptions.Item label="Price">
                  {item.slice(0, 1) == "A" || item.slice(0, 1) == "B" || item.slice(0, 1) == "C" ? 500 : 300} THB
                </Descriptions.Item>
                <Descriptions.Item label="Reference Code">
                  {reserved.ref_num[index]}
                </Descriptions.Item>
              </Descriptions>
              <br />
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <Navbar />
      <h1>ticket result</h1>
      {genTicket()}
      <Link href="/">
        <Button >Back to Homepage</Button>
      </Link>
      <Footer />
    </>
  );
}

export default ticketResult;
