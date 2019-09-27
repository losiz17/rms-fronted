import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../style/header.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CardDeck from "react-bootstrap/CardDeck";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import "../style/search.css";

class articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoge: this.props.location.state.res2,
      res: [],
      showModal: false,
      title: ""
    };
    this.click = this.click.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentWillMount() {
    console.log(this.props.location.state.res2);
  }
  close() {
    this.setState({ showModal: false });
  }
  open(title) {
    this.setState({ title: title });
    this.setState({ showModal: true });

    console.log(this.state);
  }

  click(aid) {
    this.setState({ showModal: true });

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // this.setState({ res: xhr.response });
        var responseJson = JSON.parse(xhr.response);
        console.log(responseJson);

        this.setState({
          res: responseJson
        });
      }
    };

    xhr.open("GET", "http://3.112.7.32:8080/api/v1/tags/" + aid);
    xhr.send(null);
  }

  render() {
    return (
      <>
        <Container>
          <div className="justify-content-md-center" id="search-all">
            <CardDeck>
              {this.state.hoge.map(index => {
                return (
                  <Card style={{ width: "18rem" }}>
                    <a onClick={() => this.click(index.id)}>
                      <Card.Body>
                        <Card.Title>{index.title}</Card.Title>
                        <Button
                          variant="info"
                          onClick={() => this.open(index.title)}
                        >
                          記事をみる
                        </Button>
                      </Card.Body>
                    </a>
                  </Card>
                );
              })}
            </CardDeck>
          </div>
        </Container>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          {this.state.res.map(index => {
            return (
              <Modal.Body>
                <Alert variant="info">
                  <p>tf_idf: {index.tf_idf}</p>
                  <p>word: {index.word}</p>
                  <p>idf: {index.idf}</p>
                </Alert>
              </Modal.Body>
            );
          })}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.close}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default articles;
