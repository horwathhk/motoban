import React, { Component } from "react";
// https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 2
    };
  }
  normalFooter() {
    if (this.state.number === 1) {
      return (
        <footer
          style={{ marginTop: "0rem!important" }}
          className="bg-dark text-white p-4 text-center fixed-bottom"
        >
          Copyright &copy; {new Date().getFullYear()} Motoban
        </footer>
      );
    }
  }

  specialFooter() {
    if (this.state.number === 2) {
      return (
        <footer
          style={{ marginTop: "0rem!important" }}
          className="bg-dark text-white p-4 text-center"
        >
          <div className="row">
            <div classname="col-md-12">
              Copyright &copy; {new Date().getFullYear()} other one
            </div>
          </div>
        </footer>
      );
    }
  }

  render() {
    return (
      <div>
        {this.normalFooter()}
        {this.specialFooter()}
      </div>
    );
  }
}
