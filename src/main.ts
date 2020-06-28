import * as Phaser from "phaser";
import { ChessboardControls } from "./ChessboardControls";
import { ChessboardPhysics } from "./ChessboardPhysics";
import { Player } from "./Player";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

export class GameScene extends Phaser.Scene {
  static readonly CANVAS_WIDTH = 720;
  static readonly CANVAS_HEIGHT = 528;

  static readonly TILE_SIZE = 48;

  private chessboardControls: ChessboardControls;
  private chessboardPhysics: ChessboardPhysics;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap
        .createStaticLayer(i, "Cloud City", 0, 0)
        .setOrigin(0);
      layer.setDepth(i);
      layer.scale = 3;
    }

    const playerSprite = this.add.sprite(0, 0, "player").setOrigin(0);
    playerSprite.setDepth(2);

    this.cameras.main.startFollow(playerSprite);

    this.chessboardPhysics = new ChessboardPhysics(
      new Player(playerSprite, 6, 8, 8),
      cloudCityTilemap
    );
    this.chessboardControls = new ChessboardControls(
      this.input,
      this.chessboardPhysics
    );
  }

  public update(_time: number, delta: number) {
    this.chessboardControls.update();
    this.chessboardPhysics.update(delta);
  }

  public preload() {
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: Player.SPRITE_FRAME_WIDTH,
      frameHeight: Player.SPRITE_FRAME_HEIGHT,
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
  scale: {
    width: GameScene.CANVAS_WIDTH,
    height: GameScene.CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  parent: "game",
  backgroundColor: "#48C4F8",
};

export const game = new Phaser.Game(gameConfig);
