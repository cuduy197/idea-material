import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import MobileStepper from "material-ui/MobileStepper";

const styles = {
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    margin: "0 0 1em 0"
  }
};

class DotsMobileStepper extends Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <MobileStepper
        type="dots"
        steps={6}
        backButtonText="Trước"
        nextButtonText="Sau"
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        onBack={this.handleBack}
        onNext={this.handleNext}
        disableBack={this.state.activeStep === 0}
        disableNext={this.state.activeStep === 5}
      />
    );
  }
}

DotsMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DotsMobileStepper);
