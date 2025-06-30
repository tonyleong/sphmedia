"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var position = { x: 0, y: 0 };
var maxSize = { x: 0, y: 0 };
var heading = "N";
var direction = ["N", "E", "S", "W"];
var line = "================================================================================================";
var setPosition = function (x, y, h) {
    if (!x || !y || !h || isNaN(+x) || isNaN(+y))
        throw new Error("Wrong position input, eg: 0, 0, N");
    if (!direction.includes(h))
        throw new Error("Wrong direction input!");
    position.x = +x;
    position.y = +y;
    heading = h;
};
var setSize = function (x, y) {
    if (!x || !y || isNaN(+x) || isNaN(+y))
        throw new Error("Wrong size input, eg: 0,0");
    maxSize.x = +x;
    maxSize.y = +y;
};
var move = function (x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var newX = position.x + x;
    var newY = position.y + y;
    if (newX < 0)
        newX = 0;
    if (newY < 0)
        newY = 0;
    if (newX > maxSize.x)
        newX = maxSize.x;
    if (newY > maxSize.y)
        newY = maxSize.y;
    position.x = newX;
    position.y = newY;
};
var execute = function (command) {
    var index = direction.indexOf(heading);
    if (command === "L") {
        if (index === 0)
            heading = direction[direction.length - 1];
        else
            heading = direction[index - 1];
    }
    else if (command === "R") {
        if (index === direction.length - 1)
            heading = direction[0];
        else
            heading = direction[index + 1];
    }
    else if (command === "M") {
        if (heading === "N") {
            move(0, 1);
        }
        else if (heading === "E") {
            move(1, 0);
        }
        else if (heading === "S") {
            move(0, -1);
        }
        else if (heading === "W") {
            move(-1, 0);
        }
        else
            throw Error("Wrong command input");
    }
    else
        throw Error("Wrong command input");
};
var processInput = function (fullCommand) {
    for (var i = 0; i < fullCommand.length; i++) {
        execute(fullCommand[i]);
    }
};
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var userInput = function () {
    console.log(line);
    console.log("                                        START                                            ");
    console.log(line);
    rl.question("Please enter plateau size: ", function (answer) {
        try {
            var _a = answer.split(","), sx = _a[0], sy = _a[1];
            setSize(sx, sy);
            rl.question("Please enter Mars Rover's initial position: ", function (answer) {
                var _a = answer.split(","), px = _a[0], py = _a[1], ph = _a[2];
                setPosition(px, py, ph);
                rl.question("Please enter command: ", function (answer) {
                    processInput(answer);
                    console.log("The position of the Mars Rover is (x:".concat(position.x, ", y:").concat(position.y, ", heading to ").concat(heading, ")"));
                    console.log(line);
                    console.log("          if wish to close the application please use Ctrl + C         ");
                    console.log(line);
                    console.log("*");
                    console.log("*");
                    console.log("*");
                    console.log("*");
                    console.log("*");
                    console.log("*");
                    console.log("*");
                    userInput();
                });
            });
        }
        catch (error) {
            console.log(error.message);
            rl.close();
        }
    });
};
userInput();
