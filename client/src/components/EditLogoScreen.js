import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    }
  }
`;

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!
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
    updateLogo(
      id: $id
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
      lastUpdate
    }
  }
`;

class EditLogoScreen extends Component {
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
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation
              mutation={UPDATE_LOGO}
              key={data.logo._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateLogo, { loading, error }) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <Link to="/">Home</Link>
                      </h4>
                      <h3 className="panel-title">Edit Logo</h3>
                    </div>
                    <div className="panel-body">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateLogo({
                            variables: {
                              id: data.logo._id,
                              text: text.value,
                              color: color.value,
                              backgroundColor: backgroundColor.value,
                              borderColor: borderColor.value,
                              borderRadius: parseInt(borderRadius.value),
                              borderWidth: parseInt(borderWidth.value),
                              borderPadding: parseInt(borderPadding.value),
                              borderMargin: parseInt(borderMargin.value),
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
                            defaultValue={data.logo.text}
                            required
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
                            defaultValue={data.logo.color}
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
                            defaultValue={data.logo.backgroundColor}
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
                            defaultValue={data.logo.borderColor}
                          />
                        </div>

                        <div className="form-group">
                          <label> Border Radius:</label>
                          <input
                            type="number"
                            min="2"
                            max="144"
                            className="form-control"
                            name="borderRadius"
                            ref={(node) => {
                              borderRadius = node;
                            }}
                            placeholder="Border Radius"
                            defaultValue={data.logo.borderRadius}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Border Width:</label>
                          <input
                            type="number"
                            min="2"
                            max="144"
                            className="form-control"
                            name="borderWidth"
                            ref={(node) => {
                              borderWidth = node;
                            }}
                            placeholder="Border Width"
                            defaultValue={data.logo.borderWidth}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Border Padding:</label>
                          <input
                            type="number"
                            min="2"
                            max="144"
                            className="form-control"
                            name="borderPadding"
                            ref={(node) => {
                              borderPadding = node;
                            }}
                            placeholder="Border Padding"
                            defaultValue={data.logo.borderPadding}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label> Border Margin:</label>
                          <input
                            type="number"
                            min="2"
                            max="144"
                            className="form-control"
                            name="borderMargin"
                            ref={(node) => {
                              borderMargin = node;
                            }}
                            placeholder="Border Margin"
                            defaultValue={data.logo.borderMargin}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="fontSize">Font Size:</label>
                          <input
                            type="number"
                            min="2"
                            max="144"
                            className="form-control"
                            name="fontSize"
                            ref={(node) => {
                              fontSize = node;
                            }}
                            placeholder="Font Size"
                            defaultValue={data.logo.fontSize}
                            required
                          />
                        </div>
                        <div
                          className="col s8"
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
                            width: "auto",
                            whiteSpace: "pre-wrap",
                            minwidth: "max-content",
                            overflow: "auto",
                          }}
                        >
                          {data.logo.text}
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
        }}
      </Query>
    );
  }
}

export default EditLogoScreen;
