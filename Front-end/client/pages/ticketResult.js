import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Form, Button, Typography } from "antd";
import Link from 'next/link'
import Head from "next/head";
const { Title } = Typography;

function ticketResult(props) {
  const reserved = useSelector((state) => state.reserveSeat);

  const genTicket = () => {
    return (
      <>
        {reserved.reservedSeat.map((item, index) => {
          return (
            <div style={{ alignContent: "center" }}>
              <Descriptions
                bordered
                title={<Title level={3}>{`Ticket ${index + 1}`}</Title>}
                style={{ paddingLeft:'22%', paddingRight:'22%', paddingTop: '2%', paddingBottom: '2%', width:'100%'}}
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
    <Head>
        <title>S Major F: Reservation Result</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{height: '87vh'}}>
      <Navbar />
      <h1 style={{textAlign:'center', paddingTop:'30px'}}>Reservation Results</h1>
      {genTicket()}
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
      <Link href="/">
        <Button style={{width:'300px', borderLeft: '50%'}}>Back to Homepage</Button>
      </Link>
        <br />
      </Form.Item>
      {/* <Footer /> */}
      </div>
    </>
  );
}

export default ticketResult;
