import React, {Component} from "react";
import ProductItem from "../productItem";
import {Col, Container, Row, Spinner} from "react-bootstrap";

export default class ProductList extends Component {

    state = {
        itemList: null,
        update: this.props.update,
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
        if (this.props.update) {
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
        return arr.map((item, index) => {
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
            <Container fluid={true} style={{padding: '0 1.5em 2em',}}>
                <Row md={4} className="g-4">
                    {items}
                </Row>
            </Container>
        );
    }
}