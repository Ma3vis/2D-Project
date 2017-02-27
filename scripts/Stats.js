
//-Stats.js -- Holds player information and character statistics



function Stats (Name, Hp, Str, Sta)
{
  this.Name   = Name;
  
  this.Hp     = Hp;    	//HP (Health Points)
  this.MaxHp  = Hp;  	  //max HP
  
  this.Str    = Str;	  //strength (attack power)
  this.Sta    = Sta;	  //stamina (defense)
  this.Atk    = 10;  	  // str + weapon atk
  this.Def    = 10;    	// sta + armor/helmet/sheild def
  
  this.Level  = 1;    	// The players current level
  this.Exp    = 0;	    //exp levels
  
  this.Type = 0;
  this.Active = 0;      //is member in Party 
  this.Sprite = "";
  
  //this.X = GetPersonX(Name);
  //this.Y = GetPersonY(Name);
}


var Person = new Array();

Person[0] = new Stats ("Blank", 0, 0, 0, 0);
Person[0].Type = 1;
Person[0].Active = 0;
Person[0].Sprite = "Main.rss";

Person[1] = new Stats ("Player", 100, 12, 4, 12);
Person[1].Type = 1;
Person[1].Active = 1;
Person[1].Sprite = "Test.rss";
Person[1].Def = Person[0].Sta; 	 
Person[1].Atk = Person[0].Str; 	


var Party = new Array();  //<--current party line-up:
Party[0] = 1;	
Party[1] = 1;
Party[2] = 1;

