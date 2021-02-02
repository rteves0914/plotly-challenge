// Create variable to JSON data
var json = 'samples.json'

// Import JSON data using d3 and log to the console to view
d3.json(json).then(function(data) {
    console.log(data);

// Use d3 to select the dropdown menu
  var dropdown = d3.select('#selDataset');

// Loop through each name in the JSON and store in an option tag
  data.names.forEach(name => {
    dropdown.append('option').text(name).property('value', name)
  });

// Set up the trace for the bar chart (create slicing and reverse in x variable)
  var trace1 = {
    x: data.samples[0].sample_values.slice(0,10),
    y: data.samples[0].otu_ids,
    hover_data: data.samples[0].otu_labels,
    orientation: 'h',
    type: 'bar',
    width: 150
  };

// Create the data array for the bar chart
  var bar1 = [trace1];

// Define the plot layout for the bar chart
  var layout1 = {
    title: "Amount of bacteria for each OTU",
    xaxis: {title: "Frequency"},
    yaxis: {title: "OTU ID"}
  };

// Use plotly to plot the bar chart
  Plotly.newPlot("bar", bar1, layout1);

// Set up the trace for the bubble chart
  var trace2 = {
    x: data.samples[0].otu_ids,
    y: data.samples[0].sample_values,
    text: data.samples[0].otu_labels,
    mode: 'markers',
    marker: {
      color: data.samples[0].otu_ids,
      size: data.samples[0].sample_values
    }
  };

// Create the data array for the bubble chart
  var bubble2 = [trace2];

// Define the plot layout for the bubble chart
  var layout2 = {
    title: "Amount of bacteria for each OTU",
    xaxis: {title: "OTU ID"},
    yaxis: {title: "Frequency"}
  };  

// Use plotly to plot the bubble chart
  Plotly.newPlot("bubble", bubble2, layout2);

// Build the demographic info table using the map function and arrow
  var idArray = data.metadata.map(item => item.id);
  var ethnicityArray = data.metadata.map(item => item.ethnicity);
  var genderArray = data.metadata.map(item => item.gender);
  var ageArray = data.metadata.map(item => item.age);
  var locationArray = data.metadata.map(item => item.location);
  var bbtypeArray = data.metadata.map(item => item.bbtype);
  var wfreqArray = data.metadata.map(item => item.wfreq);
  
// Use d3 to select the id sample-metadata
  var list = d3.select("#sample-metadata");
  var ul = list.append("ul")

// Append li tag with key value pair
    ul.append("li").text(`id: ${idArray[0]}`);
    ul.append("li").text(`ethnicity: ${ethnicityArray[0]}`);
    ul.append("li").text(`gender: ${genderArray[0]}`);
    ul.append("li").text(`age: ${ageArray[0]}`);
    ul.append("li").text(`location: ${locationArray[0]}`);
    ul.append("li").text(`bbtype: ${bbtypeArray[0]}`);
    ul.append("li").text(`wfreq: ${wfreqArray[0]}`);
    
});
