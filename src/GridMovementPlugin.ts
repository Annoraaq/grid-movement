import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { GridPlayer } from "./GridPlayer";

export type TileSizePerSecond = number;

export interface Config {
  speed?: TileSizePerSecond;
  tileSize: number;
  spriteFrameWidth: number;
  spriteFrameHeight: number;
  scaleFactor: number;
  charsInRow: number;
  framesPerCharRow: number;
  framesPerCharCol: number;
}

export class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;
  private config: Config;
  constructor(public scene, pluginManager) {
    super(scene, pluginManager);
  }

  boot() {
    var eventEmitter = this.systems.events;

    eventEmitter.on("update", this.update, this);
  }

  create(
    playerSprite: Phaser.GameObjects.Sprite,
    tilemap: Phaser.Tilemaps.Tilemap,
    config: Config
  ) {
    this.config = { speed: 4, ...config };
    this.gridPhysics = new GridPhysics(
      new GridPlayer(
        playerSprite,
        6,
        8,
        8,
        this.config.tileSize,
        this.config.spriteFrameHeight,
        this.config.scaleFactor,
        this.config.charsInRow,
        this.config.framesPerCharRow,
        this.config.framesPerCharCol
      ),
      tilemap,
      this.config.tileSize,
      this.config.speed
    );
    this.gridControls = new GridControls(this.scene.input, this.gridPhysics);
  }

  update(_time: number, delta: number) {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }
}
