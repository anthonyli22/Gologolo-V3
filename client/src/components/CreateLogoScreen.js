import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import "../CreateLogo.css";

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
      whiteSpace: false,
    };
  }

  handleTextChange = (event) => {
    //this.text = event.target.value;
    if (event.target.value.trim() === "") {
      this.setState({ text: event.target.value, whiteSpace: true });
    } else {
      this.setState({ text: event.target.value, whiteSpace: false });
    }
  };

  handleColorChange = (event) => {
    //this.color = event.target.value;
    this.setState({ color: event.target.value });
  };

  handleBackgroundColorChange = (event) => {
    //this.backgroundColor = event.target.value;
    this.setState({ backgroundColor: event.target.value });
  };

  handleBorderColorChange = (event) => {
    //this.borderColor = event.target.value;
    this.setState({ borderColor: event.target.value });
  };

  handleBorderRadiusChange = (event) => {
    //this.borderRadius = event.target.value;
    this.setState({ borderRadius: event.target.value });
  };

  handleWidthChange = (event) => {
    //this.borderWidth = event.target.value;
    this.setState({ borderWidth: event.target.value });
  };

  handlePaddingChange = (event) => {
    //this.borderPadding = event.target.value;
    this.setState({ borderPadding: event.target.value });
  };

  handleMarginChange = (event) => {
    //this.borderMargin = event.target.value;
    this.setState({ borderMargin: event.target.value });
  };

  handleFontSizeChange = (event) => {
    //this.fontSize = event.target.value;
    this.setState({ fontSize: event.target.value });
  };

  render() {
    const styles = {
      container: {
        color: this.state.color,
        fontSize: parseInt(this.state.fontSize),
        backgroundColor: this.state.backgroundColor, //changed
        borderRadius: parseInt(this.state.borderRadius), //changed
        borderColor: this.state.borderColor,
        borderWidth: parseInt(this.state.borderWidth),
        padding: parseInt(this.state.borderPadding),
        margin: parseInt(this.state.borderMargin),
        borderStyle: "solid",
        width: "auto",
        whiteSpace: "pre",
        // overflow: "scroll",
      },
    };
    return (
      <Mutation
        mutation={ADD_LOGO}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addLogo, { loading, error }) => (
          <div className="container panel panel-default">
            <div className="leftbox">
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
                        text: this.state.text,
                        color: this.state.color,
                        backgroundColor: this.state.backgroundColor,
                        borderColor: this.state.borderColor,
                        borderRadius: parseInt(this.state.borderRadius),
                        borderWidth: parseInt(this.state.borderWidth),
                        borderPadding: parseInt(this.state.borderPadding),
                        borderMargin: parseInt(this.state.borderMargin),
                        fontSize: parseInt(this.state.fontSize),
                      },
                    });
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="text"
                      // ref={(node) => {
                      //   this.text = node;
                      // }}
                      placeholder="Text"
                      defaultValue={this.state.text}
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
                      //   this.color = node;
                      // }}
                      placeholder="Color"
                      defaultValue={this.state.color}
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
                      //   this.backgroundColor = node;
                      // }}
                      placeholder="Background Color"
                      defaultValue={this.state.backgroundColor}
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
                      //   this.borderColor = node;
                      // }}
                      placeholder="Border Color"
                      defaultValue={this.state.borderColor}
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
                      //   this.borderRadius = node;
                      // }}
                      placeholder="Border Radius"
                      defaultValue={this.state.borderRadius}
                      onChange={this.handleBorderRadiusChange}
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
                      //   this.borderWidth = node;
                      // }}
                      placeholder="Border Width"
                      defaultValue={this.state.borderWidth}
                      onChange={this.handleWidthChange}
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
                      //   this.borderPadding = node;
                      // }}
                      placeholder="Border Padding"
                      defaultValue={this.state.borderPadding}
                      onChange={this.handlePaddingChange}
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
                      //   this.borderMargin = node;
                      // }}
                      placeholder="Border Margin"
                      defaultValue={this.state.borderMargin}
                      onChange={this.handleMarginChange}
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
                      //   this.fontSize = node;
                      // }}
                      placeholder="Font Size"
                      defaultValue={this.state.fontSize}
                      onChange={this.handleFontSizeChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={this.state.whiteSpace}
                  >
                    Submit
                  </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
            <div className="rightbox" style={styles.container}>
              {this.state.text}
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
