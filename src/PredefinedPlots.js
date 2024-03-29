
const PredefinedPlots = {};


const lvRange = {x:[0,50],y:[0,50]};
PredefinedPlots["LotkaVolterra"] = 
    {
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
       annotation: function (){

          return [
                  `x'(t) = ${this.a1}x(t) + ${this.b1}x(t)y(t)`,
                  `y'(t) = ${this.a2}y(t) + ${this.b2}x(t)y(t)`,
                  `x0 = ${this.x0}, y0 = ${this.y0}`,
                 ];
       },
       title: "Lotka-Volterra model",
       names: ['predator','prey'],
       func: function* func(precision){
                     let x = this.x0,
                         y = this.y0,
                         iterations = (lvRange.x[1] - lvRange.x[0])/precision,
                         first_der_x = ( xt, yt,a,b)=> a*xt + b*xt*yt,
                         first_der_y = ( xt, yt,a,b)=> a*yt + b*xt*yt;
                     for(let i=0;i<iterations;i++){
                         let next_x = x + precision * first_der_x(x,y,this.a1,this.b1),
                             next_y = y + precision * first_der_y(x,y,this.a2,this.b2);
                         x = next_x;
                         y = next_y;
                         yield { x: lvRange.x[0] + precision*i, y:[x,y] };
                     }
       },

   
       range: lvRange,

    };



const sinRange = {x:[-10,10],y:[-3,3]};
PredefinedPlots["Sin"] = 
    {
       parameters: { 
          values:{
              a:1,b:1,
          },
          ranges:{
              a:[-3, 3 ],
              b:[-10, 10 ],
          }
       },
       annotation: function (){

          return [
                  `y(x) = ${this.a}sin(${this.b}x)`

                 ];
       },
       title: "Sin function",
       names: ['sin'],
       func: function* func(precision){
                     let iterations = (sinRange.x[1]-sinRange.x[0])/precision,
                         x0 = sinRange.x[0];
                     for(let i=0;i<iterations;i++)
                         yield { x:x0+precision*i, y:[ this.a*Math.sin((x0+precision*i)*this.b) ] };
                     
       },
       range: sinRange,
    };

export {PredefinedPlots};

