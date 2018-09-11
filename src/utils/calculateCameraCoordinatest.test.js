import calculateCameraCoordinates from './calculateCameraCoordinates.js';

test.each([[8, 9, 450, 650]])(
    'When I call the function with col %n and row %n, then the result is sx %n and sy %n',
    (col, row, sx, sy) => expect(calculateCameraCoordinates({ col, row })).toEqual({ sx, sy })
);
