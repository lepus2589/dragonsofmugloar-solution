# My [dragonsofmugloar.com](http://www.dragonsofmugloar.com/) solution #

This is my attempt at a solution to the challenge. To try it out yourself,
simply do

```
npm install
```

followed by

```
node index.js
```

Battles will be started in batches of ten in a recursive loop. A cumulative
statistic will be printed after each batch. The program terminates automatically
after 1000 battles.

### My Results ###

After 1000 battles, I ended up with the following statistics:

- Number of battles won: 969
- Total number of battles: 1000
- Win ratio: 96.90%

## Tests ##

To run the unit tests, simply do

```
npm test
```

to run mocha.
