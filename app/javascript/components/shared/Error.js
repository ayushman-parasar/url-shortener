import React from "react";
class Error extends React.Component {
  render() {
    console.log(this.props.errors);
    return (
      <React.Fragment>
        {this.props.errors &&
          this.props.errors.map((error, index) => {
            return (
              <div key={index} className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="messages-server-wrapper">
                      <div className="alert alert-danger">{error}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}

export default Error;
