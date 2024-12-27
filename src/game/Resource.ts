import { DefaultLoader, ImageSource, SpriteSheet } from "excalibur";
import playerPath from "/player.png";
import gavaSheet from "/gava_spritesheet.png";
import gava from "/gava_f_95.png";
import borg from "/borg_a_60.png";
import superGava from "/super_gava.png";
import borgSheet from "/borg_spritesheet.png";
import superGavaSheet from "/supergava_spritesheet.png";

export const Resource = {
  player: new ImageSource(playerPath),
  gava: new ImageSource(gava),
  superGava: new ImageSource(superGava),
  borg: new ImageSource(borg),
  gavaSheet: new ImageSource(gavaSheet),
  borgSheet: new ImageSource(borgSheet),
  superGavaSheet: new ImageSource(superGavaSheet),
} as const;

// TODO: change this to custom loader
export const loader = new DefaultLoader();
for (let res of Object.values(Resource)) {
  loader.addResource(res);
}
