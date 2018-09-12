export default () => new Promise(resolve => document.addEventListener('keydown', resolve, { once: true }));
