import WorldObject from "../../WorldObject";
import config from "./config";

// Defines a scene setter
// This contributes to form the entire scene
export default class SceneSetter extends WorldObject {
  constructor(objRenderer, keyControl, configList = []) {
    super(objRenderer, keyControl, [config, ...configList]);
    this.sceneSetterType = null; // to be defined by derived class
  }

  setSceneSetterType(type) {
    this.sceneSetterType = type;
  }

  // Mandatory method
  // This gets invoked at runtime while rendering each object
  setupScene = objRenderer => {
    // To be overridden by the derived class
    throw Error("Scene setter does not have mandatory setupScene method.");
  };
}