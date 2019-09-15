
const plot = document.getElementById("plot");
const controls = document.getElementById("controls");

const LotkaVolterra = function (){
  

    return new InteractivePlot({
       parameters: { 
          values:{
              a1:-0.18,
              b1:0.047,
              a2:0.38,
              b2:-0.035,
              x0:12,
              y0:17,
          },
          ranges:{
              a1:[-1, 1 ],
              b1:[-1, 1 ],
              a2:[-1, 1 ],
              b2:[-1, 1 ],
              x0:[1,30],
              y0:[1,30],
          }
       },
       template: function (){

          return [
                  `x'(t) = ${this.a1}x(t) + ${this.b1}x(t)y(t)`,
                  `y'(t) = ${this.a2}y(t) + ${this.b2}x(t)y(t)`,
                  `x0 = ${this.x0}, y0 = ${this.y0}`,
                 ];
       },
       title: "Lotka-Volterra model",
       names: ['predator','prey'],
       func: (function (){
                let f =  function* func(){
                     let x = this.x0, y = this.y0, step = 0.1,
                         first_der_x = ( xt, yt,a,b)=> a*xt + b*xt*yt;
                         first_der_y = ( xt, yt,a,b)=> a*yt + b*xt*yt;
                     for(let i=0;i<2000;i++){
                         let next_x = x + step * first_der_x(x,y,this.a1,this.b1),
                             next_y = y + step * first_der_y(x,y,this.a2,this.b2);
                         x = next_x;
                         y = next_y;
                         yield { x:step*i, y:[x,y] };
                     }
                }
                f.isGenerator = true;
                return f;
       })(),
       range: {x:[0,100],y:[0,50]},
       plotElement: plot,
       controlsElement: controls,

    })

}

const Sin =  function (){
  
    return new InteractivePlot({
       parameters: { 
          values:{
              a:1,b:1,
          },
          ranges:{
              a:[-3, 3 ],
              b:[-10, 10 ],
          }
       },
       template: function (){

          return [
                  `y(x) = ${this.a}sin(${this.b}x)`

                 ];
       },
       title: "Sin function",
       names: ['sin'],
       func: (function (){
                let f =  function (x){ return  [ this.a*Math.sin(this.b*x) ]; }
                f.isGenerator = false;
                return f;
       })(),
       range: {x:[-10,10],y:[-3,3]},
       plotElement: plot,
       controlsElement: controls,

    })

}
const Plots = {
     LotkaVolterra: LotkaVolterra,
     Sin: Sin,

}
