function buildMetadata(sample) {
    let metadataURL = `/metadata/${sample}`;
    console.log(sample);
  // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
      d3.json(metadataURL).then((data) => {
        console.log(data);
    // Use d3 to select the panel with id of `#sample-metadata`
        let metadataValue = d3.select("#sample-metadata");
        d3.select("#sample-metadata");
        // Use `.html("") to clear any existing metadata
        metadataValue.html("")
        let pbody = metadataValue.append("p");
        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(data).forEach(function([key, value]) {
          console.log(key, value);
          let cell = pbody.append("p");
          cell.text(key+": "+value);
      })
    });
};
    
//     // BONUS: Build the Gauge Chart
//     // buildGauge(data.WFREQ);
//     // Enter a speed between 0 and 180
//       var level = 175;

//     // Trig to calc meter point
//     var degrees = 180 - level,
//         radius = .5;
//     var radians = degrees * Math.PI / 180;
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);

//     // Path: may have to change to create a better triangle
//     var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//         pathX = String(x),
//         space = ' ',
//         pathY = String(y),
//         pathEnd = ' Z';
//     var path = mainPath.concat(pathX,space,pathY,pathEnd);

//     var data = [{ type: 'scatter',
//       x: [0], y:[0],
//         marker: {size: 28, color:'850000'},
//         showlegend: false,
//         name: 'speed',
//         text: level,
//         hoverinfo: 'text+name'},
//       { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
//       rotation: 90,
//       text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
//                 'Slow', 'Super Slow', ''],
//       textinfo: 'text',
//       textposition:'inside',
//       marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                             'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
//                             'rgba(255, 255, 255, 0)']},
//       labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
//       hoverinfo: 'label',
//       hole: .5,
//       type: 'pie',
//       showlegend: false
//     }];

//     var layout = {
//       shapes:[{
//           type: 'path',
//           path: path,
//           fillcolor: '850000',
//           line: {
//             color: '850000'
//           }
//         }],
//       title: '<b>Gauge</b> <br> Speed 0-100',
//       height: 1000,
//       width: 1000,
//       xaxis: {zeroline:false, showticklabels:false,
//                 showgrid: false, range: [-1, 1]},
//       yaxis: {zeroline:false, showticklabels:false,
//                 showgrid: false, range: [-1, 1]}
//     };

//     Plotly.newPlot('myDiv', data, layout);
//     }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
      let metadataURL = `/samples/${sample}`;
      console.log(sample);
        d3.json(metadataURL).then((sample) => {
          console.log(sample);
          console.log(sample.otu_ids);
        
    // @TODO: Build a Bubble Chart using the sample data
         trace1 = {
          x: sample.otu_ids,
          y: sample.sample_values,
          text: sample.otu_labels,
          mode: 'markers',
          type: 'scatter',
          marker: {
            size: sample.sample_values,
            color: sample.sample_values
          },
        };
          
          trace1 = [trace1];
    
          layout = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 700,
            width: 1000
          };

        d3.select("#bubble");
        Plotly.newPlot("bubble", trace1, layout);
        
        // @TODO: Build a Pie Chart

          trace2 = [{
            values: sample.sample_values.slice(0,10),
            labels: sample.otu_ids.slice(0,10),
            hoverinfo: sample.otu_labels.slice(0,10),
            type: "pie"
          }];
      
          Plotly.newPlot("pie", trace2);
        });
};




//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).
//     array.slice(start, end)
// }

function init() {
  console.log("init()");
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
