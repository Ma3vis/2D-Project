//-Main.js -- Core component that handles and redirects important functions

//RequireScript("Load.js");   //<--Lists Variables and Media
//RequireScript("Menu.js");  //<--Menu and Action Interface for game
RequireScript("Move.js");   //<--For Animation and Player Input
RequireScript("Stats.js"); //<--Lists Character Statistics for battle
//RequireScript('Fight.js');






  //========================\\
 //-------GAME-SETUP---------\\
//============================\\

function game() 
{
	BindKey(KEY_UP, '', '');
	BindKey(KEY_DOWN, '', '');
  BindKey(KEY_LEFT, '', '');
  BindKey(KEY_RIGHT, '', '');
	
	//RandomChart();
	SetUpdateScript('Update()');
	//SetRenderScript("Render()");
	
	Game_Setup();
	
	MapEngine("Test02.rmp", 30);
}






  //========================\\
 //----IMPORTANT-FUNCTIONS---\\
//============================\\


function Game_Setup(){

	SetClippingRectangle(89, 49, 160, 144);
	
	CreatePerson(Person[1].Name, Person[1].Sprite, false);
	AttachInput(Person[1].Name);
	AttachCamera(Person[1].Name);
	
}


function Update(){

	Movement();
	
}
