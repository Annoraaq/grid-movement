import * as Phaser from "phaser";
import { Controls } from "./Controls";
import * as GridMovementPlugin from "phaser-grid-movement-plugin";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export class GameScene extends Phaser.Scene {
  static readonly CANVAS_WIDTH = 720;
  static readonly CANVAS_HEIGHT = 528;

  private gridMovementPlugin: GridMovementPlugin.GridMovementPlugin;
  private controls: Controls;

  constructor() {
    super(sceneConfig);
    console.log(GridMovementPlugin);
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
    playerSprite.scale = 1.5;
    playerSprite.setDepth(2);
    this.cameras.main.startFollow(playerSprite);

    this.gridMovementPlugin.create(playerSprite, cloudCityTilemap, {
      startPosition: new Phaser.Math.Vector2(8, 8),
    });

    this.controls = new Controls(this.input, this.gridMovementPlugin);
  }

  public update(_time: number, _delta: number) {
    this.controls.update();
  }

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
