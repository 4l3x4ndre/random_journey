let particles = {};
let particleIndex = 0
  
  
let seedsX = [];
let seedsY = [];
let maxAngles = 50;
let currentAngle = 0;
  
function seedAngles() {
    seedsX = [];
    seedsY = [];
    for (var i = 0; i < maxAngles; i++) {
        seedsX.push(Math.random() * 20 - 10);
        seedsY.push(Math.random() * 30 - 10);
    }
}

seedAngles();
  
class Particle {
    constructor (x, y, color, game) {
        if (currentAngle !== maxAngles) {
            this.x = x;
            this.y = y;
            this.color = color
            this.width = Particle.settings.particleSize;
            this.height = Particle.settings.particleSize;
            this.vx = seedsX[currentAngle] * .1;
            this.vy = seedsY[currentAngle] * .1;

            currentAngle++;
            particleIndex ++;
            particles[particleIndex] = this;
            this.id = particleIndex;
            this.life = 0;
            this.maxLife = Particle.settings.maxLife;
            this.game = game;

            this.designer_id = this.game.designer.fg_array.length;
            this.game.designer.addDrawable(this.game.designer.fg_array, this);
            
        } else {
            seedAngles();
            currentAngle = 0;
        }
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
      
      
        this.life++;
        this.width -= Particle.settings.particleSize/Particle.settings.maxLife;
        this.height -= Particle.settings.particleSize/Particle.settings.maxLife;
      
        if (this.life >= this.maxLife) {
            this.game.designer.removeDrawable(this.game.designer.fg_array, this.designer_id);
            delete particles[this.id];
        }
    
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        // ctx.closePath();
        // ctx.fill();
    }

    static get settings() {
        let s = {
            density: 10,
            particleSize: 5,
            maxLife: 40,
        };
        return s;
    }
}
  