// MODELS
import { DIM } from '../constants';

export type ServerGameConfig = Required<
  Pick<Phaser.Types.Core.GameConfig, 'width' | 'height' | 'backgroundColor'>
>;

export interface ServerSceneConfig {
  age: '5-14' | '15-19' | '20-39';
  eirHeight: number;
  // TODO Define all dynamic parameters.
}

// EXAMPLE SCENE CONFIG
const child: ServerSceneConfig = {
  age: '5-14',
  eirHeight: 90
};
const youth: ServerSceneConfig = {
  age: '15-19',
  eirHeight: 160
};

const grownUp: ServerSceneConfig = {
  age: '20-39',
  eirHeight: 175
};

// ALL SCENE CONFIG
export const SCENE_CONFIG = {
  child,
  youth,
  grownUp
} as const;

// EXAMPLE GAME CONFIG
const halfScreen: ServerGameConfig = {
  width: DIM.W,
  height: DIM.H,
  backgroundColor: '#125555'
};

const fullScreen: ServerGameConfig = {
  width: DIM.W,
  height: DIM.FH,
  backgroundColor: '#125555'
};

// ALL GAME CONFIG
export const GAME_CONFIG = {
  halfScreen,
  fullScreen
} as const;
