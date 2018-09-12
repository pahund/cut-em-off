function conv(c) {
    const cc = c.charCodeAt(0);
    return cc === 32 ? 0 : cc >= 97 ? cc - 86 : cc - 47;
}

export default hex => hex.split('').map(c => conv(c));
