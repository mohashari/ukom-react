
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Table,
  Alert,
  Row,
} from 'reactstrap';
import SalesService from './Sevice/SalesService'
const salesService = new SalesService();

function UserRow(props) {
  const sales = props.item

  return (
    <tr >
      <th scope="row">{sales.no}</th>
      <td>{sales.buyyer_name}</td>
      <td>{sales.address_buyyer}</td>
      <td>{sales.item.name}</td>
      <td>{sales.item.size}</td>
      <td>{sales.item.color}</td>
      <td>{sales.item_buyyer}</td>
      <td>Rp. {sales.item.price}</td>
      <td>Rp. {sales.total_amount}</td>




      <td align="center">
        <ButtonGroup size="sm">
          <Link to={`/items-detail/${sales.id}`} >
            <Button color="primary">edit</Button>
          </Link>
        </ButtonGroup>
      </td>
    </tr>
  )
}

class Sales extends Component {

  constructor(props) {
    super(props);
    this.state = {
      salesData: []
    }
  }
  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    salesService.getAllSales().then(response => {
      const data = response.data;
      if (data.message == "OK") {
        let number = 0;
        const data = response.data.result.map((obj) => ({ ...obj, 'key': obj.id, 'no': ++number }));
        const elements = response.data.elements;
        this.setState({ salesData: data });
      } else {
      }
    })
  }


  render() {
    const itemList = this.state.salesData
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Items
                </CardHeader>
              <CardBody>
                <div className="button_update--margin">
                  <Link to={`/sales-add/`} >
                    <Button color="primary">Tambah Transaksi </Button>
                  </Link>
                </div>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Pembeli</th>
                      <th>Alamat Pembeli</th>
                      <th>Nama Barang</th>
                      <th>Ukuran</th>
                      <th>Warna</th>
                      <th>Item Beli</th>
                      <th>Harga</th>
                      <th>Total Pembelian</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {itemList != [] ?
                      itemList.map((user, index) => <UserRow key={index} item={user} />)
                      : null}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}
export default Sales;