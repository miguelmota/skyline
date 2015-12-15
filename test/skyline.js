const test = require('tape');
const skyline = require('../skyline');

test('skyline', function (t) {
  'use strict';

  t.plan(7);

  t.deepEqual(skyline(), []);
  t.deepEqual(skyline(42), []);
  t.deepEqual(skyline(''), []);
  t.deepEqual(skyline('foo'), []);
  t.deepEqual(skyline([42,'foo']), []);
  t.deepEqual(skyline([]), []);

  t.deepEqual(skyline([
    [1,11,5],
    [2,6,7],
    [3,13,9],
    [12,7,16],
    [14,3,25],
    [19,18,22],
    [23,13,29],
    [24,4,28]
  ]), [
    [1,11],
    [3,13],
    [9,0],
    [12,7],
    [16,3],
    [19,18],
    [22,3],
    [23,13],
    [29,0]
  ]);
});
