// Detect if mouse is being pressed - used for colouring
let isDown = false;
const body = document.querySelector("body");
body.addEventListener("mousedown", () => {
    isDown = true;
})

body.addEventListener("mouseup", () => {
    isDown = false;
})

// Button controls
let size = 16;
createGrid(size);

// Size - Resize using createGrid function and detect click and prompt user
document.getElementById("size").onclick = function () {
    size = prompt("What would you like the new size to be?");
    if (size >= 1 && size <= 100) {
        createGrid(size);
    }
}

// Reset - Reset canvas by creating fresh one
document.getElementById("reset").onclick = function () {
    createGrid(size);
}

// Colours
const BLACK = 0;
const SHADE = 1;
const RAINBOW = 2;
let colour = BLACK;
document.getElementById("black").onclick = function () {
    colour = BLACK;
}
document.getElementById("shading").onclick = function () {
    colour = SHADE;
}
document.getElementById("rainbow").onclick = function () {
    colour = RAINBOW;
}


// Creates a grid of div's and adds event listeners for functionality
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
            grid_col.style['background-colour'] = "rgba(0, 0, 0, 0)"
            grid_row.appendChild(grid_col);

            // Create event listeners for hovering effect or click
            // Toggles .hover class
            grid_col.addEventListener("mouseenter", (e) => {
                if (isDown === false) {
                    e.target.classList.add('hover');
                } else {
                    // Depends on selection
                    adjustColour(e);
                }
            })

            grid_col.addEventListener("mouseleave", (e) => {
                e.target.classList.remove('hover');
            })   
        }
        grid.appendChild(grid_row);
    }
}

/* 
IDEAS:
- Add eraser
- Add colour palette pen colour
- Improve styling of the app
- Add optional background colour
- Transitions to background colour when canvas is reset
*/

// Adjusts colour based on colour selected
function adjustColour (e) {
    if (colour === BLACK) {
        e.target.style['background-color'] = "rgba(0, 0, 0, 1)"
    } else if (colour === SHADE) {
        const colour = e.target.style['background-color'];
        // Either extracts " 0" or ".x" and converts it to a decimal successfully
        let alpha_value = Number(colour.slice(colour.length - 3, colour.length - 1));

        // Hmmm... I can't get the alpha value to sit at 1.
        // When it adds 0.1 to 0.9, it jumps to 1
        if (alpha_value !== 0.9 && alpha_value !== 1) {
            e.target.style['background-color'] = `rgba(0, 0, 0, ${alpha_value + 0.1})`;
        }
    } else if (colour === RAINBOW) {
        e.target.style['background-color'] = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`
    }
}

// Generates random number between 0 to 255 inclusive (for RGB randomisation)
function randomNum () {
    return Math.floor(Math.random() * 256);
}