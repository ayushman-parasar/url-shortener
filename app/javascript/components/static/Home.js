import React from "react";
import PropTypes from "prop-types";
import API from "../../utils/Api";
import Linklist from "../links/Linklist";
import Report from "../Report";
import Notification from "../shared/Notification";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: {
        original_url: "",
      },
      all_links: this.props.links,
      error_message: "",
      success_message: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      link: {
        ...this.state.link,
        original_url: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = { link: this.state.link };
    API.fetchApi(`/api/v1/links`, "POST", payload)
      .then((res) => {
        this.setNotification([res.notice], false);
        setTimeout(function () {
          window.location.href = "/";
        }, 1050);
      })
      .catch((err) =>
        err.json().then((data) =>
          this.setState({
            error_message: {
              isError: true,
              errors: data.notice,
            },
          })
        )
      );
  };

  setNotification = (errors, bool) => {
    this.setState({
      ...this.state,
      error_message: {
        isError: bool,
        errors,
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="subscription_area">
          <div className="container m-4">
            <div className="row">
              <div className="col-sm-12">
                <div className="subscribe_now">
                  <h4 className="mb-4">Url Shortener</h4>
                  <form
                    className="subscribe_form "
                    onSubmit={this.handleSubmit}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your URL with http or https"
                        name="original_url"
                        value={this.state.link.original_url}
                        onChange={this.handleChange}
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                          Shorten
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <Report handleNotification={this.setNotification} />
            </div>
          </div>
          {this.state.error_message ? (
            <Notification errorObj={this.state.error_message} isError="true" />
          ) : null}
          {this.state.success_message ? (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="messages-server-wrapper">
                    <div className="alert alert-success">
                      {this.state.success_message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <Linklist all_links={this.state.all_links} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
