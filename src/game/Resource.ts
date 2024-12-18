import { DefaultLoader, ImageSource } from "excalibur";

export const Resource = {
  player: new ImageSource("player.png"),
  gava: new ImageSource("gava_f_95.png"),
  superGava: new ImageSource("super_gava.png"),
  borg: new ImageSource("borg_a_60.png"),
} as const;

// TODO: change this to custom loader
export const loader = new DefaultLoader();
for (let res of Object.values(Resource)) {
  loader.addResource(res);
}
