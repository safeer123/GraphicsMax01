import NodeTypesWO from "../../WorldObject/constants";

const NodeTypes = {
  ABSTRACT_CAMERA: "ABSTRACT_CAMERA",
  CAMERA_SPHERICAL_PATH: "CAMERA_SPHERICAL_PATH",
  ONE_EYE_CAMERA: "ONE_EYE_CAMERA",
  TWO_EYES: "TWO_EYES",
  ABSTRACT_LIGHT: "ABSTRACT_LIGHT",
  GLOWING_SPHERE: "GLOWING_SPHERE",
  SUN_OBJECT: "SUN_OBJECT",
  COMPOSITE_CUSTOM_SHAPES: "COMPOSITE_CUSTOM_SHAPES"
};

export default { ...NodeTypesWO, ...NodeTypes };
