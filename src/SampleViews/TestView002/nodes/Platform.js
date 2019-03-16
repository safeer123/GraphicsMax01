import { WOFACTORY, OBJ0, WorldObject } from "../../../graphics";

const PlatformType = "PlatformType";

class Carpet extends WorldObject {
  constructor(inObj) {
    super(inObj, []);
  }

  defineGeometry() {
    const baseY = -2;
    const p1 = [-100, 0, 10];
    const p2 = [-100, 0, -10];
    const p3 = [100, 0, -10];
    const p4 = [100, 0, 10];
    const offset = 5;
    const baseP1 = [-100, baseY, 10 + offset];
    const baseP2 = [-100, baseY, -(10 + offset)];
    const baseP3 = [100, baseY, -(10 + offset)];
    const baseP4 = [100, baseY, 10 + offset];
    const TrackColor = [0.04, 0.14, 0.27, 1];
    const DiscColor = [0.2, 0.25, 0.3, 1];
    this.carpetSurface = new OBJ0.QuadSurface3D(p1, p2, p3, p4, {
      divCount1: 20,
      divCount2: 4,
      color: TrackColor
    });
    this.sideSurface1 = new OBJ0.QuadSurface3D(p4, baseP4, baseP1, p1, {
      divCount1: 20,
      divCount2: 1,
      color: DiscColor
    });
    this.sideSurface2 = new OBJ0.QuadSurface3D(p2, baseP2, baseP3, p3, {
      divCount1: 20,
      divCount2: 1,
      color: DiscColor
    });

    const radius = 100;
    this.discSurface = new OBJ0.Sector3D(radius, {
      dThetaCount: 100,
      dRCount: 10,
      color: DiscColor,
      getColor: (i, j, options) => {
        const { color, deltaColor } = options;
        const evenI = i % 2 === 0;
        const evenJ = j % 2 === 0;
        const colorPlus = color.map(c => c + deltaColor);
        return evenI || evenJ ? color : colorPlus;
      }
    });
    this.discSurface.model().translate(0, baseY, 0);
    return [
      this.carpetSurface,
      this.sideSurface1,
      this.sideSurface2,
      this.discSurface
    ];
  }
}

WOFACTORY.registerType(PlatformType, Carpet);

export default PlatformType;
