import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
    Badge,
    Button,
    ButtonDropdown,
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
    Row,
    Table,
} from 'reactstrap';
import Tables from '../../Items/Items';
import SalesService from '../Sevice/SalesService';
const salesService = new SalesService();


// function ItemRow(props) {
//     const item = props.item
//     ``
//     return (
//         <tr>
//             <td>{item.no}</td>
//             <td>
//                 <Col md="7">
//                     {item.name}
//                 </Col>
//             </td>
//             <td>

//                 <Col md="6">
//                     <Input type="number" defaultValue={item.buyyerItem}
//                          onChange={item.buyyerItem} />
//                 </Col>
//             </td>
//         </tr>
//     )
// }


class SalesForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemData: [],
            buyyerName: "",
            addressBuyyer: "",
            salesItem: []
        }
        this.handleChange = this.handleChange.bind(this);
    }


    buyyerName = (e) => { this.setState({ buyyerName: e.target.value }) }
    addressBuyyer = (e) => { this.setState({ addressBuyyer: e.target.value }) }
    salesItem = (e) => { this.setState({ salesItem: e.target.value }) }
    itemData = (e) => { this.setState({ itemData: e.target.value }) }



    componentDidMount() {
        this.getItem();
    }

    getItem() {
        salesService.getAllItem().then(response => {
            const data = response.data;
            if (data.message == "OK") {
                let number = 0;
                let buyyerItem = 0;
                const data = response.data.result.map((obj) => ({ ...obj, 'key': obj.id, 'no': ++number, 'buyyerItem': buyyerItem }));
                const elements = response.data.elements;
                this.setState({ itemData: data });
                console.log(data);

            } else {
                console.log("Item Data Tidak Ter Load");
            }
        })
    }



    doSubmit = () => {
        console.log(this.state.itemData)
        var sales = this.state.itemData.filter(data => data.buyyerItem = "0");
        console.log(sales);
        const dataContent = {
            buyyerName: this.state.buyyerName,
            addressBuyyer: this.state.addressBuyyer,
            salesItem: this.state.itemData.map((data) => {
                if (data.buyyerItem > 0) {
                    return {
                        id: data.id,
                        buyyerItem: data.buyyerItem
                    }
                }
            })
        }

        console.log(dataContent);
        salesService.postData(dataContent).then(response => {
            console.log(response.data)
        })
    }

    handleChange(e) {
        console.log(e.target.value);
    }

    render() {

        function ItemRow(props) {
            const item = props.item
            const handleChange = props.handleChange

            return (
                <tr>
                    <td>{item.no}</td>
                    <td>
                        <Col md="7">
                            {item.name}
                        </Col>
                    </td>
                    <td>

                        <Col md="6">
                            <Input type="number" defaultValue={item.buyyerItem}
                                onChange={(e) => handleChange(e)} />
                        </Col>
                    </td>
                </tr>
            )
        }

        const itemList = this.state.itemData
        return (
            <div>

                <Form>
                    <FormGroup>
                        <Col md='3'>
                            <Label htmlFor="text-input">Nama Pembeli</Label>
                        </Col>
                        <Col xs="15" md="7">
                            <Input type="text" onChange={this.buyyerName} placeholder="isi Form" required />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md='3'>
                            <Label htmlFor="text-input">Alamat Pembeli</Label>
                        </Col>
                        <Col xs="15" md="7">
                            <Input type="textarea" onChange={this.addressBuyyer} placeholder="isi Form" required />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md="8">
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <th>No</th>
                                    <th>Barang</th>
                                    <th>Jumlah</th>
                                </thead>
                                <tbody>
                                    {itemList != [] ?
                                        itemList.map((user, index) => <ItemRow key={index} item={user} handleChange={(e) => this.handleChange(e)} />)
                                        : null}
                                </tbody>
                            </Table>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.doSubmit} color="primary" className="px-4">Submit</Button>
                    </FormGroup>
                </Form>

            </div>
        )
    }
}
export default SalesForm;