import { DefaultLoader, ImageSource } from "excalibur";

export const Resource = {
  PlayerImg: new ImageSource("player.png"),
  Gava: new ImageSource("gava.png"),
} as const;

// TODO: change this to custom loader
export const loader = new DefaultLoader();
for (let res of Object.values(Resource)) {
  loader.addResource(res);
}
