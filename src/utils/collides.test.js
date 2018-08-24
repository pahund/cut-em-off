import collides from './collides';

test.each([
    [{ x: 2, y: 2, collisionRadius: 2 }, { x: 6, y: 6, collisionRadius: 2 }, false],
    [{ x: 3, y: 3, collisionRadius: 2 }, { x: 5, y: 5, collisionRadius: 2 }, true]
])(
    'When I call the function “collides” with sprite 1 %j and sprite 2 %j, the result is %s',
    (sprite1, sprite2, expected) => expect(collides(sprite1, sprite2)).toEqual(expected)
);
