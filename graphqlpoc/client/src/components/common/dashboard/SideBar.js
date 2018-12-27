import React, { Component } from "react";
class SideBar extends Component {
  render() {
    return (
      <div>
        <div class="vertical-menu">
          <a href="#" class="active">
            Home
          </a>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">Link 4</a>
        </div>
      </div>
    );
  }
}

export default SideBar;
