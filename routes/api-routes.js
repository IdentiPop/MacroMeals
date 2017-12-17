var calculator = require ("./calculator.js");

var db = require("../models");

module.exports = function (app){

app.put ("/profile", function (req, res) {
 var id = req.session.passport.user;
  var mifflinStJeor = req.body.mifflinStJeor;
if (req.body.mifflinStJeor === "true"){
  req.body.mifflinStJeor = true;
  mifflinStJeor = true;

}
else if (req.body.mifflinStJeor === "false"){
  req.body.mifflinStJeor = false;
  mifflinStJeor = false;
}
var ft = parseFloat(req.body.ft);
var lbs = parseFloat(req.body.lbs);
var inches = parseFloat(req.body.inches);
var age = parseFloat(req.body.age);
var exerciseLevel = parseFloat(req.body.exerciseLevel);
var goal = parseFloat(req.body.goal);

  calculator(req.body.gender, age, ft, inches, lbs, mifflinStJeor, exerciseLevel,  goal,

    function (calculator){
      var profile ={
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              gender: req.body.gender,
              age: age,
              ft: ft,
              inches: inches,
              lbs: lbs,
              goal: goal,
              exerciseLevel: exerciseLevel,
              mifflinStJeor: mifflinStJeor,
              calories: calculator.tdee,
              protein: calculator.protein,
              fat: calculator.fat,
              carbs: calculator.carbs
            };

      console.log(JSON.stringify(profile, null, 2));


      db.user.update(
        {
          firstname : profile.firstname,
          lastname: profile.lastname,
          username: profile.username,
          gender: profile.gender,
          age: profile.age,
          ft: profile.ft,
          inches: profile.inches,
          lbs: profile.lbs,
          goal: profile.goal,
          exerciseLevel: profile.exerciseLevel,
          mifflinStJeor: profile.mifflinStJeor,
          calories: profile.calories,
          protein: profile.protein,
          fat: profile.fat,
          carbs: profile.carbs
        },

        {where: {id: id}}

      ).then(function(err, result) {
        if (err){
          console.log (err);
        }
         res.json(profile);
         res.end();
      });





});

});


};
