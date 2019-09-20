import React, { Component } from "react";
import "../App.css";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: { tagName: "" },
      res: []
    };
    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }

  // onChange(e) {
  //     console.log(e.target.value);
  //     this.setState({ usstate: e.target.value });
  // }

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
    xhr.open("POST", "http://localhost:8080/api/v1/tags/search");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonText);

    console.log(this.state);
  }

  onTextAreaChange(e) {
    this.setState({ req: { tagName: e.target.value } });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSubmit}>
        <div className="form-group mx-sm-3 mb-2">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={this.state.desc}
            onChange={this.onTextAreaChange}
          />
        </div>

        <div>
          <button className="btn btn-primary mb-2" type="submit">
            検索
          </button>
        </div>
        {/* <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Find a repository" />
          </div>
          <div class="control">
            <a class="button is-info">Search</a>
          </div>
        </div> */}

        <ol>
          {this.state.res.map(function(index) {
            return <li key={index.id}>{index.tagName}</li>;
          })}
        </ol>
      </form>
    );
  }
}

export default search;
