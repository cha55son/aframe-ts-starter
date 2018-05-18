import { Vector3 } from 'three'
import Component = AFrame.Component

interface LinearMove extends Component {
  distance: number
  startPos: Vector3
  endPos: Vector3
  moveSpeed: number
  lerpAlpha: number
}

AFRAME.registerComponent('linear-move', {
  dependencies: ['position', 'rotation'],

  init(): void {
    this.distance = 10
    this.startPos = new Vector3()
    this.endPos = new Vector3()
    this.moveSpeed = 0.5 // 0-1
    this.lerpAlpha = 0

    this.startPos.copy(this.el.object3D.position)
    const zDir = new Vector3()
    this.el.object3D.getWorldDirection(zDir)
    zDir.normalize().multiplyScalar(this.distance)
    this.endPos.addVectors(this.startPos, zDir)
  },

  tick(time: number, timeDelta: number): void {
    const currentPos = this.el.object3D.position
    const distance = currentPos.distanceTo(this.endPos)
    if (distance < 0.1) {
      const copyStartPos = new Vector3().copy(this.startPos)
      this.startPos.copy(this.endPos)
      this.endPos.copy(copyStartPos)
      this.lerpAlpha = 0
    }
    this.lerpAlpha += this.moveSpeed * timeDelta / 1000
    this.el.object3D.position.lerpVectors(this.startPos, this.endPos, this.lerpAlpha)
  }
} as LinearMove)
