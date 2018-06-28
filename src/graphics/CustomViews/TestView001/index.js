import renderConfigNoLight from "../../ObjectGroup3D/renderConfig";
import renderConfigLight from "../../ObjectGroup3D/renderConfigLight";
import renderConfig2D from "../../ObjectGroup2D/renderConfig";
import GraphicsLayer from "../../lib/GraphicsLayer";
import UserControl from "../../lib/UserControl";
import { GestureType } from "../../../constants/Gesture";

import SplitScreenView from "./SplitScreenView";
import SingleNodeView from "./SingleNodeView";
import OneEyeView from "./OneEyeView";
import TwoEyesView from "./TwoEyesView";

// Smart Graphics Layer
export default class TestView001 extends GraphicsLayer {
  // Construct canvas and webgl context
  constructor(wrapperElem) {
    super(wrapperElem);
    this.userControl = new UserControl(this.displayOutHandler);

    this.viewList = [TwoEyesView, OneEyeView, SplitScreenView, SingleNodeView];
    this.currentViewIndex = 0;
    this.setCurrentView(0);

    this.registerViewSwitchControl();
  }

  switchView = () => {
    const nextIndex = (this.currentViewIndex + 1) % this.viewList.length;
    this.setCurrentView(nextIndex);
  };

  registerViewSwitchControl() {
    const { userControl } = this;
    const main = this.switchView;
    const keyControlObject = {
      modeName: "Switch Views",
      main
    };
    userControl.registerControlMode("Controlv", keyControlObject);
  }

  displayOutHandler = displayOutList => {
    if (
      displayOutList &&
      displayOutList.length > 0 &&
      this.stateUpdateHandler
    ) {
      this.stateUpdateHandler(displayOutList, 2);
    }
  };

  handleGesture(gestureType, event) {
    switch (gestureType) {
      case GestureType.Swipe:
        this.switchView();
        break;
      default:
        console.log(gestureType, event);
        this.displayOutHandler([gestureType]);
        break;
    }
  }

  setCurrentView(index) {
    if (this.currentView) {
      this.currentView.stop();
    }
    const { gl, shaderFac: { shaderPrograms }, userControl, canvas } = this;
    const inObj = {
      gl,
      programs: shaderPrograms,
      renderConfigLight,
      renderConfigNoLight,
      renderConfig2D,
      userControl
    };
    const preRender = () => this.clear(); // Find a good logic for clearing screen
    const CustomCanvasView = this.viewList[index];
    this.currentView = new CustomCanvasView(canvas, preRender, inObj);
    this.currentViewIndex = index;
    this.createScene();
    this.displayOutHandler([this.currentView.name]);
  }

  createScene() {
    // Reconstruct nodes every time this methode is called
    if (this.currentView) {
      this.currentView.createScene();
      this.currentView.start();
    }
  }
}
