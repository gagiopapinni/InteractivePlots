
class InteractivePlot {
  
   constructor(opts){
       this.plotElement = opts.plotElement || null;
       this.controlsElement = opts.controlsElement || null;

     
       this.title = opts.title || "",
       this.parameters = opts.parameters || {};
       this.isGenerator = opts.func.isGenerator;
       this.func =  opts.func.bind(this.parameters.values);
       this.names = opts.names || [];
       this.range = opts.range;
       this.controls = new dat.GUI({ autoPlace: false });
       this.initParamControls();	
       this.template = opts.template.bind(this.parameters.values);
       this.draw();


   }
   initParamControls(){   
       for(let key of Object.keys(this.parameters.values) ){
          let param = this.parameters.values[key];
          this.controls.add(this.parameters.values,
                           key,
                           this.parameters.ranges[key][0],
                           this.parameters.ranges[key][1],
                           0.001
                          ).onChange(()=>this.draw());
         
       }
       this.controlsElement.appendChild(this.controls.domElement);
   }
   calculateFromFunction(numOfPoints){

       let data = [];
       let step = Math.abs(this.range.x[1]-this.range.x[0])/numOfPoints;

       for(let i =0;i<numOfPoints;i++){
          let x = this.range.x[0]+i*step;
          let ys = this.func(x);

          for(let i =0;i<ys.length;i++){
               let y = ys[i];
               if(!data[i]) data.push({x:[],y:[], name: this.names[i]});
               data[i].x.push(x);
               data[i].y.push(y);
          }
       } 
       return data;
   }
   calculateFromGenerator(){

       let data = [];
       let iterator = this.func();
       let next = iterator.next();

       while(!next.done){
          let x = next.value.x;
          let ys = next.value.y;

          for(let i =0;i<ys.length;i++){
               let y = ys[i];
               if(!data[i]) data.push({x:[],y:[], name: this.names[i] });
               data[i].x.push(x);
               data[i].y.push(y);
          }
          next = iterator.next();
       }
       return data;
   }
   calculate(){
       if( this.isGenerator ) return   this.calculateFromGenerator();
       else return this.calculateFromFunction(1000);
   }
   composeAnnotations(){
       let res = [];
       let strings = this.template();
       let size = 15
       for(let i = 0;i<strings.length;i++){
           res.push({ 
                 text:strings[i],
                 x:0,y:this.range.y[1] - size/4 * i,
                 xanchor:"left",
                 yanchor:"center",
                 showarrow:false,
                 font:{
                   family: "Courier New, monopace, sans serif",
                   size: size,
                 }
              })
       }
       return res;
   }
   draw(){
      
       Plotly.newPlot(this.plotElement,this.calculate(),{
           annotations:this.composeAnnotations(),

           title: {
             text:this.title,
             x:0.05,
             font:{
               family: "Courier New, monopace, sans serif",
               size: 20,
             }
           },
           xaxis: {range: this.range.x},
           yaxis: {range: this.range.y },
         }, {staticPlot: true,responsive: true});
    
    }
    destroy(){
         this.controls.destroy();
         this.controlsElement.removeChild(this.controls.domElement)
    }


}




