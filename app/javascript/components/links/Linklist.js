import React from "react";
import PropTypes from "prop-types";
import API from "../../utils/Api";

class Linklist extends React.Component {
  handleClick = (link) => {
    API.fetchApi(`/api/v1/links/${link.shorten_url}`, "GET")
      .then((res) => {
        window.open(res.link.original_url);
        window.location.href = "/";
      })
      .catch((err) => console.log(err, "error"));
  };

  handleUpdate = (link) => {
    const payload = {
      link: {
        pinned: !link.pinned,
      },
    };
    API.fetchApi(`/api/v1/links/${link.id}`, "PATCH", payload)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <React.Fragment>
        <div className="container table-responsive py-5">
          <table className="table table-bordered table-hover">
            <thead className="thead-dr">
              <tr>
                <th scope="col"></th>
                <th scope="col">Original Url</th>
                <th scope="col">Shortened Url</th>
                <th scope="col">Visit Count</th>
              </tr>
            </thead>
            <tbody>
              {this.props.all_links.map((link) => (
                <tr key={link.id}>
                  <th
                    scope="row"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleUpdate(link)}
                  >
                    {link.pinned ? <>&#128205;</> : <>&#128278;</>}
                  </th>
                  <td>
                    <a
                      className="text-dark"
                      href={link.original_url}
                      target="_blank"
                    >
                      {link.original_url}
                    </a>
                  </td>
                  <td>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleClick(link)}
                    >
                      {window.origin + link.shorten_url}
                    </a>
                  </td>
                  <td>{link.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Linklist;
