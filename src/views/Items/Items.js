import React, { Component } from 'react';
import { Button, ButtonGroup, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import './items.css';
import { Redirect, Link } from 'react-router-dom';
import ItemService from './Service/ItemService';

const itemService = new ItemService();

function UserRow(props) {
  const item = props.item

  return (
    <tr >
        <th scope="row">{item.no}</th>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.category}</td>
        <td>{item.quantity}</td>
        <td>{item.price}</td>
        <td align="center">
          <ButtonGroup size="sm">
            <Link to={`/items-detail/${item.id}`} >
                <Button color="primary">edit</Button>
            </Link>
          </ButtonGroup>
        </td>
    </tr>
  )
}

class Tables extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemsData : []
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    itemService.getData().then(response =>{
        const data = response.data;
        if(data.message == "OK"){
          let number = 0;
          const data = response.data.result.map((obj)=>({...obj,'key':obj.id,'no':++number}));
          const elements = response.data.elements;
          this.setState({itemsData:data});
        } else {

        }
    });
  }

  
  render() {
    const itemList = this.state.itemsData

    if(localStorage.getItem('access-token') != null){
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Items
                </CardHeader>
                <CardBody>
                  <div className="button_update--margin">
                    <Link to={`/items-add/`} >
                        <Button color="primary">Tambah Barang</Button>
                    </Link>
                  </div>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                      {itemList != [] ?
                        itemList.map((user, index) => <UserRow key={index} item={user}/>)
                        : null}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return(
          <Redirect to="/login" />
      )
    }
  }
}

export default Tables;
