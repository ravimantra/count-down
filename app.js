'use strict';

function resizeClock() {
    //    COLLECTING ALL DATAS FROM HTML
    var circle = document.querySelectorAll('.clock-shape');
    var clockSize = getComputedStyle(document.documentElement).getPropertyValue('--clockSize');
    var circleSize = 'calc(' + clockSize + ' / 2)';
    var circleRadius = 'calc((' + clockSize + ' / 2) - 1rem)';

    //    RESIZING THE CIRCLE SIZE ACRODING TO THE SVG SIZE
    for (let i = 0; i < circle.length; i++) {
        circle[i].setAttribute('cy', circleSize);
        circle[i].setAttribute('cx', circleSize);

        circle[i].setAttribute('r', circleRadius);
    }
}
