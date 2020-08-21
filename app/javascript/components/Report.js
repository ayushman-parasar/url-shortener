import React from "react";

import API from "../utils/Api";

class Report extends React.Component {
  constructor() {
    super();
    this.state = {
      report: {
        email: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      report: {
        email: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    API.fetchApi("/static_pages", "POST", this.state)
      .then((res) => this.props.handleNotification([res.notice], false))
      .catch((err) => {
        console.log(err);
        err.json().then((data) => {
          this.props.handleNotification([data.notice], true);
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container m-5">
          <form className="subscribe_form " onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={this.state.report.email}
                onChange={this.handleChange}
              />
              <span className="input-group-btn">
                <button className="btn btn-default font-s" type="submit">
                  Generate Report
                </button>
              </span>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Report;
