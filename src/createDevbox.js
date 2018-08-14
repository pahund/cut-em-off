export default () => {
    if (process.env.NODE_ENV === 'production') {
        return {};
    }
    const div = document.createElement('div');
    div.style.cssText = `
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 5px;
        color: lime;
        width: 100vw;
        background-color: black;
        font-family: monospace;
    `;
    document.body.appendChild(div);
    return div;
};
