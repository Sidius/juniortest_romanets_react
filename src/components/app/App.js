import React, {Component} from "react";
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ProductsPage} from "../pages";
import AddProductPage from "../pages/AddProductPage";

export default class App extends Component {
    // productServiceAPI.addProduct({
    //   sku: "A0B2022",
    //   name: "ProductExample_3",
    //   price: 88.28,
    //   productTypeID: 3,
    // }, [59.48, 88, 65]).then((response) => {
    // });

    render() {
        return (
            <div className="App">
                <Router>
                    <Routes>
                        <Route path='/' element={<ProductsPage />}/>
                        <Route path='/add-product' element={<AddProductPage />}/>
                    </Routes>
                </Router>
            </div>
        );
  }
}
