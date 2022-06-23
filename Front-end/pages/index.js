//page ที่เอาข้อมูลมาแสดง ก็คือเป็นหน้าที่ทำ queryall นั่นเอง

import { useMutation, useQuery, gql } from '@apollo/client'; //ggl เอาไว้แปลง string ให้รู้ว่านี่คือ syntax ของ graphQL. useQuery เอาไว้ใช้กับ type query เพื่อทำการ query ไปที่ endpoint ของ graphQL ตามที่ประกาศใน initApollo. useMutation เอาไว้ใช้กับ type query mutation เพื่อทำการ mutate ข้อมูล. import ทั้ง 3 ตัว
import { Modal, Row, Col, List, Avatar, Button, Skeleton } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

//เขียนแบบใน playground schema ในการ query
// ประกาศต่างกับใน playground นิดหน่อยคือ คำว่า query ก่อน แล้วตามด้วย parameter ขึ้นต้นด้วย $ แล้วค่อยแบบ playground คือ ชื่อ query,param, สิ่งที่จะรับ เป็นต้น
const getAllBlog = gql`
  query($page: Int, $limit: Int) {
    getAllBlog(page: $page, limit: $limit) {
      total
      pagination {
        page
        limit
      }
      data {
        _id
        title
        description
      }
    }
  }
`;

//* mutation schema รับ id เพื่อระบุตัว delete
const deleteBlogMutation = gql`
  mutation($_id: ID!) {
    deleteBlog(_id: $_id) {
      httpCode
      message
    }
  }
`
//ใช้ useQuery ดึงข้อมูล param 1 คือเอา schema query ใส่ไป, param 2 เป็น option ใส่ได้หลายอย่างเช่น fetch policy, cache memory แต่ในที่นี้ส่ง variable ไป คือส่ง param ให้กับ query schema ที่ขึ้นต้นด้วย $
// function index fetch data and then return HTML ออกไปเป็น UI
const index = () => {
  const { loading, error, data } = useQuery(getAllBlog, {
    variables: {
      page: 1,
      limit: 100
    },
  });

  const [deleteBlog, { deleteResponse}] = useMutation(deleteBlogMutation); //* function เรียก useMutation

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this blog?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {                                  // if กด ตกลง (OK) จะเรียกใช้ deleteBlog
        deleteBlog({ variables: { _id: id }});  // pass id เพื่อ delete
      },
      onCancel() {},
    });
  }

  return (
    <Row>
      <a href='/create' style={{marginLeft: '30px'}}>Add Blog</a> {/* target="_blank" attribute force to open in new tab */}
      <Col span={12} offset={6}>
        {/* loop list of data*/}
      <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={data?.getAllBlog?.data} /* loop data that we fetched by chain optional ว่ามีค่า data ไหม if มีก็ให้วน loop. So ? is loop operation*/
          renderItem={item => (
            <List.Item
              actions={[<a target="_blank" href={`/edit?id=${item._id}`} key="list-loadmore-edit">edit</a>, <a onClick={() => showDeleteConfirm(item._id)} key="list-loadmore-more">delete</a>]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<div>{item.title}</div>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}

export default index