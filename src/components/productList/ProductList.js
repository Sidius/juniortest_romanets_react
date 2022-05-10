import React, {Component} from "react";
import ProductItem from "../productItem";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Header from "../header";
import ProductServiceAPI from "../../services/ProductServiceAPI";

export default class ProductList extends Component {



    deleteAllItems = () => {
        const productServiceAPI = new ProductServiceAPI();
        let checkboxes = document.querySelectorAll('.delete-checkbox:checked');

        if (checkboxes.length !== 0) {
            let response = true;
            checkboxes.forEach((input) => {
                let sku = input.value;
                productServiceAPI.deleteProduct(sku).then(() => {
                    if (!response.response) {
                        response = false;
                    }
                });
                this.setState({
                    update: true,
                });
            });
        }
    }

    state = {
        title: "Product List",
        navButtons: [
            {
                title: "Add",
                link: "/add-product",
                id: null
            },
            {
                title: "Mass delete",
                id: "delete-product-btn",
                onClick: this.deleteAllItems,
                object: this,
            },
        ],
        itemList: null,
        update: false,
    }

    componentDidMount() {
        const {getData} = this.props;

        getData().then((itemList) => {
            this.setState({
                itemList: itemList.response
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.update);
        if (this.state.update) {
            const {getData} = this.props;
            getData().then((itemList) => {
                this.setState({
                    itemList: itemList.response,
                    update: false,
                });
            });
        }
    }

    renderItems(arr) {
        return arr.map((item) => {
            let {sku} = item;
            return(
                <Col key={sku}>
                    <ProductItem product={item}/>
                </Col>
            );
        });
    }

    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return (
                <Spinner animation="border" role="status"/>
            );
        }
        const items = this.renderItems(this.state.itemList);

        return(
            <>
                <Header title={this.state.title} buttons={this.state.navButtons}/>
                <Container fluid={true} style={{padding: '0 1.5em 2em',}}>
                    <Row md={4} className="g-4">
                        {items}
                    </Row>
                </Container>
            </>
        );
    }
}