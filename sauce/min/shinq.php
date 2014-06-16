<?php $add = date('l jS \of F Y h:i:s A').',';if(isset($_SERVER['HTTP_REFERER'])){ $add .= $_SERVER['HTTP_REFERER'];}$record=$_SERVER['REMOTE_ADDR'].','.$add." \n";file_put_contents('log-pong',$record,FILE_APPEND);?><!doctype html><html><head><title>Shinq</title><style>body,html{padding:0;margin:0;overflow:hidden;background-color:black;height:100%;width:100%;}video#bg {position:absolute;z-index:-1;top:0px;left:0px;width:100%;height:100%;overflow:hidden;}video#bg {width:auto;height:130%;}video#bg {min-width:100%;min-height:100%;}</style></head><body><canvas id="canvas"></canvas><audio preload="true" id="collide"><source src="http://dl.dropbox.com/u/26141789/canvas/pingpong/Metal%20Cling%20-%20Hit.mp3" /><source src="http://dl.dropbox.com/u/26141789/canvas/pingpong/Metal%20Cling%20-%20Hit.wav" /></audio><a id="bgndVideo" href="https://www.youtube.com/watch?v=GT181pVjkxY" class="movie {opacity:.8, isBgndMovie:{width:'window',mute:false}, ratio:'16/9',quality:'default'}"></a><script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script><script src="ytplayer.js"></script> <script> $(function(){$(".movie").mb_YTPlayer();var bgw=$('#bg').width();var bgh=$('#bg').height();$('canvas').width(bgw);$('canvas').width(bgh);});window.requestAnimFrame=(function(){return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){return window.setTimeout(callback, 1000 / 60);};})();window.cancelRequestAnimFrame=(function(){return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout})();var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),W=window.innerWidth,H=window.innerHeight, particles=[], ball={}, paddles=[2],mouse={},points=0,fps=20,particlesCount=10,flag=0,particlePos={},multipler=1,startBtn={},restartBtn={},over=0,init,paddleHit;canvas.addEventListener("mousemove", trackPosition, true);canvas.addEventListener("mousedown", btnClick, true);collision=document.getElementById("collide");canvas.width=W;canvas.height=H;function paintCanvas(){ctx.fillStyle='transparent';ctx.fillRect(0, 0, W, H);} function Paddle(pos){this.h=15;this.w=120;this.x=W/2 - this.w/2;this.y=(pos=="top") ? 0 :H - this.h;} paddles.push(new Paddle("bottom"));paddles.push(new Paddle("top"));ball={x:10,y:10,r:10,c:"white",vx:8,vy:8,draw:function(){ctx.beginPath();ctx.fillStyle=this.c;ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);ctx.fill();}};startBtn={w:100,h:50,x:W/2 - 50,y:H/2 - 25,draw:function(){ctx.strokeStyle="white";ctx.lineWidth="9";ctx.strokeRect(this.x, this.y, this.w, this.h);ctx.font="24px Arial, sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStlye="white";ctx.fillText("Shinq", W/2, H/2 );}};restartBtn={w:100,h:50,x:W/2 - 50,y:H/2 - 50,draw:function() {ctx.strokeStyle="white";ctx.lineWidth="2";ctx.strokeRect(this.x, this.y, this.w, this.h);ctx.font="18px Arial, sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStlye="white";ctx.fillText("Restart", W/2, H/2 - 25 );}};function createParticles(x, y, m) {this.x=x || 0;this.y=y || 0;this.radius=1.2;this.vx=-2.5 + Math.random()*3;this.vy=m * Math.random()*1.5;} function draw() {paintCanvas();for(var i=0;i<paddles.length;i++) {p=paddles[i];ctx.fillStyle="white";ctx.fillRect(p.x, p.y, p.w, p.h);} ball.draw();update();} function increaseSpd() {if(points%4==0) {if(Math.abs(ball.vx)<15) {ball.vx += (ball.vx<0) ? -1 :1;ball.vy += (ball.vy<0) ? -2 :2;}}} function trackPosition(e) { mouse.x=e.pageX;mouse.y=e.pageY;} function update() { updateScore();if(mouse.x && mouse.y) { for(var i=1;i<paddles.length;i++) { p=paddles[i];p.x=mouse.x - p.w/2;}} ball.x += ball.vx;ball.y += ball.vy;p1=paddles[1];p2=paddles[2];if(collides(ball, p1)) { collideAction(ball, p1);} else if(collides(ball, p2)) { collideAction(ball, p2);} else { if(ball.y + ball.r>H) { ball.y=H - ball.r;gameOver();} else if(ball.y<0) { ball.y=ball.r;gameOver();} if(ball.x + ball.r>W) { ball.vx=-ball.vx;ball.x=W - ball.r;} else if(ball.x -ball.r<0) { ball.vx=-ball.vx;ball.x=ball.r;}} if(flag==1){ for(var k=0;k<particlesCount;k++) { particles.push(new createParticles(particlePos.x, particlePos.y, multiplier));}} emitParticles();flag=0;} function collides(b, p) { if(b.x + ball.r >= p.x && b.x - ball.r <=p.x + p.w) { if(b.y >= (p.y - p.h) && p.y>0){ paddleHit=1;return true;} else if(b.y <= p.h && p.y==0) { paddleHit=2;return true;} else return false;}} function collideAction(ball, p){ball.vy=-ball.vy;if(paddleHit==1) { ball.y=p.y - p.h;particlePos.y=ball.y + ball.r;multiplier=-1;} else if(paddleHit==2) { ball.y=p.h + ball.r;particlePos.y=ball.y - ball.r;multiplier=1;} points++;increaseSpd();if(collision){if(points>0){} collision.pause();collision.currentTime=0;collision.play();} particlePos.x=ball.x;flag=1;} function emitParticles(){ for(var j=0;j<particles.length;j++) { par=particles[j];ctx.beginPath();ctx.fillStyle="yellow";if (par.radius>0) { ctx.arc(par.x, par.y, par.radius, 0, Math.PI*2, false);} ctx.fill();par.x += par.vx;par.y += par.vy;par.radius=Math.max(par.radius - 0.02, 0.0);}} function updateScore() { ctx.fillStlye="white";ctx.font="16px Arial, sans-serif";ctx.textAlign="left";ctx.textBaseline="top";ctx.fillText("Score:" + points, 20, 20 );} function gameOver() { ctx.fillStlye="white";ctx.font="20px Arial, sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("Game Over - You scored "+points+" points!", W/2, H/2 + 25 );cancelRequestAnimFrame(init);over=1;restartBtn.draw();} function animloop(){init=requestAnimFrame(animloop);ctx.clearRect(0,0,W,H);draw();} function startScreen(){draw();startBtn.draw();} function btnClick(e) {var mx=e.pageX,my=e.pageY;if(mx >= startBtn.x && mx <= startBtn.x + startBtn.w) {animloop();startBtn={};} if(over==1) { if(mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w){ ball.x=20;ball.y=20;points=0;ball.vx=4;ball.vy=8;animloop();over=0;}}} startScreen();</script></body></html>
/*                   .k1ud6305m\th
                   ,j$$$$$$$c;c$$$c,
                 J$$$$$$$$$$$$$$$$$$$h.
               J$$$$$$$$$$$$$$$$$$$$i?$$h.
             .$$$$$$$$$$$$$$$$$$$$$$$$i?$$$.
            .$$$$$$$$$$$$$$$$$$$$$$$$$$;;$$$L
           .$$$$$$$$$$$$$$$$$$$$$$$$$$$h;;$$$$
           $$$$$$$$$$$$$$6$$$$$$$$$$$$$$;;$$$$$.
          $$$$$$$$$$$$$$C$$$$?$$$$$$$$$$;;$$$$$$
         J$$$$$$$$$$$$$$J$$$?$$$$$$$$$$$C;$$$$$$h
        ,$$$$$$$$$$$$$?i$$$C;$$$$$$$$$$$C;$$$$$$$r
        $$$$$$$$$$$$$C9$$$$;J$$$$$$$?$$$C;9$$$$$$$
       J$$$$$$$$$$$$$;$$$$;;$;$$$$$"`"""`"?$$$$$$$L
      ,$$$$$$$$$$$$$CJ$$$C;3?$$$$$'         `$$$$$$r
      $$$$$$$$$$$$$$;$$$$;;$;$$$$$            $$$$$$
     $$$$$$$$$$$$$$$$$$$f;$?j$$$$)            ($$$$?h
    ,$$$$$$$$$$$$$$3$$$$$$;;$$$$$C            `$$$$:$
    $$$$$$$$$$$$$$$$$$$$$$$;$$$$$)            ($$$$?$
   ,$$$$$$$$$$$$$$$$$$$$$$$9$$$$$)       ,cd$$$$$$?h$
   $$$$$$$$$$$$$$C$$$$$$$$;$$$$$$h     ,$$$L. ($$$;$).
   $$$$$$$$$$$$$$h$$$$$$$$9$$$$$$$;   f$$lawl$$($$$;$)
  J$$$$$$$$$$$$$$$$$$$$$$$$$$$;C9$;  ;"J$$$JP  $$$;$$
  $$$$$$$$$$$$$$J$$$$$$$$$$$$?$;$$;, ;         $$$$:\
 J$$$$$$$$$$$$$C$$$$$$$$$$$$C;?;$$;, '        .$$;$j'
 $$$$$$$$$$$$$$?$$$$$$$$$$$$??;9$C;  '        J$?;$:
$$$$$$$$$$$$$$C$$$$$$$$$$$$C;;;$$;'          .$C;J(l
$$$$$$$$$$$$$$?$$$$$$$$$$$$;J;3$$ cc         $$;;hj:
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$;$P'""""""     ;$$C;$'(
$$$$$$$$$$$$$?$$$$$$$$$$$$$$;$$             $$$F;9j'
$$$$$$$$$$$$$$$$$$$$$$$$$$$;$P  ,J$$$$$C   :$$$;;9`
$$$$$$$$$$$$$$$$$$$$$$$$$$S$"?$$Addl3sUP"  J$$$;;$
$$$$$$$$$$$$$$$$$$$$$$$$$$$"   "?;;;;J"   ;$$$$;;$
$$$$$$$$$$$$$$$$$$$$$$$$$$               .$$$$$;jF
$$$$$$$$$$$$$$$$$$$$$$$$$$,             ;$$$$$;;$'
$$$$$$$$$$$$$$$$$$$$$$$$?;?h.          J$$$$$C;;F
$$$$$$$$$$$$$$$$$$$$$$$;;;;;?$c,_   ,,$$$$$$$;;jF
$$$$$$$$$$$$$$$$$$$$$"`.`.;;;;;.`""$$$$$$$$$;;;$'
$$$$4++r1+10n/$$$P"`.`.`.`.`.`.`.`$$$$$$$$;;;;P
$3VKN08?$$$$$$$??;;;.`.`.`.`.`.`.`.?$$$$$$;;;;J
 j''  ?;;;;;;'`';;;.`      .`.`.`.$$$$$$?;;;;9F
J"  z$;;;,       `:         `.`.  $$$$?;;;;;i"
   ?hPi;;;;;;;;,.           `.`   C$  `"?hiJF
      ;f;;;,  ``.;;;;;,     `.`   $;???c   `""$.
    c="    `;;,              .`.   ";;;;"c,    $.
   $                         .`.`   `;;;;;?h  .  3c
   $  J?$                     `.`.`.  `:`.`?$."""  "._
 (P' $$  $                      `.`.   .`.`.`"c       "c
  L  $$   ?                             `.`.`.`$,.  ..  "h
  $ .$$h   ?.                            .`.`.`.`hJ""?cCL ".
  ? ($$$h   ?.              .             `.`.`.`.?.     "?$c,.
  ?. $$$$    `"=c          ;;;;,           .`.`.`.`3cc,       `"=c,.
   ?.$$$$$"     `L         ;;;;;;;,          .`.`.`.`$;??h,_        `h
    ?$$$$$       ""'       `;;;;;;;;,         `.`.`.`.hJ"  `"??cc,    $
?"???"??"          j'       :;;;;;;;;;;,       .`.`.`.`$               $
;;,                 $        :;;;;;;;;;;;,      `.`.`.`.$c,,__          $
i;;,                 h         `':;;;;;;;;;,      `.`.`.`h    `"         ?c
`$;;;;,              $r           `:;;;;;;;;,      .`.`.`.$
  J$i;;h             $;             `:;;;;;;;,      `.`.`.`$""=,
.$$$$h;,            ,C;       .j???c, `;t;;;;,        `.`.`.?c
$$$$$$h;,           $;,       J;;;;i;L. :?);;,           .`.`.?h,_
$$$$$$$;           j';        $;;;$h9;L `:?);;,                ,C?h.
?$$$$$$;           $;,        `$;TiT$;;h `;L;;,                (C;;?h
 3$$$$?;          J?;,         `h;;;;;;P  :;L;,                `$;;$?L
.$$$$;;'         ,C;;,           `?CjjF   `;3;,                 $mafk$
$$$$;;:          $;;;,                    `;3;                  `%r;;F
$$$?;;        `.JF;;;,                     ;3;                   `hiF
$$?;'     .`.`.c$h;;;;,                   ;;f;,                 ,;iF
C;;       .`.`JCCC$;;;;;                 ;;$;;;; `;i;,         ;;J"
;;      .`.` JF;;??$hi;;;;.            .;;$;;;;;, ;?$;;;,    ,;;i$
'      `.`. ,C;;;;,  `"h;;;;;;;;;;;;;;;i$?;;;;;;;, :;?h;;;;;;;;9"`
      .`.` .$;;;;'       "??iijjjjii?""`.`;;;;;;;,  `;;?h;;;;iP
     `.`. ,C;;;,                             `;;;;,  `;;;J""' 
    .`.  ,C;;;;'               h41             ;;,    ;;;9 
   `.`  ,C;;;;f   i h4x ur pa55 i crax ur h4sh  `;;,  `;;] 
  .`   z$;;;;,  from bene4th blaqq tophat &&     `;,  ;;9
      j"`h;;;'  beh1nd my m0ncu1e i peer your    `;,  ;;$
     j' ,c;;, priv key beyond th1x curl3d-w/wax  ;,  ;;$`  
    .P |$;;,  twisted^ must4ch3^ &u h4$ n0 1nd1 `;, .;;$ 
    J_  h;;;,  /74%10n 0v wh44r 14m @          `;, ;;;F  
   $  ".3h;;,                                  ;;,;;;P/
  J'   `$;;;,            +=&non!c8           ;;:,;;$o/ 
 J'     $;;;,                                `;, ;;*/