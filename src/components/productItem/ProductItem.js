import React, {Component} from "react";
import {Card} from "react-bootstrap";

export default class ProductItem extends Component {

    state = {
        product: this.props.product
    }

    render() {
        let {sku, name, price, unit, attributes} = this.state.product;

        let attributesLine = '';
        if (attributes.length === 3) {
            attributesLine = "Dimension: "
            attributes.forEach((attribute, index) => {
                attributesLine += attribute.value + (attributes.length - 1 !== index ? 'x' : '');
            });
        } else {
            attributes.forEach((attribute, index) => {
                attributesLine += attribute.unit + ': ' + attribute.value + ' ' + unit + '\n';
            });
        }

        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return(
            <Card key={sku} style={{paddingBottom: '2em',}}>
                <Card.Body>
                    <Card.Title align="left">
                        <input
                            type="checkbox"
                            className="form-check-input delete-checkbox"
                            name="sku"
                            value={sku}
                        />
                    </Card.Title>
                    <Card.Title>{sku}</Card.Title>
                    <Card.Text>{name}</Card.Text>
                    <Card.Text>{formatter.format(price)}</Card.Text>
                    <Card.Text>{attributesLine}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}