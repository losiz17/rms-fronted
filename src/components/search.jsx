import React, { Component } from "react";
import "../style//search.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";

import { BrowserRouter, Route, Link } from "react-router-dom";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: { word: "" },
      req2: { word: "" },
      res: [],
      res2: [],
      id: ""
    };
    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.click = this.click.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.req);

    var xhr = new XMLHttpRequest();
    var responseJson;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // this.setState({ res: xhr.response });
        var responseJson = JSON.parse(xhr.response);
        console.log(responseJson[0]);

        this.setState({
          res: responseJson
        });
      }
    };

    var jsonText = JSON.stringify(this.state.req); // ここで、dataをJSON文字列に変換
    xhr.open("POST", "http://3.112.7.32:8080/api/v1/tags/search");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonText);

    console.log(this.state);
  }

  onTextAreaChange(e) {
    this.setState({ req: { word: e.target.value } });
  }

  click(tag) {
    console.log(this.state);
    // this.setState({ req2: { word: tag } });

    var json = { word: tag };
    var xhr = new XMLHttpRequest();
    var responseJson;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // this.setState({ res: xhr.response });
        var responseJson = JSON.parse(xhr.response);
        console.log(responseJson[0]);

        this.setState({
          res2: responseJson
        });

        console.log(this.state);

        this.props.history.push({
          pathname: "/articles/1",
          state: { res2: this.state.res2 }
        });
      }
    };

    var jsonText = JSON.stringify(json); // ここで、dataをJSON文字列に変換
    xhr.open("POST", "http://3.112.7.32:8080/api/v1/tags/articles");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonText);
  }

  render() {
    return (
      <Container>
        <div className="justify-content-md-center" id="search-all">
          <Form inline id="search-box" onSubmit={this.onSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={this.state.desc}
              onChange={this.onTextAreaChange}
            />
            <Button variant="outline-info" type="submit">
              Search
            </Button>
          </Form>
          <CardDeck>
            <Card style={{ width: "18rem" }}>
              <a onClick={() => this.click("index.tagName")}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="info">Go somewhere</Button>
                </Card.Body>
              </a>
            </Card>

            {this.state.res.map(index => {
              return (
                <Card style={{ width: "18rem" }}>
                  <a onClick={() => this.click(index.word)}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>{index.word}</Card.Title>
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

export default search;
