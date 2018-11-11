import React from "react";
import { connect } from "react-redux";
import { Row, Col, Grid, SplitButton, MenuItem } from "react-bootstrap";
import {
  objControlListForTest,
  globalControlListForTest
} from "./sampleControls";
import { EventName } from "../../../../constants/Events";
import { ControlTypes } from "../../../../constants";
import EventEmitter from "../../../../graphics/lib/EventEmitter";
import { shortenKeys } from "./constants";
import "./index.css";

const UseTestControls = false;

class ControlSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedControl: null,
      globalControls: {},
      objectControls: {}
    };
    if (UseTestControls) {
      this.state.globalControls = globalControlListForTest;
      this.state.objectControls = objControlListForTest;
    } else {
      EventEmitter.on(EventName.RegisterControls, this.registerControl);
      EventEmitter.on(EventName.UnregisterControls, this.unregisterControl);
      EventEmitter.on(EventName.ClearControls, this.clearControls);
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // console.log("Component: componentWillReceiveProps------");
    // console.log(nextProps);
  }

  registerControl = controlObj => {
    const { id, type } = controlObj;
    if (type === ControlTypes.GlobalControl) {
      const globalControls = { ...this.state.globalControls, [id]: controlObj };
      this.setState({ globalControls });
    } else if (type === ControlTypes.ObjectControl) {
      const objectControls = { ...this.state.objectControls, [id]: controlObj };
      this.setState({ objectControls });
    }
  };

  unregisterControl = controlObjId => {};

  clearControls = controlType => {
    if (controlType === ControlTypes.GlobalControl) {
      this.setState({ globalControls: {} });
    } else if (controlType === ControlTypes.ObjectControl) {
      this.setState({ objectControls: {} });
    }
  };

  fireAction = obj => {
    if (obj.action) obj.action();
    this.forceUpdate();
  };

  handleDropdown(e) {
    // console.log(e);
    const { globalControls, objectControls } = this.state;
    if (objectControls[e]) {
      this.setState({ selectedControl: objectControls[e] });
    } else if (globalControls[e]) {
      this.setState({ selectedControl: globalControls[e] });
    }
  }

  render() {
    const { selectedControl, globalControls, objectControls } = this.state;
    return (
      <div className="obj-settings">
        <Grid>
          <Row>
            <Col md={12}>
              <i className="fa fa-cog" />
              <SplitButton
                className="control-item-select"
                bsStyle="primary"
                title={selectedControl ? selectedControl.id : "Select Control"}
                id="controls-dropdown"
                onSelect={e => this.handleDropdown(e)}
              >
                <MenuItem header>Global Controls</MenuItem>
                {Object.values(globalControls).map((obj, i) => {
                  const { id } = obj;
                  const elemKey = `${id}_${i}`;
                  return (
                    <MenuItem key={elemKey} eventKey={id}>
                      {id}
                    </MenuItem>
                  );
                })}
                <MenuItem divider />
                <MenuItem header>Object Controls</MenuItem>
                {Object.values(objectControls).map(obj => {
                  const { id } = obj;
                  return (
                    <MenuItem key={id} eventKey={id}>
                      {id}
                    </MenuItem>
                  );
                })}
              </SplitButton>
            </Col>
          </Row>
          {selectedControl && (
            <Row>
              <Col md={12} className="control-items-wrapper">
                <div className="control-title">
                  {selectedControl.id}
                  <hr />
                </div>
                <div className="control-type">{selectedControl.type}</div>
                {selectedControl.controls.map((obj, i) => {
                  const { controlButton, name, input } = obj;
                  const inputDisplay = input
                    ? shortenKeys(input.join(", "))
                    : "";
                  const elemKey = `${name}_${i}`;
                  const iconClass = controlButton ? controlButton() : "";
                  return (
                    <div key={elemKey} className="control-item">
                      <div className="control-name">{name}</div>
                      {input && (
                        <div className="control-keys">{inputDisplay}</div>
                      )}
                      {controlButton && (
                        <div className="control-btn">
                          <i
                            className={iconClass}
                            onClick={() => this.fireAction(obj)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </Col>
            </Row>
          )}
        </Grid>
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

export default connect(mapStateToProps)(ControlSettings);
