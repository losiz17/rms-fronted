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
        fetch("http://0.0.1.1:8000/1api/v1/tags/search", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: this.state.req
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    // loading: true,
                    res: responseJson
                });
            })
            .catch(error => {
                console.error(error);
            });
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
                {this.state.res.map(res => res)}
            </form>
        );
    }
}

export default search;
