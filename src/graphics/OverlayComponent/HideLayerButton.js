import React from "react";
import "./index.css";
import { EventEmitter, EventName, BTN } from "../";

class HideLayerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  switchVisibility = () => {
    const { active } = this.props;
    EventEmitter.emit(EventName.SwitchControlLayerVisibility);
  };

  render() {
    const { active } = this.props;
    const visibilityBTN = BTN.Visibility(active);
    return (
      <div className="hide-layer-btn">
        <i className={visibilityBTN} onClick={this.switchVisibility} />
      </div>
    );
  }
}

export default HideLayerButton;
