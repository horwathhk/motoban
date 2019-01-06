import React, { Component } from "react";
import image11 from "../../../image/bike11.jpg";

class BikeProfileFeaturedImages extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "10%", height: "30%" }}>
        <div
          style={{ padding: "0", marginRight: "2%" }}
          class="jumbotron jumbotron-fluid"
        >
          <img style={{ height: "30rem" }} src={image11} />
        </div>
      </div>
    );
  }
}

export default BikeProfileFeaturedImages;
