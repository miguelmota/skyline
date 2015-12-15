(function(root) {
  'use strict';

  function mergeSkylines(left, right, s) {
    var i = 0;
    var j = 0;
    var h1 = 0;
    var h2 = 0;
    var h = 0;

    while (i < left.length && j < right.length) {
      if (Array.isArray(left[i]) && Array.isArray(right[j])) {
        if (typeof left[i][0] === 'number' && typeof right[j][0] === 'number') {
          if (left[i][0] < right[j][0]) {
            h1 = left[i][1];
            var m = Math.max(h1, h2);
            if (m !== h) {
              h = m;
              s.push([left[i][0], h]);
            }
            i++;
          } else {
            h2 = right[j][1];
            var m = Math.max(h1, h2);
            if (m !== h) {
              h = m;
              s.push([right[j][0], h]);
            }
            j++;
          }
        } else {
          return [];
        }
      } else {
        return [];
      }
    }

    while (i < left.length) {
      if (left[i][1] !== h) {
        h = left[i][1];
        s.push([left[i][0], h]);
      }
      i++;
    }

    while(j < right.length) {
      if (right[j][1] !== h) {
        h = right[j][1];
        s.push([right[j][0], h]);
      }
      j++;
    }

    return s;
  }

  function formSkyline(b, l, r, s) {
    if (l === r) {
      s.push([b[l][0], b[l][1]]);
      s.push([b[l][2], 0]);
      return s;
    } else if (l < r) {
      var mid = parseInt((l + r) / 2);
      var left = [];
      var right = [];
      formSkyline(b, l, mid, left);
      formSkyline(b, mid + 1, r, right);
      return mergeSkylines(left, right, s);
    }
  }

  function skyline(buildings) {
    if (!(Array.isArray(buildings) && buildings.length)) {
      return [];
    }

    return formSkyline(buildings, 0, buildings.length - 1, []);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = skyline;
    }
    exports.skyline = skyline;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return skyline;
    });
  } else {
    root.skyline = skyline;
  }

})(this);
