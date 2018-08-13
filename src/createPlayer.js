/* global kontra */

export default () =>
    kontra.sprite({
        x: 400,
        y: 300,
        width: 6, // we'll use this later for collision detection
        render() {
            this.context.lineWidth = 3;
            this.context.strokeStyle = '#75a042';
            this.context.fillStyle = '#365b1d';
            this.context.beginPath();
            // draw a triangle
            this.context.moveTo(this.x - 15, this.y + 9);
            this.context.lineTo(this.x, this.y - 36);
            this.context.lineTo(this.x + 15, this.y + 9);

            this.context.closePath();
            this.context.fill();
            this.context.stroke();
        }
    });
