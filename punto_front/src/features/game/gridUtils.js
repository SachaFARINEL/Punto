const createGridArray = () => {
    const grid = [];

    for (let y = 0; y < 11; y++) {
        for (let x = 0; x < 11; x++) {
            grid.push({
                position: { x, y }
            });
        }
    }

    return grid;
};

export { createGridArray };