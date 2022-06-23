import { Form, Input, Button, Alert, Spin } from 'antd';
import { useMutation, gql } from '@apollo/client';
import client from '../src/configs/initApollo'

// มี get แต่ไม่ได้ import useQuery มา เพราะจะเอา get นี้ไป fetch ข้อมูลโดยใช้ getServerSideProps แทนการใช้ apollo
const getBlogByID = gql`
  query($_id: ID!) {
    getBlogByID(_id: $_id) {
      data {
          _id
          title
          description
      }
    }
  }
`

// same as create
// line 23 is ไปเรียก type mutation updateBlog ใส่ _id and input
// get httpCode and message to check is update successful. รู้ได้ไงว่า return 2 field นี้ -> ไปดูที่ graphQL server ว่าเขียน schema ไว้ว่าไง​ (แต่มี bug ตรง file service (blog service) ที่ไม่ส่ง response กลับมาเมื่อ update เสร็จ)
const updateBlogMutation = gql`
  mutation($_id: ID!, $input: CreateBlogInput!) {
    updateBlog(_id: $_id, input: $input) {
      httpCode
      message
    }
  }
`

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const EditBlog = ({ data }) => {
  if (!data?.getBlogByID) {
    return <h1>empty</h1>
  }
  else {
    const { _id, title,  description} = data?.getBlogByID?.data
    const [update, { loading, error, updateResponse}] = useMutation(updateBlogMutation); //update function will call useMutation to update data and get callback กลับมา updateResponse is data ที่ตอบกลับมาจาก grapgQL ซึ่งสางมาตามที่เรา def ไว้ นั่นคือ httpCode and message
    //onFinished is called when submit button is pressed.
    const onFinish = (values) => {
    update({ variables: { //sent {variables} as para to update function.
        _id,
        input: values 
    }, fetchPolicy: "network-only"}); //fetchPolicy แค่ใส่ให้รู้ว่าใส่ยังไงเฉย ๆ จริงๆ ไม่ต้องใส่ก็ได้
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

    return (
      <div style={{marginTop: '10%'}}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ title, description }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="Title"
            name="title"
            rules={[
            {
                required: true,
                message: 'Please input your Title!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Description"
            name="description"
            rules={[
            {
                required: true,
                message: 'Please input your description!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            {loading && <Spin tip="Loading..." />}
            {error && <Alert message="Error" type="error" showIcon />}
            { updateResponse && <Alert message="Success Update" type="success" showIcon />} {/* updateResponse if return มา แปลว่า mutation successfu; */}
        </Form.Item>
        </Form>
      </div>
    )
  }
};

// query data ด้วย getServerSideProps. execute ที่ฝั่ง server then ส่งเป็น prop ให้ฝั่ง client ใช้
export const getServerSideProps = async ({ query }) => {
    const { data } = await client.query({
      query: getBlogByID, //getBlogByID is query schema
      variables: { 
          _id: query.id
      },
      fetchPolicy: "network-only" //option บอกว่าไม่ใช้ cache แต่ให้ยิงหาข้อมูลใหม่เสมอ
    });
    return { props: { data } } // return data as prop and to be used in render function
  }
  

export default EditBlog