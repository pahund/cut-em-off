/* creates canvas moveTo and lineTo commands from arrays; doing this mostly to save a couple of bytes */
export default (ctx, data) => data.forEach(([draw, x, y]) => ctx[draw ? 'lineTo' : 'moveTo'](x, y));
