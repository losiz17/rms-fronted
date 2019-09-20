import React, { Component } from "react";
import "../App.css";

class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // usstate: props.initState,
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
    // fetch("http://localhost:8080/api/v1/tags/search", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(this.state.req)
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       res: JSON.stringify({ responseJson: "a" })
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response) {
          console.log(this.response);
          this.setState({
            res: JSON.stringify(this.response)
          });
        }
      } else if (this.readyState == 4) {
        alert("失敗");
      }
    };
    var jsonText = JSON.stringify(this.state.req); // ここで、dataをJSON文字列に変換
    xhr.open("POST", "http://localhost:8080/api/v1/tags/search");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonText);

    console.log(this.state.res);
  }

  onTextAreaChange(e) {
    this.setState({ req: { tagName: e.target.value } });
  }

  render() {
    // var states = [
    //     { code: "CA", name: "California" },
    //     { code: "HI", name: "Hawaii" },
    //     { code: "TX", name: "Texas" },
    //     { code: "WA", name: "Washington" }
    // ];

    return (
      <form className="form-inline" onSubmit={this.onSubmit}>
        {/* <div>
                    <select value={this.state.usstate} onChange={this.onChange}>
                        {options}
                    </select>
                </div> */}
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
        {this.state.res}
      </form>
    );
  }
}

export default search;
