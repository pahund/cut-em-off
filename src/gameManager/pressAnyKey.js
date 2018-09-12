export default () =>
    new Promise(resolve => setTimeout(() => document.addEventListener('keydown', resolve, { once: true }), 1000));
