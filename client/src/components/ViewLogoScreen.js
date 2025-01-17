import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      text
      color
      backgroundColor
      borderColor
      borderRadius
      borderWidth
      borderPadding
      borderMargin
      fontSize
      lastUpdate
    }
  }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id: $id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
  render() {
    return (
      <Query
        pollInterval={500}
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container panel panel-default">
              <div className="leftbox">
                <div className="panel-heading">
                  <h4>
                    <Link to="/">Home</Link>
                  </h4>
                  <h3 className="panel-title">View Logo</h3>
                </div>
                <div className="panel-body">
                  <dl>
                    <dt>Text:</dt>
                    <dd style={{ whiteSpace: "pre-wrap" }}>{data.logo.text}</dd>

                    <dt>Color:</dt>
                    <dd>
                      {" "}
                      <span style={{ background: data.logo.color }}>
                        {" "}
                        {data.logo.color}{" "}
                      </span>
                    </dd>

                    <dt>Background Color:</dt>
                    <dd>
                      <span style={{ background: data.logo.backgroundColor }}>
                        {" "}
                        {data.logo.backgroundColor}{" "}
                      </span>
                    </dd>

                    <dt> Border Color: </dt>
                    <dd>
                      <span style={{ background: data.logo.borderColor }}>
                        {" "}
                        {data.logo.borderColor}{" "}
                      </span>
                    </dd>

                    <dt> Border Radius: </dt>
                    <dd> {data.logo.borderRadius} </dd>

                    <dt> Border Width: </dt>
                    <dd> {data.logo.borderWidth} </dd>

                    <dt> Border Padding: </dt>
                    <dd> {data.logo.borderPadding} </dd>

                    <dt> Border Margin: </dt>
                    <dd> {data.logo.borderMargin} </dd>

                    <dt>Font Size:</dt>
                    <dd>{data.logo.fontSize}</dd>

                    <dt>Last Updated:</dt>
                    <dd>{data.logo.lastUpdate}</dd>
                  </dl>

                  <Mutation
                    mutation={DELETE_LOGO}
                    key={data.logo._id}
                    onCompleted={() => this.props.history.push("/")}
                  >
                    {(removeLogo, { loading, error }) => (
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            removeLogo({ variables: { id: data.logo._id } });
                          }}
                        >
                          <Link
                            to={`/edit/${data.logo._id}`}
                            className="btn btn-success"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button type="submit" className="btn btn-danger">
                            Delete
                          </button>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
              <div
                className="rightbox"
                style={{
                  color: data.logo.color,
                  fontSize: data.logo.fontSize,
                  backgroundColor: data.logo.backgroundColor, //changed
                  borderRadius: data.logo.borderRadius, //changed
                  borderColor: data.logo.borderColor,
                  borderWidth: data.logo.borderWidth,
                  padding: data.logo.borderPadding,
                  margin: data.logo.borderMargin,
                  borderStyle: "solid",
                  whiteSpace: "pre",
                }}
              >
                {data.logo.text}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ViewLogoScreen;
