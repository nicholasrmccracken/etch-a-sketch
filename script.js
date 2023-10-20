window.addEventListener('DOMContentLoaded', () => createGrid(16));

const grid = document.querySelector('#grid');
grid.addEventListener('mouseover', (e) => paintGrid(e.target));

sizePositionMapping = {
    'top': 16,
    'right': 32,
    'left': 64,
    'bottom': 48
};

const sizeController = document.querySelector('#size-controller');
sizeController.addEventListener('click', (e) => rotateMarker(e.button, sizeController.children[0]));

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => createGrid(sizePositionMapping[sizeController.children[0].getAttribute('data-position')]));

function rotateMarker(mouseButton, marker) {
    const positions = ['top', 'right', 'bottom', 'left']
    let currentPositionIndex = positions.indexOf(marker.getAttribute('data-position'));

    if (mouseButton === 0) {
        currentPositionIndex = (currentPositionIndex + 1) % 4;
    } else if (mouseButton === 2) {
        currentPositionIndex = (currentPositionIndex - 1 + 4) % 4;
    }

    const updatedPosition = positions[currentPositionIndex];
    marker.setAttribute('data-position', updatedPosition);
    setMarkerPosition(marker, updatedPosition);
    createGrid(sizePositionMapping[updatedPosition])
}

function setMarkerPosition(marker, position) {
    resetPosition(marker);

    switch (position) {
        case 'top':
            marker.style.left = '40px';
        break;

        case 'left':
            marker.style.top = '40px';
        break;

        case 'right':
            marker.style.left = '80px';
            marker.style.top = '40px';
        break;

        case 'bottom':
            marker.style.left = '40px';
            marker.style.top = '80px';
        break;
    }
}

function resetPosition(marker) {
    marker.style.top = '0';
    marker.style.left = '0';
}

function paintGrid(cell) {
    cell.style.backgroundColor = 'black';
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
