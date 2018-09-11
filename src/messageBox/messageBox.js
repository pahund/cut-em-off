class MessageBox {
    constructor() {
        this.timeoutHandler = null;
        this.div = document.createElement('div');
        this.div.setAttribute('id', 'mbx');
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
