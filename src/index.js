const selector = document.getElementById("select");

let currentPlot = Plots[selector.value]();

selector.addEventListener("change",(e)=>{
      currentPlot.destroy();
      currentPlot = Plots[e.target.value]();

})

