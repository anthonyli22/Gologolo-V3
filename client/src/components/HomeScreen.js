import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {
  render() {
    return (
      <Query pollInterval={2000} query={GET_LOGOS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container row">
              <div className="col s4 card orange">
                <h3>Recent Work</h3>
                {data.logos
                  .sort(function (a, b) {
                    return b.lastUpdate > a.lastUpdate;
                  })
                  .map((logo, index) => (
                    <div
                      key={index}
                      className="home_logo_link"
                      style={{
                        cursor: "pointer",
                        color: "#000000",
                        margin: "5px",
                      }}
                    >
                      <Link to={`/view/${logo._id}`}>
                        <button style={{ whiteSpace: "pre" }}>
                          {" "}
                          {logo.text}{" "}
                        </button>
                      </Link>
                    </div>
                  ))}
              </div>
              <div className="col s6"></div>
              <div className="col s8">
                <div id="home_banner_container">Gologolo</div>
                <div>
                  <Link id="add_logo_button" to="/create">
                    <button style={{ color: "white", background: "green" }}>
                      {" "}
                      Add Logo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default HomeScreen;
