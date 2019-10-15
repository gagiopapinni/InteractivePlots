import React from "react"
import * as dat from 'dat.gui';

export class Controller extends React.Component {
  
   constructor(props){
       super(props);
 
       this.controlsRef = React.createRef();
       this.handleControlsChange = this.handleControlsChange.bind(this);
   }

   handleControlsChange(params){
        this.props.onChange(params);

   }
   draw(){
      
           const controls = new dat.GUI({ autoPlace: false }),
                 params = Object.assign({},this.props.parameters);
           for(let key of Object.keys(params.values) ){
               let param = params.values[key];
               controls.add(params.values,
                           key,
                           params.ranges[key][0],
                           params.ranges[key][1],
                           0.001
                          ).onChange(()=>this.handleControlsChange(params));
         
           }
           this.controlsRef.current.appendChild(controls.domElement);
           
 
   }
 
   componentDidMount(){ this.draw(); }
   render(){
 
       let controller = 
            (
                  <div   className={this.props.className} style={this.props.style}
                         ref={this.controlsRef}   
                         style={ {position:"absolute",
                                  zIndex:1,
                                  opacity:0.8,
                                  display: this.props.show?"block":"none",
                                 } 
                               }
                  />

             );
           
       return controller;
    
    }
   

}




