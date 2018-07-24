import WorldObject from "../../../../WorldObject";
import OBJ0 from "../../../../Geometry/Objects3D/objects";
import WOFACTORY from "../../../../WorldObjectStore/Factory";
import config from "./config";

const Obj2Type = "Obj2Type";

class Shape2 extends WorldObject {
  constructor(inObj) {
    super(inObj, [config]);
    this.modelMatrix.translate(-60, 0, 1);
  }

  defineGeometry() {
    this.enableNormals = true;
    const color = [0.7, 0.6, 0.6, 1];
    const hemiSphere1 = new OBJ0.Sphere3D(2, {
      startTheta: 0.5 * Math.PI,
      dThetaCount: 10,
      deltaColor: 0.1,
      color
    });
    hemiSphere1.model().translate(0, 2, 0);

    const hemiSphere2 = new OBJ0.Sphere3D(2, {
      endTheta: 0.5 * Math.PI,
      dThetaCount: 10,
      deltaColor: 0.1,
      color
    });
    hemiSphere2.model().translate(0, 5, 0);

    const cylinder3D = new OBJ0.CylinderSurface3D(2, 3, {
      deltaColor: 0.1,
      color
    });
    cylinder3D.model().translate(0, 2, 0);
    return [hemiSphere1, cylinder3D, hemiSphere2];
  }
}

WOFACTORY.registerType(Obj2Type, Shape2);

export default Obj2Type;
