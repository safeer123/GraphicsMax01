import renderConfigNoLight from "../../ObjectGroup3D/renderConfig";
import renderConfigLight from "../../ObjectGroup3D/renderConfigLight";
import renderConfig2D from "../../ObjectGroup2D/renderConfig";
import ViewHolder from "../../SceneBuilder/ViewHolder";
// import { GestureType } from "../../../constants/Gesture";

import SplitScreenView from "./SplitScreenView";
import SingleNodeView from "./SingleNodeView";
import TwoEyesView from "./TwoEyesView";

// TestView001 ViewHolder (Smart Graphics Layer)
export default class TestView001 extends ViewHolder {
  // Construct canvas and webgl context
  constructor(wrapperElem) {
    super(wrapperElem);
    // this.mainScene
  }

  createScene() {
    // This should be How we rebuild the scene
    if (this.currentView) {
      this.currentView.createScene();
      this.currentView.start();
    }
  }
/* eslint-disable */
  getViewList() {
    return[
    TwoEyesView,
    SplitScreenView,
    SingleNodeView
  ];
  }
  /* eslint-enable */
  createCanvasView(CustomCanvasView) {
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
    return new CustomCanvasView(canvas, preRender, inObj);
  }
}