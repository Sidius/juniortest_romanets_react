import React, {Component} from "react";
import {Card, Col, Form, Row} from "react-bootstrap";

export default class ProductAttributes extends Component {

    state = {
        isInValid: false,
    }

    handleInput = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        const regexPattern = /^[0-9]*[,.]?[0-9]{0,2}$/;
        console.log(this.state[name]);
        this.setState({
            [name]: !regexPattern.test(value),
        });
    }

    generateAttributes(data) {
        const {productType} = this.props;
        return data.map((attribute) => {
            return(
                <Form.Group key={attribute.id} as={Row} className="mb-3">
                    <Form.Label htmlFor={attribute.title.toLowerCase()} column sm="5">{attribute.title} ({productType.unit})</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder={'#' + attribute.title.toLowerCase()}
                            id={attribute.title.toLowerCase()}
                            required
                            name={attribute.title.toLowerCase()}
                            onChange={this.handleInput}
                            isInvalid={this.state[attribute.title.toLowerCase()]}
                        />
                        <Form.Control.Feedback type="invalid">Please, provide the data of indicated type</Form.Control.Feedback>
                    </Col>
                </Form.Group>
            );
        });
    }

    render() {
        const {data, productType} = this.props;

        const attributes = this.generateAttributes(data);
        let desc = 'Please, provide ';

        if (data.length !== 1) {
            desc += 'dimension';
        } else if (data.length === 1) {
            desc += data[0].title.toLowerCase();
        }

        return(
            <Card style={{width: '30em'}} id={productType.title}>
                <Card.Body>
                    {attributes}
                    <Card.Text>{desc}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}