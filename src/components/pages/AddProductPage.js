import React, {Component} from "react";
import ProductForm from "../productForm";
import ProductServiceAPI from "../../services/ProductServiceAPI";

export default class AddProductPage extends Component {
    productServiceAPI = new ProductServiceAPI();

    componentDidMount() {
        document.title = "Product Add";
    }

    render() {
        return(
            <React.Fragment>
                <ProductForm
                    getProductTypes={this.productServiceAPI.getAllProductTypes}
                    getAttributes={this.productServiceAPI.getProductUnitsOnTypeID}
                />
            </React.Fragment>
        );
    }
}