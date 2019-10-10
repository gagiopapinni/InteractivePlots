
export class Plot extends React.Component {
  
   /**
       React plot component
  
       @param {Object} props - properties of the Plot
       @param {string} props.title - Title of the plot.

       @param {Object} props.range - An object, containing ranges of bot x and y axis. 
       @param {Array} props.range.x - range of x axis
       @param {number} props.range.x.0 - start
       @param {number} props.range.x.1 - end
       @param {Array} props.range.y - range of y axis
       @param {number} props.range.y.0 - start
       @param {number} props.range.y.1 - end

       @param {Object} props.parameters - parameters used by the plot generator function.
       @param {Object} props.parameters.values - maps a name of a parameter to its value like this: {"a": 5, ...}
       @param {Object} props.parameters.ranges - maps a name of a parameter to its allowed range like this: {"a": [1,10], ...}

       @param {Generator} props.func(precision) - generator of actual plot data. Takes an only argument - 
        precision, which is a small real number, defining the step of discretistion. Has parameters.values object as its context.

       @param {Array} props.names - an arrays of names that will be assigned to each trace of the plot.
       Assignment happends by matching indices of this array with indices of the props.func output array 
          containing y coordinates for each trace. Displayed only if there are more then one trace.

       @param {Function} props.annotation - a function returning [...string]. Each string in the array is considered 
       to be a new line in resulting annotation. Has props.parameters.values as its context.
       Usually, this is just a formula of the displayed plot.
       

       @constructor
   */
   constructor(props){
       super(props);
       this.plotRef = React.createRef();
   }

   calculate(){
       let data = [];
       let iterator = this.props.func.call(this.props.parameters.values,0.01);    
       let next = iterator.next();

       while(!next.done){
          let x = next.value.x;
          let ys = next.value.y;

          for(let i =0;i<ys.length;i++){
               let y = ys[i];
               if(!data[i]) data.push({x:[],y:[], name: this.props.names[i] || "-" });
               data[i].x.push(x);
               data[i].y.push(y);
          }
          next = iterator.next();
       }
       return data;

   }

   composeAnnotations(){
       let res = [];
       let strings = this.props.annotation.call(this.props.parameters.values);
       let size = 15
       for(let i = 0;i<strings.length;i++){
           res.push({ 
                 text:strings[i],
                 x:0,y:this.props.range.y[1] - size/4 * i,
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
         let data = this.calculate();
         Plotly.newPlot(this.plotRef.current,data,{
           annotations:this.composeAnnotations(),
           title: {
             text:this.props.title,
             x:0.05,
             font:{
               family: "Courier New, monospace, sans serif",
               size: 20,
             }
           },
           xaxis: {range: this.props.range.x},
           yaxis: {range: this.props.range.y},
         }, {staticPlot: true,responsive: true});
       
   } 

   componentDidMount(){ this.draw(); }
   componentDidUpdate(){ this.draw(); }
   render(){
       let plot = <div style={this.props.style} className={this.props.className} ref={this.plotRef} />;
       return plot;
   }
   

}




