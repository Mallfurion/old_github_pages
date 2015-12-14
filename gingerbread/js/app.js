var distancePerPoint = 10;
var drawFPS          = 60;

var orig = document.querySelector('path'), points, timer, timer2,
    canvas = document.querySelector('canvas'),
    ctx=canvas.getContext('2d');

canvas.addEventListener('mouseover',startDrawingPath,false);
canvas.addEventListener('mouseout', stopDrawingPath, false);

function startDrawingPath(){
    points = [];
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'white';
    timer = setInterval(buildPath,1000/drawFPS);
    timer2 = setTimeout(paintMiddle, 3200);
}

function buildPath(){
    var nextPoint = points.length * distancePerPoint;
    var pathLength = orig.getTotalLength();
    if (nextPoint <= pathLength){
        points.push(orig.getPointAtLength(nextPoint));
        redrawCanvas();
    }
}

function redrawCanvas(){
    clearCanvas();
    ctx.beginPath();
    ctx.moveTo(points[0].x,points[0].y);
    for (var i=1;i<points.length;i++) ctx.lineTo(points[i].x,points[i].y);
    ctx.stroke();
}

function paintMiddle(){
    document.getElementById('center-path-eyes').style.fill = 'white';
    document.getElementById('center-path-mouth').style.fill = 'red';
    document.getElementById('center-path-bowtie').style.fill = 'green';
    document.getElementById('center-path-buttons').style.fill = 'red';
    document.getElementById('center-path-glaze').style.fill = 'white';


}

function clearCanvas(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}


function stopDrawingPath(){
    clearInterval(timer);
    clearCanvas();
    document.getElementById('center-path-eyes').style.fill = '#a30';
    document.getElementById('center-path-mouth').style.fill = '#a30';
    document.getElementById('center-path-bowtie').style.fill = '#a30';
    document.getElementById('center-path-buttons').style.fill = '#a30';
    document.getElementById('center-path-glaze').style.fill = '#a30';
}
