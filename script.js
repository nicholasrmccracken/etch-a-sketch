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
    switch (position) {
        case 0:
            selector.style.top = '0';
            selector.style.left = '40px';
        break;

        case 1:
            selector.style.top = '40px';
            selector.style.left = '80px';
        break;

        case 2:
            selector.style.top = '80px';
            selector.style.left = '40px';
        break;

        case 3:
            selector.style.top = '40px';
            selector.style.left = '0';
        break;
    }
}

function paintGrid(cell) {
    switch (colorController.children[0].getAttribute('data-state')) {
        case 'black':
            cell.style.backgroundColor = 'black';
        break;

        case 'shade':
            cell.style.backgroundColor = 'black';
        break;

        case 'rainbow':
            cell.style.backgroundColor = randomizeColor();
        break;

        case 'erase':
            cell.style.backgroundColor = '';
        break;
    }
}

function randomizeColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    return `rgb(${randomR}, ${randomG}, ${randomB})`
}

function createGrid(size) {
    grid.innerHTML = '';
    const numCells = size ** 2, cellDimension = grid.clientWidth / size;
    const corners = {
        0: (cell) => {
            cell.style.borderTopLeftRadius = '10px';
        },
        [size - 1]: (cell) => {
            cell.style.borderTopRightRadius = '10px';
        },
        [numCells - size]: (cell) => {
            cell.style.borderBottomLeftRadius = '10px';
        },
        [numCells - 1]: (cell) => {
            cell.style.borderBottomRightRadius = '10px';
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
