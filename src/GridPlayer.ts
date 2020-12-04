import { Direction } from "./Direction";

interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
}

export class GridPlayer {
  private directionToFrameRow: { [key in Direction]?: number } = {
    [Direction.DOWN]: 0,
    [Direction.LEFT]: 1,
    [Direction.RIGHT]: 2,
    [Direction.UP]: 3,
  };
  public lastFootLeft = false;
  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    private characterIndex: number,
    startTilePosX: number,
    startTilePosY: number,
    private tileSize: number,
    private spriteFrameHeight: number,
    private scaleFactor: number,
    private charsInRow: number,
    private framesPerCharRow: number,
    private framesPerCharCol: number
  ) {
    this.sprite.scale = this.scaleFactor;
    this.sprite.setPosition(
      startTilePosX * tileSize + this.playerOffsetX(),
      startTilePosY * tileSize + this.playerOffsetY()
    );
    this.sprite.setFrame(this.framesOfDirection(Direction.DOWN).standing);
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter();
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }

  setWalkingFrame(direction: Direction): void {
    const frameRow = this.framesOfDirection(direction);
    this.sprite.setFrame(
      this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot
    );
  }

  setStandingFrame(direction: Direction): void {
    if (this.isCurrentFrameStanding(direction)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this.sprite.setFrame(this.framesOfDirection(direction).standing);
  }

  getTilePos(): Phaser.Math.Vector2 {
    const x =
      (this.sprite.getCenter().x - this.playerOffsetX()) / this.tileSize;
    const y =
      (this.sprite.getCenter().y - this.playerOffsetY()) / this.tileSize;
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y));
  }

  private isCurrentFrameStanding(direction: Direction): boolean {
    return (
      Number(this.sprite.frame.name) !=
      this.framesOfDirection(direction).standing
    );
  }

  private playerOffsetX(): number {
    return this.tileSize / 2;
  }
  private playerOffsetY(): number {
    return -((this.spriteFrameHeight * this.scaleFactor) % this.tileSize) / 2;
  }

  private framesOfDirection(direction: Direction): FrameRow {
    const playerCharRow = Math.floor(this.characterIndex / this.charsInRow);
    const playerCharCol = this.characterIndex % this.charsInRow;
    const framesInRow = this.charsInRow * this.framesPerCharRow;
    const framesInSameRowBefore = this.framesPerCharRow * playerCharCol;
    const rows =
      this.directionToFrameRow[direction] +
      playerCharRow * this.framesPerCharCol;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      leftFoot: startFrame,
      standing: startFrame + 1,
      rightFoot: startFrame + 2,
    };
  }
}
