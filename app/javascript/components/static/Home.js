import React from "react";
import PropTypes from "prop-types";
import API from "../../utils/Api";
import Linklist from "../links/Linklist";
import Report from "../Report";
import Error from "./../shared/Error";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      all_links: this.props.links,
      error_message: "",
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
        window.location.href = "/";
      })
      .catch((err) =>
        err.json().then((data) =>
          this.setState({
            error_message: data.notice,
          })
        )
      );
  };

  render() {
    return (
      <React.Fragment>
        <div id="subscription_area">
          <div className="container m-5">
            <div className="row">
              <div className="col-sm-12">
                <div className="subscribe_now">
                  <h4 className="p-2">Url Shortener</h4>
                  <form
                    className="subscribe_form "
                    onSubmit={this.handleSubmit}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your URL"
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
            </div>
          </div>
          {this.state.error_message ? (
            <Error errors={this.state.error_message} />
          ) : null}
          <Linklist all_links={this.state.all_links} />
        </div>
        <Report />
      </React.Fragment>
    );
  }
}

export default Home;
