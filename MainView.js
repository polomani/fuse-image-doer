var Observable = require("FuseJS/Observable");
var imagePath = Observable(); // Observable("assets/owl.jpg"); 
var labels = Observable();
var editModes = require("modules/EditModes");
var currentMode = Observable();
currentMode.value = {type:""}; //editModes.getAt(0);
//editModes.initSizes(400, 270);

function addLabel() {
	labels.add({text:"text", x:0, y:0});
}

function  pickImage()  {
	var cameraRoll = require("FuseJS/CameraRoll");

	cameraRoll.getImage()
	    .then(function(image) {
	        imagePath.value = image.path;
	        editModes.initSizes(image.width, image.height);
	    }, function(error) {
	        // Will be called if the user aborted the selection or if an error occurred.
	    });
}

function chooseMode(arg) {
	currentMode.value = arg.data;
}

module.exports = {
	labels:labels,
	imagePath:imagePath,
	scale: editModes.rotate.scale,
	editModes: editModes,
	currentMode: currentMode,

	pickImage: pickImage,
	addLabel: addLabel,
	chooseMode: chooseMode
};
