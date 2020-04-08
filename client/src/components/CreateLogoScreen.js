import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: String!
    $color: String!
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $borderPadding: Int!
    $borderMargin: Int!
    $fontSize: Int!
  ) {
    addLogo(
      text: $text
      color: $color
      backgroundColor: $backgroundColor
      borderColor: $borderColor
      borderRadius: $borderRadius
      borderWidth: $borderWidth
      borderPadding: $borderPadding
      borderMargin: $borderMargin
      fontSize: $fontSize
    ) {
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
  render() {
    let text,
      color,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      borderPadding,
      borderMargin,
      fontSize;
    return (
      <Mutation
        mutation={ADD_LOGO}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addLogo, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>
                  <Link to="/">Home</Link>
                </h4>
                <h3 className="panel-title">Create Logo</h3>
              </div>
              <div className="panel-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addLogo({
                      variables: {
                        text: text.value,
                        color: color.value,
                        backgroundColor: backgroundColor.value,
                        borderColor: borderColor.value,
                        borderRadius: parseInt(borderRadius.value),
                        borderWidth: parseInt(borderWidth.value),
                        borderPadding: parseInt(borderPadding.value),
                        fontSize: parseInt(fontSize.value),
                      },
                    });
                    text.value = "";
                    color.value = "";
                    backgroundColor.value = "";
                    borderColor.value = "";
                    borderRadius.value = "";
                    borderWidth.value = "";
                    borderPadding.value = "";
                    borderMargin.value = "";
                    fontSize.value = "";
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="text"
                      ref={(node) => {
                        text = node;
                      }}
                      placeholder="Text"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                      type="color"
                      className="form-control"
                      name="color"
                      ref={(node) => {
                        color = node;
                      }}
                      placeholder="Color"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="color"> Background Color:</label>
                    <input
                      type="color"
                      className="form-control"
                      name="backgroundColor"
                      ref={(node) => {
                        backgroundColor = node;
                      }}
                      placeholder="Background Color"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="color"> Border Color:</label>
                    <input
                      type="color"
                      className="form-control"
                      name="borderColor"
                      ref={(node) => {
                        borderColor = node;
                      }}
                      placeholder="Border Color"
                    />
                  </div>

                  <div className="form-group">
                    <label> Border Radius:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="borderRadius"
                      ref={(node) => {
                        borderRadius = node;
                      }}
                      placeholder="Border Radius"
                    />
                  </div>

                  <div className="form-group">
                    <label>Border Width:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="borderWidth"
                      ref={(node) => {
                        borderWidth = node;
                      }}
                      placeholder="Border Width"
                    />
                  </div>

                  <div className="form-group">
                    <label>Border Padding:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="borderPadding"
                      ref={(node) => {
                        borderPadding = node;
                      }}
                      placeholder="Border Padding"
                    />
                  </div>

                  <div className="form-group">
                    <label> Border Margin:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="borderMargin"
                      ref={(node) => {
                        borderMargin = node;
                      }}
                      placeholder="Border Margin"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fontSize">Font Size:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="fontSize"
                      ref={(node) => {
                        fontSize = node;
                      }}
                      placeholder="Font Size"
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
