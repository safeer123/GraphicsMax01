import { m4, Matrix4 } from "../../lib/m4";
import { SHADER_VARS } from "../../ShaderFactory/constants";
import SceneSetter from "../SceneSetter";
import OBJ0 from "../../ObjectGroup3D/objects";
import config from "./config";
import SceneSetterTypes from "../constants/SceneSetterTypes";

export default class Camera extends SceneSetter {
  constructor(inObj, configList = []) {
    super(inObj, [config, ...configList]);
    this.setSceneSetterType(SceneSetterTypes.CAMERA_SCENE_SETTER);

    if (config.CamConfig) {
      this.camConfig = config.CamConfig;
    }

    // Here the model matrix is exactly the lookAt matrix
    this.setPropertyGetter("model_matrix", () => {
      const cameraPosition = this.getProperty("camera_position");
      const targetPosition = this.getProperty("target_position");
      const upVector = this.getProperty("up_vector");
      const lookAtMatrix = m4.lookAt(cameraPosition, targetPosition, upVector);
      this.modelMatrix.setMatrix(lookAtMatrix);
      return this.modelMatrix.matrix();
    });

    this.setPropertyGetter(
      "projection_view_matrix",
      this.getProjectionViewMatrix.bind(this)
    );
  }

  setupScene(objRenderer) {
    objRenderer.setUniformGetter(SHADER_VARS.u_viewProjection, () =>
      this.getProperty("projection_view_matrix")
    );
  }

  // Needed for only camera objects
  getProjectionViewMatrix() {
    const { fieldOfViewRadians, zNear, zFar } = this.camConfig;
    const viewportObj = this.getProperty("viewport");
    const aspect =
      this.objRenderer.getCanvasAspect() *
      viewportObj.width /
      viewportObj.height;

    const projectionMatrix = m4.perspective(
      fieldOfViewRadians,
      aspect,
      zNear,
      zFar
    );

    const cameraMatrix = this.getProperty("world_matrix");
    const viewMatrix = m4.inverse(cameraMatrix);

    // Compute a view projection matrix
    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    return viewProjectionMatrix;
  }
}
