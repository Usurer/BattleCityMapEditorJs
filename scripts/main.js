var brush;
var toolbar = document.getElementById('toolbar');
var instruments = toolbar.children;

for (var i = 0; i < instruments.length; i++) {
	instruments[i].addEventListener('click', SetBrush);
};

function SetBrush(instrumentClick) {
	var selected = instrumentClick.target;
	switch (selected.id) {
		case 'brush_brick': 
			brush = 'brick';
			break;
		default:
			brush = undefined;
			break;
	};
}

