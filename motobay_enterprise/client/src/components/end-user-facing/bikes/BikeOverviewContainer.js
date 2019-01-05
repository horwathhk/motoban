import React, { Component } from "react";

export default class BikeOverviewContainer extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: "10%",
          height: "87%",
          overflow: "hidden"
        }}
        className="card"
      >
        <div style={{ background: "#e8e8e8" }} className="card-body">
          <div className="row">
            <div className="col-md-12">
              <blockquote class="blockquote">
                <p class="mb-0">
                  <em>
                    "Great bike! Aaron brought it straight to my hotel and it
                    ran like a charm! Would rent again for sure."
                  </em>
                </p>
                <footer class="blockquote-footer text-right">
                  Tim Hensen <cite title="Source Title">Motobay Renter</cite>
                </footer>
              </blockquote>{" "}
            </div>
          </div>

          <div style={{ marginTop: "15%", marginRight: "2%" }} className="row">
            <div className="col-md-12">
              <h1 className=" font-weight-light display-6 tex-center">
                Aaron's 1993 Honda Dream
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
