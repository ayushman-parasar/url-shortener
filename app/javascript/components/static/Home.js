import React from "react";
import PropTypes from "prop-types";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      all_links: this.props.links,
    };
  }

  // componentDidMount() {
  //   fetch("/api/v1/links", {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
  //     },
  //   }).then((res) => res.json().then((data) => console.log(data, "dasd")));
  // }
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
    // const payload = { link: this.state.link };
    fetch("/api/v1/links", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify(this.state),
    }).then((res) => {
      if (res.ok) {
        window.location.href = "/";
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="subscription_area">
          <div className="container m-5">
            <div className="row">
              <div className="col-sm-12">
                <div className="subscribe_now">
                  <h4>Url Shortener</h4>

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
          <ul>
            {this.state.all_links
              ? this.state.all_links.map((link) => {
                  return (
                    <>
                      <p>{link.original_url}</p>
                      <a href={`/${link.shorten_url}`}>{link.shorten_url}</a>
                    </>
                  );
                })
              : null}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
