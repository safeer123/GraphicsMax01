const netWidth = 1;
const gapSize = 0.0001;
const pupillaryDistance = 0.5;
const LayoutConfig1 = {
  SceneConfigs: [
    {
      name: "leftEyeScene",
      viewport: {
        x: 0,
        y: 0,
        width: netWidth * 0.5 - gapSize * 0.5,
        height: 1
      },
      camera: "Cam1"
    },
    {
      name: "rightEyeScene",
      viewport: {
        x: netWidth * 0.5 + gapSize * 0.5,
        y: 0,
        width: netWidth * 0.5 - gapSize * 0.5,
        height: 1
      },
      camera: "Cam2"
    }
  ],

  Cameras: [
    {
      name: "Cam1",
      type: "default",
      position: [pupillaryDistance * 0.5, 20, -40],
      target: [0, 0, 0],
      up: [0, 1, 0]
    },
    {
      name: "Cam2",
      type: "default",
      position: [-pupillaryDistance * 0.5, 20, -40],
      target: [0, 0, 0],
      up: [0, 1, 0]
    }
  ]
};

export { LayoutConfig1 };
