import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";

class details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoge: this.props.location.state.res
    };
  }

  render() {
    return (
      <Container>
        <div className="justify-content-md-center" id="search-all">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{this.state.hoge.word}</Card.Title>
              <Card.Text>
                <p>idf: {this.state.hoge.idf}</p>
              </Card.Text>
              <Button variant="info">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
}
export default details;
