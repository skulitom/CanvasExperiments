/**
 * Created by artem on 08/07/2017.
 */
var canvas = document.querySelector('canvas');

canvas.width = window .innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove',
    function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize',
    function (event) {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
    });

function Circle(x, y, r, color, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.originalR = r;
    this.color = color;
    this.enlargeDist = 80;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color
        c.stroke();
        c.fill();
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

        if(mouse.x - this.x < this.enlargeDist && mouse.x - this.x > -this.enlargeDist
        && mouse.y - this.y < this.enlargeDist && mouse.y - this.y > -this.enlargeDist){
            if(this.r < 100) {
                this.r += 1;
            }
        }else if(this.r > this.originalR){
             this.r-=1;
        }

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
    var r = Math.random()* 30 + 5;
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