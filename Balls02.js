// Sindri Snær Hjaltalín
const Ball = function(dx, dy, size) {
        // geri balls random litit
        this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        // læt balls geta farið í hvaða átt sem er 360 gráður
        this.direction = Math.random() * Math.PI * 2;
        this.size = size;
        // gef balls random hraða en ekki mini en 10
        this.speed = Math.random() * 5 + 5;
        this.x = dx;
        this.y = dy;

      };
      // skill greini height og width sem doc element client hight widh 
      // þannig eg þar ekki að kalla á það aftur
      let height = document.documentElement.clientHeight;
      let width  = document.documentElement.clientWidth;

      Ball.prototype = {

        updatePosition:function(width, height) {
          // læt balls hreyfast í random átt
          this.x += Math.cos(this.direction) * this.speed;
          this.y += Math.sin(this.direction) * this.speed;

          // finn ef balls snerta hliðarveggi
          if(this.x + this.size > width || this.x -
              this.size < 0) {
              // sendi balls í öfuga átt
              this.speed *= -1;
            }

            // finn ef balls snerta upp eða nirðri vegg
          if(this.y + this.size > height || this.y -
              this.size < 0) {
              // sendi balls í öfuga átt
              this.speed *= -1;
            }
            
        }

      };
      // setupp canvas
      let ctx = document.querySelector("canvas").getContext("2d");
      // geri balls arry
      let balls = new Array();
      //læt balls teiknas alla á sama stað
      let x = height * 0.3;
      let y = width * 0.3;
      // gerir 50 balls
      for(let i = 0; i < 50; i ++) {
        // geri balls random sterð
        balls.push(new Ball(x, y, Math.floor(Math.random() * 10 + 20)));

      }

      function loop() {
        // endur teikna gluggan
        window.requestAnimationFrame(loop);

        
        // skill greini sterð á canvas
        ctx.canvas.height = height;
        ctx.canvas.width = width;

        
        for(let i = 0; i < balls.length; i ++) {

          let ball = balls[i];
          // teikna balls
          ctx.fillStyle = ball.color;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
          ctx.fill();

          ball.updatePosition(width, height);

        }

      }
      // kalla loop functuon
      loop();