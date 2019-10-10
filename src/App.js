import { PredefinedPlots } from "./PredefinedPlots"
import { Controller } from "./Controller"
import { Plot } from "./Plot"

export class App extends React.Component {
   constructor(props){
        super(props);

        this.state = {
           currentPlot: Object.assign({},PredefinedPlots["LotkaVolterra"]),
           showController:false,
        }
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onControllerChange = this.onControllerChange.bind(this);
   }
   onSelectChange(e){
        this.setState({currentPlot: Object.assign({},PredefinedPlots[e.target.value])});
   }
   onControllerChange(params){
        let current = Object.assign({},this.state.currentPlot);
        current.parameters = params;
        this.setState({currentPlot:current});
   }
   render(){
     return (
      <div className="container-fluid">
        <div className="row align-items-left mt-5">
           <div className="btn-group " role="group">
             <select  
                  className="custom-select btn-outline-secondary ml-5" 
                  selected={this.state.currentPlot} 
                  onChange={this.onSelectChange}
             >
                  <option value="LotkaVolterra">Lotka-Volterra</option>
                  <option value="Sin">Sin</option>
             </select>
             <div className="btn btn-outline-secondary"
                  onMouseDown={()=>alert("implement me!")} 
             > +Add </div>
            </div>
            <div className=" ml-3">
               <button className="btn btn-outline-secondary dropdown-toggle" 
                    onMouseDown={()=>{this.setState({showController:!this.state.showController})}}
                  > 
                   Parameters
               </button>
               <Controller
                         className="mt-2"
                         key={this.state.currentPlot.title}
                         onChange={this.onControllerChange}
                         parameters={this.state.currentPlot.parameters} 
                         show={this.state.showController}
                        
               />
            </div> 
                 

        </div>
        <div className = "row h-100" >
          <div className="col-12 h-100">
            <Plot
                  style={ {height:"90%"} } 
                  { ...this.state.currentPlot } 
            />
          </div>
        </div>
      </div> );

   }

}
