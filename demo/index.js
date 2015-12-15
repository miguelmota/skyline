(function() {
  'use strict';

  var canvasWidth = 300;
  var canvasHeight = 300;

  var buildingsCanvas = document.getElementById('buildingsCanvas');
  var buildingsContext = buildingsCanvas.getContext('2d');
  buildingsCanvas.width = canvasWidth;
  buildingsCanvas.height = canvasHeight;
  buildingsContext.lineWidth = 1;
  buildingsContext.strokeStyle = '#000';

  var skylineCanvas = document.getElementById('skylineCanvas');
  var skylineContext = skylineCanvas.getContext('2d');
  skylineCanvas.width = canvasWidth;
  skylineCanvas.height = canvasHeight;
  skylineContext.lineWidth = 1;
  skylineContext.strokeStyle = '#000';

  var generateButton = document.getElementById('generate');
  generateButton.addEventListener('click', generate, false);

  var buildingsOutput = document.getElementById('buildingsOutput');
  var skylineOutput = document.getElementById('skylineOutput');

  generate();

  function generate() {
    buildingsContext.clearRect(0, 0, canvasWidth, canvasHeight);
    skylineContext.clearRect(0, 0, canvasWidth, canvasHeight);

    var buildings = range(random(4, 10)).map(function() {
      var x = random(0, 200);
      return [x, random(2, 300), random(x+1, 300)];
    });

    buildings.forEach(function(buildingPoints) {
      buildingsContext.beginPath();
      buildingsContext.moveTo(buildingPoints[0], canvasHeight);
      buildingsContext.lineTo(buildingPoints[0], canvasHeight - buildingPoints[1]);
      buildingsContext.lineTo(buildingPoints[2], canvasHeight - buildingPoints[1]);
      buildingsContext.lineTo(buildingPoints[2], canvasHeight);
      buildingsContext.stroke();
      buildingsContext.fillStyle = randomColor();
      buildingsContext.fill();
    });


    var skylinePoints = skyline(buildings);

    console.log('buildings', buildings);
    console.log('skyline', skylinePoints);

    buildingsOutput.innerHTML = '<pre>Input: ' + JSON.stringify(buildings, null, 2) + '</pre>';
    skylineOutput.innerHTML = '<pre>Output: ' + JSON.stringify(skylinePoints, null, 2) + '</pre>';

    skylinePoints.forEach(function(points, i, all) {
      skylineContext.beginPath();
      var y = canvasHeight - points[1];
      skylineContext.moveTo(points[0], (i === 0 ? canvasHeight : y));
      skylineContext.lineTo(points[0], y);
      if (i < all.length - 1) {
        skylineContext.lineTo(all[i+1][0], canvasHeight - points[1]);
        skylineContext.lineTo(all[i+1][0], canvasHeight - all[i+1][1]);
      }
      skylineContext.stroke();
    });
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomColor() {
    var r = 255*Math.random()|0;
    var g = 255*Math.random()|0;
    var b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function range(n) {
    var a = [];
    while(n--) {
      a[n] = n + 1;
    }
    return a;
  }
})();
