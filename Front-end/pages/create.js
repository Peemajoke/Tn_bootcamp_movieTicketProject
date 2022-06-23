import { Form, Input, Button, Alert, Spin } from 'antd';
import { useMutation, gql } from '@apollo/client';

const createBlogMutation = gql`
  mutation($input: CreateBlogInput!) {
    createBlog(input: $input) {
      data {
          _id
          title
          description
      }
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

const CreateBlog = () => {
  // เขียน f. แบบนี้ create คือชื่อ f. { loading: mutationLoading, error: mutationError , data} คือ callback สิ่งที่ return ออกมา มีใช้ {} เพื่อชำแหละยัดเข้าตัวแปรแล้ว เหมือนในบท express
  const [create, { loading: mutationLoading, error: mutationError , data}] = useMutation(createBlogMutation); // useQuery รับค่า loading กับ error ได้ตรงๆ แต่ถ้า useMutation ต้องเขียนแบบนี้
  // edit กับ delete มี pattern เหมือน create เลย คือ เขียน schema แบบบรรทัด 4-14 และสั่ง useMutation แบบ line 33

  //called when submit button is pressed. values is ค่าที่กรอกใน form
  const onFinish = (values) => {
    console.log(values)
    create({ variables: { input: values } }); //create is a function declare in line 33. variables นี้ จะเป็น para ที่ 2 ให้ useMutation เพื่อเอาค่าไปใส createBlogMutation
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{marginTop: '10%'}}>
      <Form
        {...layout}
        name="basic"
        initialValues={{}}
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
            {mutationLoading && <Spin tip="Loading..." />}
            {mutationError && <Alert message="Error" type="error" showIcon />}
            {data && <Alert message="Success Tips" type="success" showIcon />} {/* if มี data (mutate success) ก็ขึ้น success Tips*/}
        </Form.Item>
        </Form>
      </div>
  );
};

export default CreateBlog