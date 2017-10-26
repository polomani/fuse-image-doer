var Observable = require("FuseJS/Observable");
var imgWidth = 0;
var imgHeight = 0;

var editModes = [
	{type:"rotate", props: [{name:"degrees", max:180, min:-180, val:Observable(0)}]},
	{type:"contrast", props: [
		{name:"contrast", max:2, min:0, val:Observable(1.5)},
		{name:"brightness", max:0.5, min:-0.5, val:Observable(0)}
	]},
 	{type:"blur", props: [{name:"radius", max:20, min:1, val:Observable(10.5)}]},
 	{type:"desaturate", props: [{name:"amount", max:1, min:0, val:Observable(0.5)}]},
 	{type:"halftone", props: [
	 	{name:"intensity", max:1, min:0, val:Observable(0.5)},
	 	{name:"dottint", max:1, min:0, val:Observable(0.5)},
	 	{name:"spacing", max:25, min:1, val:Observable(13)}
	]}
];

function indexModes() {
	for (var i = 0; i < editModes.length; ++i)
		indexMode(editModes[i]);


	function indexMode(mode) {
		editModes[mode.type] = mode;	
		var props = mode.props;

		for (var i = 0; i < props.length; ++i)
			mode[props[i].name] = props[i];
	}
}

indexModes();

editModes.rotate.scale = editModes.rotate.degrees.val.map (function (degrees) { 
	return scaleToFill (degrees);
	});

function scaleToFill (degrees) {
	var radians = Math.abs(degrees/180*Math.PI);
    var theta = Math.abs(radians - 2*Math.PI*parseInt(radians/Math.PI/2) - Math.PI);
    if (theta > Math.PI/2) {
        theta = Math.abs(Math.PI - theta);
    }
	var h = imgHeight;
    var w = imgWidth;
    var scale1 = (h*Math.cos(theta) + w*Math.sin(theta))/h;
    var scale2 = (h*Math.sin(theta) + w*Math.cos(theta))/w;
    var scaleFactor = Math.max(scale1, scale2);
    return scaleFactor;
}

editModes.initSizes = function(imageWidth, imageHeight) {
	imgWidth = imageWidth;
	imgHeight = imageHeight;

	//refresh
	editModes.rotate.degrees.val.value = editModes.rotate.degrees.val.value;
};

module.exports = editModes;