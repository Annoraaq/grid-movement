import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { GridPlayer } from "./GridPlayer";

export type TileSizePerSecond = number;

export interface Config {
  speed?: TileSizePerSecond;
}

export class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;
  private config: Config;
  constructor(
    public scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager
  ) {
    super(scene, pluginManager);
  }

  boot() {
    var eventEmitter = this.systems.events;

    eventEmitter.on("update", this.update, this);
  }

  create(
    playerSprite: Phaser.GameObjects.Sprite,
    tilemap: Phaser.Tilemaps.Tilemap,
    config?: Config
  ) {
    const tilemapScale = tilemap.layers[0].tilemapLayer.scale;
    const tileSize = tilemap.tileWidth * tilemapScale;
    this.config = { speed: 4, ...config };
    this.gridPhysics = new GridPhysics(
      new GridPlayer(playerSprite, 6, 8, 8, tileSize),
      tilemap,
      tileSize,
      this.config.speed
    );
    this.gridControls = new GridControls(this.scene.input, this.gridPhysics);
  }

  update(_time: number, delta: number) {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }
}
