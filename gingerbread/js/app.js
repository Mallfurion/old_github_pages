var distancePerPoint = 10;
var drawFPS          = 60;

//slow-scroll
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

var orig = document.querySelector('path'), points, timer, timer2, timer3, done,
    canvas = document.querySelector('canvas'),
    ctx=canvas.getContext('2d');

canvas.addEventListener('mouseover',startDrawingPath,false);
canvas.addEventListener('mouseout', stopDrawingPath, false);

function startDrawingPath(){
    done = false;
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
    for (var i=1;i<points.length;i++)
        ctx.lineTo(points[i].x,points[i].y);
    ctx.stroke();
}

function paintMiddle(){
    document.getElementById('selection').style.fill = '#a30';
    document.getElementById('center-path-eyes').style.fill = 'white';
    document.getElementById('center-path-mouth').style.fill = 'red';
    document.getElementById('center-path-bowtie').style.fill = 'green';
    document.getElementById('center-path-buttons').style.fill = 'red';
    document.getElementById('center-path-glaze').style.fill = 'white';
    //showText
    $('#merry').show('slide', 500);
    $('#christmas').show('slide', {direction: 'right'}, 500);
    done = true;
    generateImage();
}

function clearCanvas(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

function clearMiddle() {
    document.getElementById('center-path-eyes').style.fill = '#a30';
    document.getElementById('center-path-mouth').style.fill = '#a30';
    document.getElementById('center-path-bowtie').style.fill = '#a30';
    document.getElementById('center-path-buttons').style.fill = '#a30';
    document.getElementById('center-path-glaze').style.fill = '#a30';
    $('#merry').hide('slide', 500);
    $('#christmas').hide('slide', {direction: 'right'}, 500);
}

function generateImage() {
    html2canvas(document.getElementById('graphics'), {
        onrendered: function(canvas) {
            var img = canvas.toDataURL('image/png');
            $('#saved-img').attr('src', img);
        }
    });

    if(done)
    {
        canvas.removeEventListener('mouseover', startDrawingPath, false);
        canvas.removeEventListener('mouseout', stopDrawingPath, false);
        $('#saved-text').text('Your cookie is done! You can save it now.');
        setTimeout(function(){document.getElementById('saved-anchor').click()}, 500);
    }
    else
    {
        $('#saved-text').text('Your cookie is NOT done. Let it cook!')
    }

}

function stopDrawingPath(){
    generateImage();
    clearInterval(timer);
    clearTimeout(timer2);
    clearTimeout(timer3);
    clearCanvas();
    clearMiddle();
}