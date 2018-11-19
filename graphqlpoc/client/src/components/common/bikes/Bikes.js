import React, { Component } from "react";
import Flexbox from "flexbox-react";
import bike1 from "../../../image/bike1.png";
import bike2 from "../../../image/bike2.jpg";
import bike3 from "../../../image/bike3.jpg";
import bike4 from "../../../image/bike4.jpg";
import bike5 from "../../../image/bike5.jpg";
import bike6 from "../../../image/bike6.jpg";
import bike7 from "../../../image/bike7.jpg";
const main = {
  margin: "5rem"
  // width: "100rem"
};

const card = {
  width: "23rem",
  height: "25rem",
  display: "inline-block"
};

const row = {
  overflowX: "scroll",
  whiteSpace: "nowrap",
  // width: "200%",
  overflowY: "hidden"
};

const text = {
  whiteSpace: "normal"
};

const scrollSection = {
  marginTop: "10rem"
};
class Bikes extends Component {
  render() {
    return (
      <div style={main}>
        <div style={scrollSection} className="scroll-section RentersNearYour">
          <h1>Tops Renters Near You</h1>

          <div style={row} className="row">
            <div className="col-sm-3">
              <div style={card} className="card">
                <img
                  className="card-img-top"
                  src={bike1}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p style={text} className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-secondary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-3">
              <div style={card} className="card">
                <img
                  className="card-img-top"
                  src={bike2}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p style={text} className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-secondary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div style={card} className="card">
                <img
                  className="card-img-top"
                  src={bike3}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p style={text} className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-secondary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div style={card} className="card">
                <img
                  className="card-img-top"
                  src={bike4}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p style={text} className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-secondary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={scrollSection} className="RentalCompanies">
            <h1>Independant Renters</h1>
            <div style={row} className="row">
              <div className="col-sm-3">
                <div style={card} className="card">
                  <img
                    className="card-img-top"
                    src={bike4}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <img
                    className="card-img-top"
                    src={bike5}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <img
                    className="card-img-top"
                    src={bike6}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <img
                      className="card-img-top"
                      src={bike7}
                      alt="Card image cap"
                    />
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={scrollSection} className="RentalCompanies">
            <h1>All Bikes</h1>
            <div style={row} className="row">
              <div className="col-sm-3">
                <div style={card} className="card">
                  <img
                    className="card-img-top"
                    src="..."
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={scrollSection} className="All Bikes">
            <h1>Independant Renters</h1>
            <div style={row} className="row">
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div style={card} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p style={text} className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                    <a href="#" className="btn btn-secondary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Bikes;
