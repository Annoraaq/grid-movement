import * as Phaser from "phaser";
import { Config, GridMovementPlugin } from "./GridMovementPlugin";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export class GameScene extends Phaser.Scene {
  static readonly CANVAS_WIDTH = 720;
  static readonly CANVAS_HEIGHT = 528;

  static readonly TILE_SIZE = 48;

  private gridMovementPlugin: GridMovementPlugin;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createStaticLayer(i, "Cloud City", 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }
    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);
    this.cameras.main.startFollow(playerSprite);

    const config: Config = {
      tileSize: GameScene.TILE_SIZE,
      spriteFrameWidth: 52,
      spriteFrameHeight: 72,
      scaleFactor: 1.5,
      charsInRow: 4,
      framesPerCharRow: 3,
      framesPerCharCol: 4,
    };
    this.gridMovementPlugin.create(playerSprite, cloudCityTilemap, config);
  }

  public update(_time: number, _delta: number) {}

  public preload() {
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 52,
      frameHeight: 72,
    });
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: GameScene,
  plugins: {
    scene: [
      {
        key: "gridMovementPlugin",
        plugin: GridMovementPlugin,
        mapping: "gridMovementPlugin",
      },
    ],
  },
  scale: {
    width: GameScene.CANVAS_WIDTH,
    height: GameScene.CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  parent: "game",
  backgroundColor: "#48C4F8",
};

export const game = new Phaser.Game(gameConfig);
