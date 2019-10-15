import React from "react"
import { PredefinedPlots } from "./PredefinedPlots"
import { Controller } from "./Controller"
import { Plot } from "./Plot"
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap"

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
      <Container fluid>
        <Row className="align-items-left mt-5">
            <ButtonGroup>
               <select  
                  className="custom-select btn-outline-secondary ml-5" 
                  selected={this.state.currentPlot} 
                  onChange={this.onSelectChange}
               >
                  <option value="LotkaVolterra">Lotka-Volterra</option>
                  <option value="Sin">Sin</option>
               </select>
               <Button variant="outline-secondary"
                  onMouseDown={()=>alert("implement me!")} 
               > +Add </Button>
            </ButtonGroup>

            <div className=" ml-3">
               <Button variant="outline-secondary dropdown-toggle" 
                    onMouseDown={()=>{this.setState({showController:!this.state.showController})}}
                  > 
                   Parameters
               </Button>
               <Controller
                         className="mt-2"
                         key={this.state.currentPlot.title}
                         onChange={this.onControllerChange}
                         parameters={this.state.currentPlot.parameters} 
                         show={this.state.showController}
                        
               />
            </div> 
        </Row>

        <Row className="h-100" >
          <Col className="h-100" xs="12">
            <Plot
                  style={ {height:"90%"} } 
                  { ...this.state.currentPlot } 
            />
          </Col>
        </Row>

      </Container> );

   }

}
