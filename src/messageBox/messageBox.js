class MessageBox {
    constructor() {
        this.timeoutHandler = null;
        this.div = document.createElement('div');
        this.div.style.cssText = `
background-color: rgba(0,0,0,0.3);
font-size: 3em;
font-weight: bold;
align-items: center;
justify-content: center;
display: flex;
color: white;
opacity: 0;
position: absolute;
top: 0;
left:0;
width: 100vw;
height: 100vh;
text-align: center;
pointer-events: none;
transition: background-color 3s ease-out, color 3s ease-out;
text-transform: uppercase;
font-family: monospace;
    `;
        const wrapper = document.getElementById('wrapper');
        wrapper.appendChild(this.div);
    }

    show(message) {
        clearTimeout(this.timeoutHandler);
        this.div.style.transition = '3s';
        this.div.innerHTML = `<div>${message}</div>`;
        this.div.style.opacity = 1;
    }

    flash(message) {
        clearTimeout(this.timeoutHandler);
        this.div.style.transition = '0.5s';
        this.div.innerHTML = `<div>${message}</div>`;
        this.div.style.opacity = 1;
        this.timeoutHandler = setTimeout(() => (this.div.style.opacity = 0), 500);
    }

    clear() {
        clearTimeout(this.timeoutHandler);
        this.div.style.transition = '0.5s';
        this.div.style.opacity = 0;
    }
}
export default new MessageBox();
