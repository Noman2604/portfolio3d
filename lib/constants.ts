export const ROOM = {
  width: 26, // x axis: -13 .. 13
  depth: 20, // z axis: -10 .. 10
  height: 6,
};

export const ROOM_BOUNDS = {
  minX: -ROOM.width / 2 + 0.6,
  maxX: ROOM.width / 2 - 0.6,
  minZ: -ROOM.depth / 2 + 0.6,
  maxZ: ROOM.depth / 2 - 0.6,
};

export const EYE_HEIGHT = 1.6;
export const SPAWN_POSITION: [number, number, number] = [0, EYE_HEIGHT, 7.5];
export const MOVE_SPEED = 4.2;
export const RUN_MULTIPLIER = 1.7;
