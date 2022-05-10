import React, {Component} from "react";
import ProductServiceAPI from "../../services/ProductServiceAPI";
import ProductList from "../productList";

export default class ProductsPage extends Component {

    productServiceAPI = new ProductServiceAPI();

    componentDidMount() {
        document.title = "Product List";
    }

    render() {
        return(
            <React.Fragment>
                <ProductList getData={this.productServiceAPI.getAllProducts}/>
            </React.Fragment>
        );
    }
}