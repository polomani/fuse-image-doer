var Observable = require("FuseJS/Observable");
var imagePath = Observable();
var editModes = require("modules/EditModes");
var stickers = require("modules/Stickers");

function  pickImage()  {
	var cameraRoll = require("FuseJS/CameraRoll");

	cameraRoll.getImage()
	    .then(function(image) {
	        imagePath.value = image.path;
	        editModes.initSizes(image.width, image.height);
	    }, function(error) {
	        console.log(JSON.stringify(error));
	    });
}

module.exports = {
	stickers: stickers,
	imagePath:imagePath,
	editModes: editModes,
	currentMode: editModes.currentMode,
	chooseMode: editModes.chooseMode,

	pickImage: pickImage
};
