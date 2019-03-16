import { WorldObject, OBJ0, WOFACTORY } from "../../../../graphics";
import config from "./config";

const Obj1Type = "Obj1Type";

class CylinderShape extends WorldObject {
  constructor(inObj) {
    super(inObj, [config]);
    this.model().translate(-80, 0, -1);
  }

  defineGeometry() {
    this.cylinder3D = new OBJ0.Cylinder3D(2, 5, {
      deltaColor: 0.1,
      getColor: (i, j, options) => {
        const { color, deltaColor, dYCount } = options;
        const changeColWhen = (i + j) % 3 === 0;
        const colorPlus = color.map(c => c + deltaColor);
        return changeColWhen ? color : colorPlus;
      }
    });
    this.cylinder3D.model().translate(0, 2.5, 0);
    this.axis = new OBJ0.Cylinder3D(0.5, 10, {
      deltaColor: 0.01,
      color: [0.4, 0.4, 0.5, 1]
    });
    return [this.cylinder3D, this.axis];
  }
}

WOFACTORY.registerType(Obj1Type, CylinderShape);

export default Obj1Type;
