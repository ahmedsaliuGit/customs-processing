const readline = require("readline");
const fs = require("fs");

function getFileFromCLI() {
  if (process.argv.length < 3) {
    console.log("Enter a filename");
    console.log(`Usage: node ${process.argv[1]} FILENAME`);
    process.exit(1);
  }
}
const filename = process.argv[2];

function customFormProcessing() {
  // check if there is file in the command line as input
  getFileFromCLI();

  const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
    console: false,
  });

  let newGroup = new Set();
  let totalSum = 0;
  let count = 0;

  readInterface.on("line", function (line) {
    if (line.trim().length === 0) {
      totalSum += count;
      newGroup = new Set();
      count = 0;
    } else {
      for (let i = 0; i < line.length; i++) {
        if (!newGroup.has(line[i])) {
          newGroup.add(line[i]);
          count++;
        }
      }
    }
  });

  readInterface.on("close", function () {
    if (count > 0) totalSum += count;
    console.log(totalSum);
  });
}

customFormProcessing();
