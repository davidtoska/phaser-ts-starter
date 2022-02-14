import 'phaser';
import {
  GAME_CONFIG,
  SCENE_CONFIG,
  ServerGameConfig,
  ServerSceneConfig
} from './from-server/dynamic-parameters';
import { DIM } from './constants';

export default class Demo extends Phaser.Scene {
  // TODO Maybe find a shorter name for this property?
  dynamicParameters: ServerSceneConfig;
  constructor(config: ServerSceneConfig) {
    super('demo');
    this.dynamicParameters = config;
    console.log(config);
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('libs', 'assets/libs.png');
    this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
    this.load.glsl('stars', 'assets/starfields.glsl.js');
  }

  create() {
    console.log(this);
    this.add.shader('RGB Shift Field', 0, 0, DIM.W, DIM.H).setOrigin(0);

    this.add.shader('Plasma', 0, 412, DIM.W, 172).setOrigin(0);

    this.add.image(400, 300, 'libs');

    const logo = this.add.image(400, 70, 'logo');

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    // TODO update animations
    //console.log(time, delta);
  }
}

/**
 * Lazy-load Scenes on demand from host application. This function will be the public-api
 * of your library.
 * @param serverGameConfig
 * @param serverSceneConfig
 */
const gameFactory = (
  serverGameConfig: ServerGameConfig,
  serverSceneConfig: ServerSceneConfig,
  hostHTMLElementId: string
): Phaser.Game => {
  const demoScene = new Demo(serverSceneConfig);
  const defaultGameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: hostHTMLElementId,
    scene: demoScene
  };

  const gameConfig = { ...defaultGameConfig, ...serverGameConfig };
  return new Phaser.Game(gameConfig);
};

/**
 * This is how the host application can embed parameterized scene:
 * This function-call will render the demo-scene.
 */
const game = gameFactory(
  GAME_CONFIG.halfScreen,
  SCENE_CONFIG.youth,
  'phaser-target'
);
