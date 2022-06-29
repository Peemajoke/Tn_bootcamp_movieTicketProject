import React, {useCallback} from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Space, Button } from 'antd';
import Link from 'next/link'
import { useMutation, useQuery, gql } from "@apollo/client";
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const createTicketMutation = gql`
  mutation ($input: ticketInput!) {
    createTicket(input: $input) {
        data{
              _id
              ref_num
              email
              movie
              theater
              dateTime
              seat
              price
          }
    }
  }
`;

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

let ref_numList = []

function confirmation(props) {
    const router = useRouter()

    const reserved = useSelector(
        (state) => state.reserveSeat
      );

    const selectedMovie = useSelector(
        (state) => state.movieSelect
      );

    function sentRef_num(){
        const temp = {
            type: 'reserveSeatMode',
            movie_id: reserved.movie_id,
            movieName: reserved.movieName,
            theater: reserved.theater,
            showTime: reserved.showTime,
            reservedSeat:reserved.reservedSeat,
            ref_num: ref_numList,
        }
        return temp
      }

    const dispatch = useDispatch()
    const addRef_num = useCallback(() => {dispatch(sentRef_num())})

    const [createTicket, { loading: mutationLoading, error: mutationError, data }] = useMutation(createTicketMutation);

    const performReservation = async () => {
        for (var i=0; i<reserved.reservedSeat.length; i++){
            const ticketId = makeid(6)
            ref_numList.push(ticketId)
            console.log(ticketId)
            
            const ticketInput = {
                ref_num: ticketId,
                email: jwt.decode(Cookies.get('token')).email,
                movie: reserved.movieName,
                theater: reserved.theater,
                dateTime: reserved.showTime,
                seat: reserved.reservedSeat[i],
                price: (reserved.reservedSeat[i].slice(0,1)=="A"||reserved.reservedSeat[i].slice(0,1)=="B"||reserved.reservedSeat[i].slice(0,1)=="C") ? 500:300
            };
            // const ticketInput = {ref_num: "gFrE4s", email: "test@gmail.com", movie: "The Beatles Get Back", theater:1, dateTime:"2022-07-02T13:00:00.000+00:00", seat: "J6", price:300}
            // console.log('ticket info: ',ticketInput)

            // await createTicket({ variables: { input: ticketInput } });

            const url = `http://localhost:3000/api/v1/tickets`

            const options = {
                method: "post",
                headers: {
                //   "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Content-type": "application/json"
                },
                // body: `showTime=${thisShowTime}`,
                body: JSON.stringify(ticketInput)
              };

              fetch(url, options)
              .then((response) => {
                  if (!response.ok) {
                  if (response.status === 404) {
                      alert("Email not found, please retry");
                  }
                  if (response.status === 401) {
                      alert("Email and password do not match, please retry");
                  }
              }
              console.log(response);
            })
            
        }
        console.log('ref_numList: ', ref_numList)
        addRef_num()
    }

    const updateReserveSeat = () => {

        // let thisShowTime = selectedMovie.showTime
        let thisShowTime = structuredClone(selectedMovie.showTime)

        for (let i=0; i< thisShowTime.length; i++){
            if(thisShowTime[i].dateTime === reserved.showTime){
                for (let j=0; j<reserved.reservedSeat.length; j++){
                    thisShowTime[i].reservedSeat.push(reserved.reservedSeat[j])
                }
            }
        }

        console.log(thisShowTime)

        const options = {
            method: "put",
            headers: {
            //   "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Content-type": "application/json"
            },
            // body: `showTime=${thisShowTime}`,
            body: JSON.stringify({showTime: thisShowTime})
          };

          const url = `http://localhost:3000/api/v1/movies/${reserved.movie_id}`

          fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                if (response.status === 404) {
                    alert("Email not found, please retry");
                }
                if (response.status === 401) {
                    alert("Email and password do not match, please retry");
                }
            }
            console.log(response);
      })
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
            <Button type='primary' onClick={() => {
                performReservation()
                updateReserveSeat()
                router.push('/ticketResult')
            }}>Confirm</Button>
        </Space>

        <Footer />
        </>
    );
}

export default confirmation;