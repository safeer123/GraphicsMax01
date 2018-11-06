import React from "react";
import { connect } from "react-redux";
import UpdateMsg from "./UpdateMsg";
import ViewButtonsPanel from "./ViewButtonsPanel";
import "./index.css";
import ControlSettings from "./ControlSettings";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // console.log("Component: componentWillReceiveProps------");
    // console.log(nextProps);
  }

  displayLoader() {
    const displayMsg = "Building it...";
    return (
      <div className="loader">
        {this.props.loading ? (
          <span>
            <i className="fa fa-spinner fa-spin" />
            {displayMsg}
          </span>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div className="overlay-layer">
        <ControlSettings />
        <UpdateMsg />
        <ViewButtonsPanel />
        {this.displayLoader()}
      </div>
    );
  }
}

function mapStateToProps({ activeScenario, scenarioData }) {
  return {
    activeScenario,
    scenarioData
  };
}

export default connect(mapStateToProps)(Overlay);
