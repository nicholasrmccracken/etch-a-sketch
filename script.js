window.addEventListener('DOMContentLoaded', () => createGrid(16));

const grid = document.querySelector('#grid');
grid.addEventListener('mouseover', (e) => paintGrid(e.target));

const sizeController = document.querySelector('#size-controller');
sizeController.addEventListener('click', () => {
    const updatedSize = parseInt(rotateSelected(sizeController.children[0], ['16', '32', '48', '64']));
    createGrid(updatedSize);
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    const currentSize = parseInt(sizeController.children[0].getAttribute('data-state'));
    createGrid(currentSize);
});

const colorController = document.querySelector('#color-controller');
colorController.addEventListener('click', () => {
    rotateSelected(colorController.children[0], ['black', 'shade', 'rainbow', 'erase'])
});

function rotateSelected(selector, options) {
    const state = selector.getAttribute('data-state')
    const updatedIndex = (options.indexOf(state) + 1) % options.length;
    const updatedOption = options[updatedIndex];

    setSelectedPosition(selector, updatedIndex);
    selector.setAttribute('data-state', updatedOption);
    
    return updatedOption;
}

function setSelectedPosition(selector, position) {
    const middle = Math.floor(sizeController.clientWidth / 2) - Math.floor(sizeController.children[0].clientWidth / 2);
    const end = sizeController.clientWidth - sizeController.children[0].clientWidth;

    switch (position) {
        case 0:
            selector.style.top = '0';
            selector.style.left = middle + 'px';
        break;

        case 1:
            selector.style.top = middle + 'px';
            selector.style.left = end + 'px';
        break;

        case 2:
            selector.style.top = end + 'px';
            selector.style.left = middle + 'px';
        break;

        case 3:
            selector.style.top = middle + 'px';
            selector.style.left = '0';
        break;
    }
}

function paintGrid(cell) {
    console.log(cell.style.backgroundColor);
    switch (colorController.children[0].getAttribute('data-state')) {
        case 'black':
            cell.style.backgroundColor = 'rgb(0, 0, 0)';
        break;

        case 'shade':
            cell.style.backgroundColor = shadeColor(cell.style.backgroundColor);
        break;

        case 'rainbow':
            cell.style.backgroundColor = randomizeColor();
        break;

        case 'erase':
            cell.style.backgroundColor = '';
        break;
    }
}

function shadeColor(color) {
    if (color === '') color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');

    let RGB = color.substring(4, color.length - 1).split(',');
    RGB = RGB.map((value) => Math.max(0, parseInt(value.trim()) - 25));

    return `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
}

function randomizeColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function createGrid(size) {
    grid.innerHTML = '';
    const numCells = size ** 2, cellDimension = grid.clientWidth / size;
    const corners = {
        0: (cell) => {
            cell.style.borderTopLeftRadius = `10px`;
        },
        [size - 1]: (cell) => {
            cell.style.borderTopRightRadius = `10px`;
        },
        [numCells - size]: (cell) => {
            cell.style.borderBottomLeftRadius = `10px`
        },
        [numCells - 1]: (cell) => {
            cell.style.borderBottomRightRadius = `10px`;
        }
    };

    for (let i = 0; i < numCells; i++) {
        cell = document.createElement('div');
        cell.style.width = cellDimension + "px";
        cell.style.aspectRatio = 1;

        if (i in corners) corners[i](cell); 

        grid.appendChild(cell);
    }
}
