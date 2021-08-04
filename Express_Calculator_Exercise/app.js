const express = require("express");
const ExpressError = require("./expressError");
const expressError = require("./expressError");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", (req, res, next) => {
  if (!req.query.nums)
    throw new ExpressError(
      "Must enter valid string of numbers separated by commas",
      400
    );
  try {
    const numbers = req.query.nums.split(",").map((num) => +num);
    for (let i = 0; i < numbers.length; i++) {
        if (isNaN(numbers[i])) {
          throw new ExpressError(`number at index ${i} Invalid number`, 400);
        }
      }
    const mean =
      numbers.reduce((acc, cur) => {
        return acc + cur;
      }) / numbers.length;
    let result = {
      response: {
        operation: "mean",
        value: mean,
      },
    };
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  if (!req.query.nums)
    throw new ExpressError(
      "Must enter valid string of numbers separated by commas",
      400
    );
  try {
    const numbers = req.query.nums.split(",").map((num) => +num);
    for (let i = 0; i < numbers.length; i++) {
      if (isNaN(numbers[i])) {
        throw new ExpressError(`number at index ${i} Invalid number`, 400);
      }
    }
    const sortedNums = numbers.slice().sort((a, b) => a - b);
    let median;
    const index = Math.floor(numbers.length / 2);
    if (numbers.length % 2 !== 0) {
      median = sortedNums[index];
    } else {
      median = (sortedNums[index - 1] + sortedNums[index]) / 2;
    }
    let result = {
      response: {
        operation: "median",
        value: median,
      },
    };
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  if (!req.query.nums)
    throw new ExpressError(
      "Must enter valid string of numbers separated by commas",
      400
    );
  try {
    const numbers = req.query.nums
      .split(",")
      .map((num) => +num)
      .sort((a, b) => a - b);

    if (numbers.length === 0) return 0;
    let mostOccurences = 1;
    let mostNum = numbers[0];
    let currentStreak = 1;
    let currentNum = numbers[0];
    let mode;

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i - 1] !== numbers[i]) {
        if (isNaN(numbers[i])) {
          throw new ExpressError(`Invalid Number`, 400);
        }
        if (currentStreak > mostOccurences) {
          mostOccurences = currentStreak;
          mostNum = currentNum;
        }
        currentStreak = 0;
        currentNum = numbers[i];
      }
      currentStreak++;
    }
    mode = currentStreak > mostOccurences ? currentNum : mostNum;
    let result = {
      response: {
        operation: "mode",
        value: mode,
      },
    };
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

app.use(function (req, res, next) {
  const e = new ExpressError("Page Not Found", 404);
  return next(e);
});

app.use(function (error, req, res) {
  let status = error.status || 500;
  let message = error.msg;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000);

module.exports = app