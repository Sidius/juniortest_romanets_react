import React, {Component} from "react";
import {Button, Nav} from "react-bootstrap";
import './Header.scss';
import {Link} from "react-router-dom";


export default class Header extends Component {

    renderItems() {
        return this.props.buttons.map(({id, title, link, onClick, type}) => {
            let button = null
            if (link) {
                button = (<Link to={link} className="btn btn-outline-primary" style={{textTransform: 'uppercase',}}>
                    {title}
                </Link>);
            } else {
                button = (<Button variant="outline-primary" id={id} onClick={onClick} style={{textTransform: 'uppercase',}} type={type}>
                    {title}
                </Button>);
            }

            return(
                <React.Fragment key={link ? link : id}>
                    {button}{' '}
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