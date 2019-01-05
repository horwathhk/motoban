import React, { Component } from "react";
import { getBikeQuery } from "../../../queries/queries";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import Aaron from "../../../image/aaron.jpg";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
class BikeOwnerDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: ""
    };
  }

  render() {
    return (
      <div>
        <Col md={12}>
          <div
            className="card"
            style={{
              boxShadow:
                "0 10px 20px rgb(253,99,1,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            }}
          >
            <div className="card-body">
              <img
                className="rounded-circle centered mx-auto d-block"
                src={Aaron}
                style={{
                  height: "10rem",
                  width: "10rem",
                  marginTop: "5%"
                }}
              />
              <h6 className="text-muted text-center"> Aaron H.</h6>

              <hr />
              <div class="info">
                <row>
                  <h6>
                    Username:
                    <small class="text-muted">
                      <span style={{ marginLeft: "1%" }}>
                        {this.props.username}
                      </span>
                    </small>
                  </h6>
                </row>
                <row>
                  <h6>
                    Email:
                    <small class="text-muted">
                      <span style={{ marginLeft: "1%" }}>
                        {this.props.email}
                      </span>
                    </small>
                  </h6>
                </row>
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}
export default BikeOwnerDetailsCard;
