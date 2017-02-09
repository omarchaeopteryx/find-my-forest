 me = User.create!(username:"first",email:"first",password:"first");

it = Hike.create!(user_id:1, area_id:1);

where = Area.create!(description:"Miner's Loop");
