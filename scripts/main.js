var brush;
var brushes = {
	brick: ['brick', 'Red'],
	forest: ['forest', 'Green'],
	ice: ['ice', 'Blue'],
	land: ['land', 'Black']
};
var canvas = document.getElementById('canvas');
var toolbar = document.getElementById('toolbar');
var instruments = toolbar.children;
var tileSize = 30;
var canvasSize = 600;
var tiles = [];

brush = brushes.land;

document.getElementById('generate').addEventListener('click', GetTilesMap);

for (var i = 0; i < instruments.length; i++) {
	instruments[i].addEventListener('click', SetBrush);
};

function SetBrush(instrumentClick) {
	var selected = instrumentClick.target;
	brush = brushes[selected.id];	
};

function ApplyBrush(tileClick) {
	var tile = tileClick.target;
	var id = tile.getAttribute('id');	
	tile.style.background = brush[1];

	var firstDividerIndex = undefined;
	var secondDividerIndex = undefined;
	var columnId = '';
	var rowId = '';
	for (var i = 0; i < id.length; i++) {				
		if (id[i] === '_' && firstDividerIndex === undefined) {
			firstDividerIndex = i;
			continue;
		}
		else if(id[i] === '_' && secondDividerIndex == undefined) {			
			firstDividerIndex = undefined;
			secondDividerIndex = i;
			continue;
		};	
		
		if (firstDividerIndex !== undefined) {			
			columnId = columnId + id[i];			
		};

		if (secondDividerIndex !== undefined) {			
			rowId = rowId + id[i];			
		};		
	};
	columnId = (columnId / tileSize) |0;
	rowId = (rowId / tileSize) |0;

	tiles[columnId][rowId] = brush;
};


function FillCanvasWithTiles() {
	i = 0;
	var el;

	for (i = 0; i < canvasSize; i = i + tileSize) {
		tiles[(i / tileSize)|0] = [];
		for (var j = 0; j < canvasSize; j = j + tileSize) {
			el = document.createElement('div');
			el.setAttribute('id','tile_' + i + '_' + j);
			el.className = 'tile';
			el.style.position = 'absolute';
			el.style.left = i + 'px';
			el.style.top = j + 'px';
			el.style.border = '1px solid Yellow';
			el.style.height = tileSize;
			el.style.width = tileSize;
			el.addEventListener('click', ApplyBrush);
			canvas.appendChild(el);
			tiles[(i / tileSize)|0][(j / tileSize)|0] = brush;
		};
	};
};

function GetTilesMap() {
	var result = document.getElementById('result');
	result.innerHTML = '';
	result.innerHTML = result.innerHTML + 'var tilesMap = [];';

	var colId;
	var rowId;	
	for (i = 0; i < canvasSize; i = i + tileSize) {
		colId = (i / tileSize)|0;
		result.innerHTML = result.innerHTML + '</br>tilesMap[' + colId + '] = [];</br>';		
		for (var j = 0; j < canvasSize; j = j + tileSize) {
			rowId = (j / tileSize)|0;
			result.innerHTML = 
				result.innerHTML + 
				'tilesMap[' + colId + '][' + rowId + '] = [\'' + tiles[colId][rowId][0] + '\',\'' + 
				tiles[colId][rowId][1] + '\'];';
		};
	};
};

FillCanvasWithTiles();
