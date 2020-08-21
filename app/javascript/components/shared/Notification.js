import React from "react";
class Notification extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.errorObj &&
          this.props.errorObj.errors.map((error, index) => {
            return (
              <div key={index} className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="messages-server-wrapper">
                      <div
                        className={
                          this.props.errorObj.isError
                            ? "alert alert-danger"
                            : "alert alert-success"
                        }
                      >
                        {error}
                      </div>
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

export default Notification;
