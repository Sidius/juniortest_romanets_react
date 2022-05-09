import React, {Component} from "react";
import {Button, Nav} from "react-bootstrap";
import './Header.scss';


export default class Header extends Component {

    renderItems() {
        return this.props.buttons.map(({id, title, link, onClick, type}) => {

            return(
                <React.Fragment key={link ? link : id}>
                    <Button variant="outline-primary" id={id} href={link} onClick={onClick} style={{textTransform: 'uppercase',}} type={type}>
                        {title}
                    </Button>{' '}
                </React.Fragment>
            );
        });
    }


    render() {
        return (
            <header>
                <Nav className="justify-content-between">
                    <Nav.Item>
                        <h2>{this.props.title}</h2>
                    </Nav.Item>
                    <Nav.Item>
                        {this.renderItems()}
                    </Nav.Item>
                </Nav>
                <hr/>
            </header>
        );
    }
}