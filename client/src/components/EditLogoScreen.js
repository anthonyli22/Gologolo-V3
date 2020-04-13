import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import "../CreateLogo.css";

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
  constructor(props) {
    super(props);
    this.state = {
      text: "Logo",
      color: "#0000FF",
      fontSize: 30,
      borderColor: "#FFA500",
      backgroundColor: "#FFC0CB", //chnaged
      borderRadius: 40, //changed
      borderWidth: 30,
      borderPadding: 15,
      borderMargin: 15,
    };
  }

  text;
  color;
  backgroundColor;
  borderColor;
  borderRadius;
  borderWidth;
  borderPadding;
  borderMargin;
  fontSize;
  handleTextChange = (event) => {
    this.text = event.target.value;
    this.setState({ text: event.target.value });
  };

  handleColorChange = (event) => {
    this.color = event.target.value;
    this.setState({ color: event.target.value });
  };

  handleBackgroundColorChange = (event) => {
    this.backgroundColor = event.target.value;
    this.setState({ backgroundColor: event.target.value });
  };

  handleBorderColorChange = (event) => {
    this.borderColor = event.target.value;
    this.setState({ borderColor: event.target.value });
  };

  handleBorderRadiusChange = (event) => {
    this.borderRadius = event.target.value;
    this.setState({ borderRadius: event.target.value });
  };

  handleWidthChange = (event) => {
    this.borderWidth = event.target.value;
    this.setState({ borderWidth: event.target.value });
  };

  handlePaddingChange = (event) => {
    this.borderPadding = event.target.value;
    this.setState({ borderPadding: event.target.value });
  };

  handleMarginChange = (event) => {
    this.borderMargin = event.target.value;
    this.setState({ borderMargin: event.target.value });
  };

  handleFontSizeChange = (event) => {
    this.fontSize = event.target.value;
    this.setState({ fontSize: event.target.value });
  };

  changeAll(
    text,
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    borderPadding,
    borderMargin,
    fontSize
  ) {
    this.text = text;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.borderRadius = borderRadius;
    this.borderWidth = borderWidth;
    this.borderPadding = borderPadding;
    this.borderMargin = borderMargin;
    this.fontSize = fontSize;
  }
  render() {
    return (
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          this.changeAll(
            data.logo.text,
            data.logo.color,
            data.logo.backgroundColor,
            data.logo.borderColor,
            data.logo.borderRadius,
            data.logo.borderWidth,
            data.logo.borderPadding,
            data.logo.borderMargin,
            data.logo.fontSize
          );
          return (
            <Mutation
              mutation={UPDATE_LOGO}
              key={data.logo._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateLogo, { loading, error }) => (
                <div className="container panel panel-default">
                  <div className="leftbox">
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
                              text: this.text,
                              color: this.color,
                              backgroundColor: this.backgroundColor,
                              borderColor: this.borderColor,
                              borderRadius: parseInt(this.borderRadius),
                              borderWidth: parseInt(this.borderWidth),
                              borderPadding: parseInt(this.borderPadding),
                              borderMargin: parseInt(this.borderMargin),
                              fontSize: parseInt(this.fontSize),
                            },
                          });
                          // this.text = "";
                          // this.color = "";
                          // this.backgroundColor = "";
                          // this.borderColor = "";
                          // this.borderRadius = "";
                          // this.borderWidth = "";
                          // this.borderPadding = "";
                          // this.borderMargin = "";
                          // this.fontSize = "";
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="text">Text:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="text"
                            // ref={(node) => {
                            //   text = node;
                            // }}
                            placeholder="Text"
                            defaultValue={data.logo.text}
                            onChange={this.handleTextChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="color">Color:</label>
                          <input
                            type="color"
                            className="form-control"
                            name="color"
                            // ref={(node) => {
                            //   color = node;
                            // }}
                            placeholder="Color"
                            defaultValue={data.logo.color}
                            onChange={this.handleColorChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="color"> Background Color:</label>
                          <input
                            type="color"
                            className="form-control"
                            name="backgroundColor"
                            // ref={(node) => {
                            //   backgroundColor = node;
                            // }}
                            placeholder="Background Color"
                            defaultValue={data.logo.backgroundColor}
                            onChange={this.handleBackgroundColorChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="color"> Border Color:</label>
                          <input
                            type="color"
                            className="form-control"
                            name="borderColor"
                            // ref={(node) => {
                            //   borderColor = node;
                            // }}
                            placeholder="Border Color"
                            defaultValue={data.logo.borderColor}
                            onChange={this.handleBorderColorChange}
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
                            // ref={(node) => {
                            //   borderRadius = node;
                            // }}
                            placeholder="Border Radius"
                            defaultValue={data.logo.borderRadius}
                            onChange={this.handleBorderRadiusChange}
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
                            // ref={(node) => {
                            //   borderWidth = node;
                            // }}
                            placeholder="Border Width"
                            defaultValue={data.logo.borderWidth}
                            onChange={this.handleWidthChange}
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
                            // ref={(node) => {
                            //   borderPadding = node;
                            // }}
                            placeholder="Border Padding"
                            defaultValue={data.logo.borderPadding}
                            onChange={this.handlePaddingChange}
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
                            // ref={(node) => {
                            //   borderMargin = node;
                            // }}
                            placeholder="Border Margin"
                            defaultValue={data.logo.borderMargin}
                            onChange={this.handleMarginChange}
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
                            // ref={(node) => {
                            //   fontSize = node;
                            // }}
                            placeholder="Font Size"
                            defaultValue={data.logo.fontSize}
                            onChange={this.handleFontSizeChange}
                            required
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
                      whiteSpace: "pre-wrap",
                      // position: "relative",
                      // width: "auto",
                    }}
                  >
                    <span style={{ float: "right" }}> {data.logo.text} </span>
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
