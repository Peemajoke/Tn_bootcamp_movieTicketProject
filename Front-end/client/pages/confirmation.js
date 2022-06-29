import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Space, Button } from 'antd';
import Link from 'next/link'

function confirmation(props) {
    const reserved = useSelector(
        (state) => state.reserveSeat
      );

    const performReservation = () => {

    }

    const updateReserveSeat = () => {
        
    }

    let totalPrice=0

    const genReservation = () => {
        return (
            // <Space direction="vertical">
            <>
                {
                    reserved.reservedSeat.map((item,index) => {
                        let thisPrice = (item.slice(0,1)=="A" || item.slice(0,1)=="B" || item.slice(0,1)=="C") ? 500:300
                        totalPrice += thisPrice
                        return(
                            <div style={{alignContent:"center"}}>
                            <Descriptions title={`Ticket ${index+1}`} style={{ padding:'30px', width:'800px'}}>
                                <Descriptions.Item label="Movie">{reserved.movieName}</Descriptions.Item>
                                <Descriptions.Item label="Theater">{reserved.theater}</Descriptions.Item>
                                <Descriptions.Item label="ShowTime">{reserved.showTime.slice(11,16)}</Descriptions.Item>
                                <Descriptions.Item label="Seat">{item}</Descriptions.Item>
                                <Descriptions.Item label="Price">{thisPrice} THB</Descriptions.Item>
                            </Descriptions>
                            <br />
                            </div>
                        )
                    })
                }
                </>
        )
    }

    return (
        <>
        <Navbar />

        <h1>Confirm your reservation</h1>
        {genReservation()}
        <h3>Total price: {totalPrice} THB</h3>

        <Space direction='horizontal'>
            <Link href="/reserveSeat">
                <Button >Back to seat selecting</Button>
            </Link>
            <Button type='primary' >Confirm</Button>
        </Space>

        <Footer />
        </>
    );
}

export default confirmation;