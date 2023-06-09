let isDown = false;
const body = document.querySelector("body");
body.addEventListener("mousedown", () => {
    isDown = true;
})

body.addEventListener("mouseup", () => {
    isDown = false;
})

function createGrid(size) {
    const grid = document.querySelector('#grid_square');
    // Remove previous grid
    while (grid.hasChildNodes() === true) {
        const grid_list = document.querySelectorAll(".grid_row");
        grid_list.forEach(node => node.remove());
    }

    // Construct new grid of specified size
    for (let i = 0; i < size; i++) {
        // Create row elements
        const grid_row = document.createElement('div');
        grid_row.classList.toggle('grid_row');
        grid_row.classList.toggle('grid');

        for (let j = 0; j < size; j++) {
            // Create elements to go into the columns
            const grid_col = document.createElement('div');
            grid_col.classList.toggle('grid');
            grid_row.appendChild(grid_col);

            // Create event listeners for hovering effect or click
            // Toggles .hover class
            grid_col.addEventListener("mouseenter", (e) => {
                if (isDown === false) {
                    e.target.classList.add('hover');
                } else {
                    e.target.classList.add('add_color');
                }
            })

            grid_col.addEventListener("mouseleave", (e) => {
                e.target.classList.remove('hover');
            })   
        }
        grid.appendChild(grid_row);
    }
}

let size = 16;
createGrid(size);

// Resize using createGrid function and detect click and prompt user
document.getElementById("size").onclick = function () {
    size = prompt("What would you like the new size to be?");
    if (size >= 1 && size <= 100) {
        createGrid(size);
    }
}

// Reset canvas by creating fresh one
document.getElementById("reset").onclick = function () {
    createGrid(size);
}