import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { useMutation, useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie'

const url = 'http://localhost:3000/api/v1/auth/login'

const doLoginMutation = gql`
  mutation($input: LoginInput!) {
    login(input: $input) {
      success
      token
    }
  }
`

const doLogout = gql`
  mutation{
   logout{
      success
  }
}
`

const Form2 = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading: mutationLoading, error: mutationError , data}] = useMutation(doLoginMutation);
  const [logoutgql, { loading: mutationLoadingLogout, error: mutationErrorLogout , data3}] = useMutation(doLogout);

  const submitForm = async event => {
    event.preventDefault()

    // const options = {
    //   method: 'post',
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //   },
    //   body: `email=${email}&password=${password}`
    // }

    const loginInput = {
        email: email,
        password: password,
    }

    await login({ variables: { input: loginInput } });
    console.log(mutationLoading)

    // fetch(url, options)
    // .then(response => {
    //   if (!response.ok) {
    //     if (response.status === 404) {
    //       alert('Email not found, please retry')
    //     }
    //     if (response.status === 401) {
    //       alert('Email and password do not match, please retry')
    //     }
    //   }
    //   return response
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     document.cookie = 'token=' + data.token
    //     navigate('/private-area')
    //     console.log(document.cookie)
    //   }
    // })

    // while (mutationLoading){
    //     console.log('waiting for data')
    // }

    console.log(data)
    console.log(data.login)
    // const response = data.json()
    if(data.login.success){
        console.log('data success')
        document.cookie = 'token=' + data.login.token
    }

    console.log(document.cookie)
  }

   async function logout() {
    // const { loading, error, data } = useQuery(doLogout);
    // console.log(data)
    // logoutgql()
    // console.log(dataLogout)
    // console.log("no")
    // console.log(props.client)
    // const logoutOutput = props.client.query({
    //     query: doLogout
    // })
    // console.log(logoutOutput)
    await logoutgql()
    while (mutationLoadingLogout){
        console.log('waiting')
    }
    console.log(data3)
    document.cookie = 'token=' + null
    console.log(document.cookie)
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <p>Email: <input type="text" onChange={event => setEmail(event.target.value)} /></p>
        <p>Password: <input type="password" onChange={event => setPassword(event.target.value)} /></p>
        <p><button type="submit">Login</button></p>
        <p>{Cookies.get('token')}</p>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Form2