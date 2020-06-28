import { Direction } from "./Direction";
import { ChessboardPhysics } from "./ChessboardPhysics";

export class ChessboardControls {
  constructor(
    private input: Phaser.Input.InputPlugin,
    private chessboardPhysics: ChessboardPhysics
  ) {}

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.chessboardPhysics.movePlayer(Direction.LEFT);
    } else if (cursors.right.isDown) {
      this.chessboardPhysics.movePlayer(Direction.RIGHT);
    } else if (cursors.up.isDown) {
      this.chessboardPhysics.movePlayer(Direction.UP);
    } else if (cursors.down.isDown) {
      this.chessboardPhysics.movePlayer(Direction.DOWN);
    }
  }
}
