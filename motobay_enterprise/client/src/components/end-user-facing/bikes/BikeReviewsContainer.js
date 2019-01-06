import React, { Component } from "react";
class Reviews extends Component {
  render() {
    return (
      <div>
        <h1>Reviews</h1>
        <div className="card" style={{ marginTop: "5%" }}>
          <div className="card-body">
            <h5 className="card-title">Brenda H.</h5>
            <div className="card-subtitle mb-2 text-muted">
              Best renter on Motobay! Rent from this man!
              <br />
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <p class="card-text">
              Had a great time! The bike was in good shape when we picked it up.
              Rode it for four days with no problems.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: "5%", marginBottom: "5%" }}>
          <div className="card-body">
            <h5 className="card-title">Brad M.</h5>
            <div className="card-subtitle mb-2 text-muted">
              Great service, great bike, would rent again.
              <br />
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <p class="card-text">
              Simply awesome. We got a flat tired on the second day, but we
              texted Aaron and he sent someone to fix it. 20 minutes later we
              were headed over Hai Van pass with no issues!
            </p>
          </div>
        </div>
        <div className="card" style={{ marginTop: "5%" }}>
          <div className="card-body">
            <h5 className="card-title">MikeB.</h5>

            <div className="card-subtitle mb-2 text-muted">
              Pretty good besides late delivery
              <br />
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <p class="card-text">
                Bike was great. The reason for three stars is that we ordered
                the bike to be at our hotel when we arrived to Da Nang but it
                wasn't there when we got there. A quick message through the app
                and Aaron had it delivered to us promptly. The bike itself ran
                beutifully!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
