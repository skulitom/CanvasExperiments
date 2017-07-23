/**
 * Created by artem on 08/07/2017.
 */
var canvas = document.querySelector('canvas');

canvas.width = window .innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Circle(x, y, r, color, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.stroke();
    };

    this.update = function(){
        if(this.x + this.r > innerWidth || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.r > innerHeight || this.y - this.r < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw()
    };
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var circleArray = [];
for(var i = 0; i < 200; i++){
    var r = Math.random()* 20 + 20;
    var x = Math.random() * (innerWidth - r*2)+r;
    var y = Math.random() * (innerHeight - r*2)+r;
    var color = getRandomColor();
    var dx = (Math.random()-0.5)*8;
    var dy = (Math.random()-0.5)*8;
    circleArray.push(new Circle(x,y,r,color,dx,dy));
}

function animate () {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight)
    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}

animate();