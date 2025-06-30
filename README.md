# Mars Rover Code Challenge

## Problem Statement
A squad of robotic rovers are to be landed by NASA on a plateau on Mars. The plateau is rectangular and must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain. Each rover’s position is represented by x and y coordinates and a letter representing one of the four cardinal compass points (N, E, S, W). The plateau is divided into a grid to simplify navigation.

NASA sends a simple string of letters to control each rover:
- `L`: Spin 90 degrees left
- `R`: Spin 90 degrees right
- `M`: Move forward one grid point in the current heading

The first line of input is the upper-right coordinates of the plateau (lower-left is always 0,0). Each rover has two lines of input: its initial position and a command string. Rovers are processed sequentially.

### Example Input/Output
```
Input:
5 5
1 2 N
LMLMLMLMM

Output:
1 3 N

Input:
5 5
3 3 E
MMRMMRMRRM

Output:
5 1 E
```

---

## Getting Started

### Prerequisites
- Node.js (v14 or above recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application
To start the Mars Rover CLI application, run:
```sh
npm start
```

You will be prompted to enter:
- Plateau size (e.g., `5,5`)
- Rover's initial position (e.g., `1,2,N`)
- Command sequence (e.g., `LMLMLMLMM`)

The application will output the rover's final position and heading.

---

## Libraries Used
- **TypeScript**: Provides static typing for safer and more maintainable code.
- **ts-node**: Allows running TypeScript files directly without manual compilation.
- **@types/node**: Type definitions for Node.js, enabling TypeScript to understand Node's APIs.
- **readline** (Node.js built-in): Used for interactive command-line input.

---

## Code Design
- **Modular Functions**: The code is organized into functions for setting the plateau size, rover position, moving, executing commands, and processing input.
- **Type Safety**: The `Position` interface ensures that coordinates are always numbers.
- **Input Validation**: All user inputs are validated for correct format and values, with clear error messages for invalid input.
- **Interactive CLI**: The application uses Node's `readline` module to prompt the user for input in a user-friendly way.
- **Sequential Processing**: The design allows for sequential processing of multiple rovers (can be extended for batch input).

---


## File Structure

```
SPHMedia2/
├── src/
│   ├── main.ts         # Main entry point; combines all features and coordinates the CLI
│   ├── display.ts      # Handles all CLI display and output formatting
│   ├── rover-logic.ts        # Contains the main logic for moving and controlling the Mars Rover
│   ├── validation.ts   # Handles all input validation logic
├── tests/              # Test files for the application
├── package.json        # Project configuration and npm scripts
├── tsconfig.json       # TypeScript configuration
├── jest.config.js      # Jest testing configuration (if using Jest)
├── README.md           # Project documentation (this file)
└── node_modules/       # Installed dependencies
```

- **src/main.ts**: Main logic to combine all features and coordinate the CLI application.
- **src/display.ts**: Handles all display and output formatting for the CLI.
- **src/rover.ts**: Contains the main logic for moving and controlling the Mars Rover.
- **src/validation.ts**: Responsible for input validation.
- **tests/**: Contains test files to ensure code correctness.
- **package.json**: Defines project metadata, dependencies, and scripts.
- **tsconfig.json**: Configures TypeScript compiler options.
- **jest.config.js**: Configuration for Jest testing framework (if used).
- **README.md**: Project documentation and instructions.

---

## Notes
- The application currently processes one rover at a time via interactive prompts.
- To process multiple rovers in batch, the code can be extended to read from a file or accept multiple sets of input.

---

## Author
- LEONG MUN HON (TONY)
