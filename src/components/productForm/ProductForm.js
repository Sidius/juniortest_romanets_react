import React, {Component} from "react";
import {Col, Form, Row, Spinner} from "react-bootstrap";
import './ProductForm.scss';
import ProductAttributes from "../productAttributes";
import Header from "../header";
import ProductServiceAPI from "../../services/ProductServiceAPI";

export default class ProductForm extends Component {

    state = {
        title: "Product Add",
        navButtons: [
            {
                title: "Save",
                id: "save-button",
                type: 'submit'
            },
            {
                title: "Cancel",
                link: "/",
            },
        ],
        productTypes: null,
        selectedProductType: null,
        attributes: null,
        validated: false,
        price: '',
        isInValidPrice: false,
    }

    handleSubmit = (event) => {
        const productServiceAPI = new ProductServiceAPI();
        const form = event.currentTarget;
        event.preventDefault();

        const regexPattern = /^[0-9]*[,.]?[0-9]{0,2}$/;

        let formAll = document.querySelector("#product_form");
        const allInputs = formAll.children[formAll.children.length - 1];
        const attributesHTML = allInputs.children[allInputs.children.length - 1].querySelectorAll('input');
        let attributeError = true;
        attributesHTML.forEach((attributeHTML) => {
            if (!regexPattern.test(attributeHTML.value)) {
                attributeError = false;
            }
        });

        console.log();

        this.setState({
            isInValidPrice: !regexPattern.test(this.state.price),
        });

        if (form.checkValidity() === false || !regexPattern.test(this.state.price) || !attributeError) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({
            validated: true,
        });

        const skuContainer = document.querySelector('#sku');
        const nameContainer = document.querySelector('#name');
        const priceContainer = document.querySelector('#price');
        const productTypeContainer = document.querySelector('#productType');
        const sku = skuContainer.value;
        const name = nameContainer.value;
        const price = priceContainer.value;
        const productType = productTypeContainer.value;

        if (sku && name && price && productType && regexPattern.test(price) && attributeError) {
            console.log('OK');
            let attributes = [];
            attributesHTML.forEach((attributeHTML) => {
                attributes.push(parseFloat(attributeHTML.value));
            });
            productServiceAPI.addProduct({
                sku: sku,
                name: name,
                price: parseFloat(price),
                productTypeID: parseInt(productType),
            }, attributes).then((response) => {
                window.location.pathname = '/';
            });
        }
    };

    handleInput = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        this.setState({
            [name]: value,
        });
    }

    componentDidMount() {
        const {getProductTypes} = this.props;

        getProductTypes().then((response) => {
            this.setState({
                productTypes: response.response,
            });
        });
    }

    getSelectedProductType(id) {
        let response = null;
        this.state.productTypes.forEach((type) => {
            if (type.id === id) {
                response = type;
            }
        });
        return response;
    }

    generateTypeSwitcher(productTypes) {
        return productTypes.map((productType) => {
            return(
                <option key={productType.id} value={productType.id}>{productType.title}</option>
            );
        });
    }

    changeType() {
        const {value} = document.querySelector('#productType');
        const valueNumber = parseInt(value);
        const {getAttributes} = this.props;

        if (valueNumber !== 0) {
            this.setState({
                selectedProductType: this.getSelectedProductType(valueNumber),
                attributes: null,
            })
            getAttributes(valueNumber).then((response) => {
                this.setState({
                    attributes: response.response,
                });
            });
        } else {
            this.setState({
                selectedProductType: null,
            })
        }
    }

    render() {
        const {productTypes, attributes, selectedProductType} = this.state;

        if (!productTypes) {
            return (
                <Spinner animation="border" role="status"/>
            );
        }

        let attributesItem = null;

        if (selectedProductType) {
            if (!attributes) {
                attributesItem = (
                    <Spinner animation="border" role="status"/>
                );
            } else {
                attributesItem = (
                    <ProductAttributes data={attributes} productType={this.state.selectedProductType}/>
                );
            }
        }

        const types = this.generateTypeSwitcher(productTypes);

        return(
            <Form id="product_form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Header title={this.state.title} buttons={this.state.navButtons}/>
                <Form.Group style={{padding: '0 1.5em', }}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="sku" column sm="2">SKU</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="#sku" id="sku" name="sku" required />
                            <Form.Control.Feedback type="invalid">Please, submit required data</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="name" column sm="2">Name</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="#name" id="name" name="name" required />
                            <Form.Control.Feedback type="invalid">Please, submit required data</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="price" column sm="2">Price</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                placeholder="#price"
                                name="price"
                                id="price"
                                required
                                isInvalid={this.state.isInValidPrice}
                                onChange={(e) => {
                                    this.handleInput(e);
                                    return false;
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Please, provide the data of indicated type</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="productType" column sm="2">Type Switcher</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                aria-label="Default select example"
                                id="productType"
                                onChange={() => {this.changeType();}}
                                name="productType"
                            >
                                <option value="">Type Switcher</option>
                                {types}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please, submit required data</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    {attributesItem}
                </Form.Group>
            </Form>
        );
    }
}