var Observable = require("FuseJS/Observable");
var stickers = Observable();
var stickersPanelVisibility = Observable("Collapsed");

var stickersFiles = [
	"assets/stickers/1.png",
	"assets/stickers/2.png",
	"assets/stickers/3.png",
	"assets/stickers/4.png",
	"assets/stickers/5.png",
	"assets/stickers/6.png",
	"assets/stickers/7.png",
	"assets/stickers/8.png",
	"assets/stickers/9.png",
	"assets/stickers/10.png",
	"assets/stickers/11.png",
	"assets/stickers/12.png",
	"assets/stickers/13.png",
	"assets/stickers/14.png",
	"assets/stickers/15.png",
	"assets/stickers/16.png",
	"assets/stickers/17.png"
];

function addSticker(arg) {
	stickers.add ({src:arg.data, scale:Observable(0.5)});
	toggleStickerPanel();
}

function toggleStickerPanel() {
	toggleVisibility(stickersPanelVisibility);
}

function toggleVisibility (target) {
	if (target.value == "Visible") {
		target.value = "Collapsed";
	}
	else {
		target.value = "Visible";
	}
}

module.exports = {
	items:stickers,
	files:stickersFiles,
	panelVisibility: stickersPanelVisibility,
	addSticker: addSticker,
	togglePanel: toggleStickerPanel
};