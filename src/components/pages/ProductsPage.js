import React, {Component} from "react";
import Header from "../header";
import ProductServiceAPI from "../../services/ProductServiceAPI";
import ProductList from "../productList";

export default class ProductsPage extends Component {

    productServiceAPI = new ProductServiceAPI();

    componentDidMount() {
        document.title = "Product List";
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
            },
        ],
    }

    deleteAllItems() {
        const productServiceAPI = new ProductServiceAPI();
        let checkboxes = document.querySelectorAll('.delete-checkbox input:checked');

        if (checkboxes.length !== 0) {
            let response = true;
            checkboxes.forEach((input) => {
                let sku = input.value;
                productServiceAPI.deleteProduct(sku).then((result) => {
                    if (!response.response) {
                        response = false;
                    }
                });
            });
        }
    }

    render() {
        return(
            <React.Fragment>
                <Header title={this.state.title} buttons={this.state.navButtons}/>
                <ProductList getData={this.productServiceAPI.getAllProducts}/>
            </React.Fragment>
        );
    }
}