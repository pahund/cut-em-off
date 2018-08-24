export default (sprite1, sprite2) => {
    const dx = sprite1.x - sprite2.x;
    const dy = sprite1.y - sprite2.y;
    return Math.sqrt(dx * dx + dy * dy) < sprite1.collisionRadius + sprite2.collisionRadius;
};
