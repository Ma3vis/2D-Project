
//-Move.js -- Core component that handles animations and player input


//-Essentials

var North           = COMMAND_MOVE_NORTH;
var South           = COMMAND_MOVE_SOUTH;
var West            = COMMAND_MOVE_WEST; 
var East            = COMMAND_MOVE_EAST; 
var Wait            = COMMAND_WAIT;      
var Face_north      = COMMAND_FACE_NORTH;
var Face_south      = COMMAND_FACE_SOUTH;
var Face_east       = COMMAND_FACE_EAST;
var Face_west       = COMMAND_FACE_WEST;

var Steps = 14;
var LastTileX = 0; //<-- Gets Tile we were at before
var LastTileY = 0;
var NowTileX = 0; //<--Gets Tile we're at now
var NowTileY = 0;
var Fix_Warp = false;

function DoesPersonExist(name){
	
	var list = GetPersonList();
	for (var i = 0; i < list.length; ++i)
	{
		if (list[i] == name) return true;
	}
	return false;
}










  //======================\\
 //-------MOVEMENT----------\\
//============================\\

function Movement(){

	var	Player = GetInputPerson();
	var Dir = GetPersonDirection(Player)
	if (!IsCommandQueueEmpty(Player)) return;

	var x = Math.floor(GetPersonX(Player) / 16);
	var y = Math.floor(GetPersonY(Player) / 16);
	if (x < 0 || y < 0) return;

	TileName = GetTileName(GetTile(x, y, 0));
	NextTileName = GetTileName(GetTileInFront());
	var Command = null;
	
	//Start defining keys here
	if (IsKeyPressed(KEY_UP)   ) { 
			Command = North; QueuePersonCommand(Player, Face_north, true);
			if (IsPersonObstructed(Player, GetPersonX(Player), GetPersonY(Player)-7) == false) Steps++;
			if (IsPersonObstructed(Player, GetPersonX(Player), GetPersonY(Player)-16) == false) LastTileY = GetPersonY(Player);
			if (IsPersonObstructed(Player, GetPersonX(Player), GetPersonY(Player)-16) == false) NowTileY = GetPersonY(Player) - 16;}
			
	if (IsKeyPressed(KEY_DOWN) ) { 
			Command = South; QueuePersonCommand(Player, Face_south, true);
			if (IsPersonObstructed(Player, GetPersonX(Player), GetPersonY(Player)+7) == false) Steps++;
			if (IsPersonObstructed(Player, GetPersonX(Player), GetPersonY(Player)+16) == false) LastTileY = GetPersonY(Player);
			if (IsPersonObstructed(Player, GetPersonX(Player), GetPersonY(Player)+16) == false) NowTileY = GetPersonY(Player) + 16;}
	
	if (IsKeyPressed(KEY_RIGHT)) { 
		Command = East ; QueuePersonCommand(Player, Face_east, true) ; 
		if (IsPersonObstructed(Player, GetPersonX(Player)+16, GetPersonY(Player)) == false) Steps++;
		if (IsPersonObstructed(Player, GetPersonX(Player)+16, GetPersonY(Player)) == false) LastTileX = GetPersonX(Player);
		if (IsPersonObstructed(Player, GetPersonX(Player)+16, GetPersonY(Player)) == false) NowTileX = GetPersonX(Player) + 16;}
	
	if (IsKeyPressed(KEY_LEFT) ) { 
		Command = West ; QueuePersonCommand(Player, Face_west, true) ; 
		if (IsPersonObstructed(Player, GetPersonX(Player)-16, GetPersonY(Player)) == false) Steps++;
		if (IsPersonObstructed(Player, GetPersonX(Player)-16, GetPersonY(Player)) == false) LastTileX = GetPersonX(Player);
		if (IsPersonObstructed(Player, GetPersonX(Player)-16, GetPersonY(Player)) == false) NowTileX = GetPersonX(Player) - 16;}

	
	IgnoreTileObstructions(Player, false);
	
	if (Command != null && !IsObstructed(Player, Command)) { 
		for (var i = 0; i < 16; ++i) { 
		QueuePersonCommand(Player, Command, false); }}	
	
	
	if (IsCommandQueueEmpty(Player) == true) {SetPersonFrame(Player, 0);}

}





  //=========================\\
 //-------OBSTRUCTIONS--------\\
//=============================\\


// This is used to check if a given person can move -Radnen
function IsObstructed(name, command) {
	
	var H = 0, W = 0;
	var X = GetPersonX(name);
	var Y = GetPersonY(name);
	
	switch(command) {
		case COMMAND_MOVE_NORTH: H = -1; break;
		case COMMAND_MOVE_SOUTH: H =  1; break;
		case COMMAND_MOVE_EAST:  W =  1; break;
		case COMMAND_MOVE_WEST:  W = -1; break;
		default: return false; break;}

	if (IsPersonObstructed(name, X+W, Y+H)) return true;
	if (IsPersonObstructed(name, X+(W>>1), Y+(H>>1))) return true;
	return false; // just in case
}



//==========================\\
//-----Tile-Placement--------\\
//============================\\


function Txy(name, x, y) {SetPersonX(name, (x*16) + 7); SetPersonY(name, (y*16) + 7);}
function Pxy(name, x, y) {SetPersonX(name, x); SetPersonY(name, y);}



function CameraMoveTo(x, y){

	TimeCatch = GetTime();
	for (var i = 0; i < 24;){
		SetCameraY(GetCameraY()-1); 
		while(TimeCatch + 100 > GetTime()){ ++i;}
		TimeCatch = GetTime();}
}



function GetTileInFront() // <--To get the tile in front of the player. -from: Pokemon Classic
{
	var direction = GetPersonDirection(GetInputPerson());
	if (direction == "north") return GetTile(GetPersonX(GetInputPerson())/16, GetPersonY(GetInputPerson())/16-1, 0); //(NowTileX/16,NowTileY/16-1,0);
	if (direction == "south") return GetTile(GetPersonX(GetInputPerson())/16, GetPersonY(GetInputPerson())/16+1, 0); //(NowTileX/16,NowTileY/16+1,0);
	if (direction == "west") return GetTile(GetPersonX(GetInputPerson())/16-1, GetPersonY(GetInputPerson())/16, 0); //(NowTileX/16-1,NowTileY/16,0);
	if (direction == "east") return GetTile(GetPersonX(GetInputPerson())/16+1, GetPersonY(GetInputPerson())/16, 0); //(NowTileX/16+1,NowTileY/16,0);
}