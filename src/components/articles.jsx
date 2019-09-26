import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../style/header.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import "../style//search.css";

import { BrowserRouter, Route, Link } from "react-router-dom";

class articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoge: this.props.location.state.res2
    };
  }
  componentWillMount() {
    console.log(this.props.location.state.res2);
  }

  render() {
    return (
      <Container>
        <div className="justify-content-md-center" id="search-all">
          <CardDeck>
            {this.state.hoge.map(index => {
              return (
                <Card style={{ width: "18rem" }}>
                  <a onClick={() => this.click(index.word)}>
                    <Card.Body>
                      <Card.Title>{index.title}</Card.Title>
                      <Card.Text>
                        <p>{index.id}</p>
                      </Card.Text>
                      <Button variant="info">Go somewhere</Button>
                    </Card.Body>
                  </a>
                </Card>
              );
            })}
          </CardDeck>
        </div>
      </Container>
    );
  }
}
export default articles;
