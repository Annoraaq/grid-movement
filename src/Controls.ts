export class Controls {
  constructor(
    private input: Phaser.Input.InputPlugin,
    private gridMovementPlugin
  ) {}

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.gridMovementPlugin.movePlayerLeft();
    } else if (cursors.right.isDown) {
      this.gridMovementPlugin.movePlayerRight();
    } else if (cursors.up.isDown) {
      this.gridMovementPlugin.movePlayerUp();
    } else if (cursors.down.isDown) {
      this.gridMovementPlugin.movePlayerDown();
    }
  }
}
