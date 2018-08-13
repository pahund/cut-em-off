export default path =>
    new Promise(resolve => {
        const image = document.createElement('img');
        image.src = path;
        image.onload = () => resolve(image);
    });
