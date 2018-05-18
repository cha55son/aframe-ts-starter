import 'aframe'
import 'aframe-physics-system'

import { Body } from 'cannon'
import Entity = AFrame.Entity

import './components/LinearMove'

export interface PhysicsEntity extends Entity<any> {
  body: Body
}
