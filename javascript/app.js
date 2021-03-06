
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCvczcDpxG0nIWYMR4Df_hPM4LiHGPnop4",
  authDomain: "project-one-54fbd.firebaseapp.com",
  databaseURL: "https://project-one-54fbd.firebaseio.com",
  projectId: "project-one-54fbd",
  storageBucket: "project-one-54fbd.appspot.com",
  messagingSenderId: "945661053221"
};
firebase.initializeApp(config);

var database = firebase.database();
var username;

console.log(username);
signIn();
//Signing in
function signIn() {
  if (localStorage.getItem("username") === null) {
    $(".hello").hide();
    $("#log-in").click(function () {
      username = $("#validationDefault01").val();
      database.ref(`/${username}`).set({ visits: 0 });
      localStorage.setItem("username", username);
      $("#username").text(username);
      $("#sign-in").hide();
      $(".hello").show();

    });
  }
  else {
    $("#sign-in").hide();
    username = localStorage.getItem("username");
    console.log(username);
    $("#username").empty();
    $(".hello").show();
    $("#username").text(username);

    database.ref(`/${username}/visits`).once("value").then(function (snapshot) {
      console.log(snapshot.val());
      var currentCount = snapshot.val();
      currentCount++;
      database.ref(`/${username}/visits`).set(currentCount);

      // console.log(Object.keys(snapshot.val()));
      // var firebaseFavorite = Object.values(snapshot.val());
      // firebaseFavorite ++;
      //  database.ref(`"/${name}/visit"`).update(firebaseFavorite);
      // console.log(firebaseFavorite);
    });

  }





}

// database.ref(`"/${name}/favorite"`).once("value").then(function (snapshot) {

//        console.log(Object.keys(snapshot.val()));
//        var firebaseFavorite = Object.values(snapshot.val());
//         firebaseFavorite.push(recipe2);
//        console.log(firebaseFavorite);
//       database.ref(`"${name}/favorite"`).set(firebaseFavorite);

// });


// $(".hello").hide();
// $("#log-in").click(function () {




//   $(".hello").show();
//   $("#username").empty();

//   var username = $("#validationDefault01").val();
//   database.ref(`/${username}`).set("Shopping List");
//   localStorage.setItem("username", username);
//   $("#username").text(username);
// })


//Getting Data From the API and putting into an object

//Array of recipes with data to populate search results.  Starts empty and changes based on the search button that is selected.
var recipeArray = [];

// search query from button selected
var searchQuery = "";
// This function calls the API for getting summerized recipe information to populate the search results.
function returnSearchResultsForApi() {

  $.ajax({
    // the headers are required by the API
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&query=" + searchQuery + "&type=main+course",
    method: "GET",
    headers: {
      "X-Mashape-Key": "M1t9h6bSWOmshPTVemfyZqQgd4ogp1HsYgsjsnSCG4Kb6mjzvX",
      "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
    }
  })
    .then(function (response) {
      // console.log for testing
      console.log(response);
      console.log(response.results[0].id);
      console.log(response.results[0].image);
      console.log(response.results[0].readyInMinutes);
      console.log(response.results[0].servings);
      console.log(response.results[0].title);
      console.log(response.baseUri);

      //Clear the recipe array before pushin new data
      recipeArray = [];

      // This for loop pushes key values for the API search into variables that then are used to create an object that is pushed to the recipe array 
      for (var i = 0; i < response.results.length; i++) {
        var id = response.results[i].id;
        var image = response.baseUri + response.results[i].image;
        var readyInMinutes = response.results[i].readyInMinutes;
        var servings = response.results[i].servings;
        var title = response.results[i].title;

        var recipe = {
          id: id,
          image: image,
          readyInMinutes: readyInMinutes,
          servings: servings,
          title: title
        }
        recipeArray.push(recipe);

      }
      console.log("Recipe Array " + recipeArray);
      for (var i = 0; i < 9; i++) {
        $(`#${i + 1}`).html(`
          <img class="card-img-top card-image" src="${recipeArray[i].image}" alt="Recipe Image"
            style="position:relative">
          <div class="card-body">
            <h5 class="card-title" id="recipe-name">${recipeArray[i].title}</h5>
            <p class="card-text">"Servings: ${recipeArray[i].servings}"</p>
            <p class="card-text">"Preparation Time: ${recipeArray[i].readyInMinutes} minutes"</p>
          </div>
<div class="card-footer">
  <small class="text-muted">
                <button type="button" class="btn btn-warning view-recipe" data-recipeId="${recipeArray[i].id}" data-toggle="modal" data-target=".bd-example-modal-lg">Click
                for Recipe!</button>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div id="printJS-form">
                        <div class="modal-header">
                           <h3 class="modal-title" id="display-recipe-name"></h3>
                           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div class="modal-body">
                          <img class="recipe-image">
                        </div>
                        <div class="container-fluid">
                            <div class="row recipe-pre">
                              <div class="col-md-4 ml-auto vl display-servings"></div>
                              <div class="col-md-4 ml-auto vl display-cook-time"></div>
                              <div class="col-md-4 ml-auto display-likes"></div>
                            </div>
                            <br>
                            <div class="row">
                                  <div class="col-md-12 ml-auto">
                                    <div data-target="ingredients">
                                      <h3>Ingredients: </h3>
                                    </div>
                                    <ul class="recipe-content" id="ingredients-appear-here"></ul>
                                  </div>
                            </div>
                            <br>
                            <div class="row">
                                 <div class="col-lg-12 ml-auto">
                                      <div data-target="instructions">
                                         <h3>Instructions: </h3>
                                       </div>
                                  <div class="recipe-content" id="instructions-appear-here"></div>
                             </div>
                             <div class="row">
                                    <div class="col-lg-10 ml-auto">
                                          <div class="display-source"></div>                           
                                    </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                              <button class="btn btn-outline-primary btn-circle" type="button" data-icon="printer"></button> 
                              <button class="btn btn-outline-info btn-circle" data-icon="shopping-icon" id="to-shopping-list"></button>
                        </div> 
                  </div>
          </div>
       </div>
    </div>
  </small>
</div>
            `)
      }
    })
};

//make it highlight on click
$('li', 'p').click(function () {
  $(this).css('color', 'orange');
  console.log("click");
});

//Search Results Functionality

//We keep the search results section hidden for now
$("#preview-recipe").hide();

//Click event that checks the data attribute of the search button clicked and returns the associated results from the spoonacular api
$(document.body).on("click", "button", function (event) {
  event.preventDefault();
  //The display that shows when the app is opened should be hidden
  $(".intro-content").hide();
  //And search results should be revealed in its place
  $("#preview-recipe").show();
  //Get the data attribute of the button
  $(this).attr("data-icon");
  console.log($(this).attr("data-icon"));
  //Set conditionals for each button type based on its data attribute that manipulate the search query to determine what results are returned
  if ($(this).attr("data-icon") === "chicken-icon") {
    searchQuery = "chicken"
    console.log("Search results " + searchQuery);
    returnSearchResultsForApi();

  } else if ($(this).attr("data-icon") === "beef-icon") {
    searchQuery = "steak"
    console.log("Search results " + searchQuery);
    returnSearchResultsForApi();

  } else if ($(this).attr("data-icon") === "vegetables-icon") {
    searchQuery = "vegetable"
    console.log("Search results " + searchQuery);
    returnSearchResultsForApi();

  } else if ($(this).attr("data-icon") === "soup-icon") {
    searchQuery = "soup"
    console.log("Search results " + searchQuery);
    returnSearchResultsForApi();

  } else if ($(this).attr("data-icon") === "fish-icon") {
    searchQuery = "fish"
    console.log("Search results " + searchQuery);
    returnSearchResultsForApi();

  } else if ($(this).attr("data-icon") === "printer") {
    console.log("printer selected");
    printJS('printJS-form', 'html');


  }

});



function getIngredientsFromFirebase() {
  database.ref(`/${username}/shoppinglist`).once("value").then(function (snapshot) {
    console.log(snapshot.val());
    console.log(Object.values(snapshot.val()));

    var arrayOfInfgredientsFromFirebase = Object.values(snapshot.val());

  });

};

var arrayOfInfgredientsFromFirebase = [];
//Shopping List Functionality
$(document).on("click", "#to-shopping-list", function () {
  alert("Your Shopping List Has Been Updated");
  $("#my-shopping-list").empty();
  database.ref(`${username}/shoppinglist`).push(displayRecipe.displayIngredients[i]);
  for (var i = 0; i < displayRecipe.displayIngredients.length; i++) {
    database.ref(`${username}/shoppinglist`).push(displayRecipe.displayIngredients[i]);
  }
  database.ref(`/${username}/shoppinglist`).once("value").then(function (snapshot) {
    console.log(snapshot.val());
    console.log(Object.values(snapshot.val()));
  
    arrayOfInfgredientsFromFirebase = Object.values(snapshot.val());
    // arrayOfInfgredientsFromFirebase = arrayOfInfgredientsFromFirebase.splice(",");
    console.log(arrayOfInfgredientsFromFirebase);
    
    for (var i = 0; i < arrayOfInfgredientsFromFirebase.length; i++) {
      $("#my-shopping-list").append(`<li>${arrayOfInfgredientsFromFirebase[i]}</li>`);
    }
  });
});
database.ref(`/${username}/shoppinglist`).once("value").then(function (snapshot) {
  console.log(snapshot.val());
  console.log(Object.values(snapshot.val()));

  arrayOfInfgredientsFromFirebase = Object.values(snapshot.val());
  // arrayOfInfgredientsFromFirebase = arrayOfInfgredientsFromFirebase.splice(",");
  console.log(arrayOfInfgredientsFromFirebase);
  
  for (var i = 0; i < arrayOfInfgredientsFromFirebase.length; i++) {
    $("#my-shopping-list").append(`<li>${arrayOfInfgredientsFromFirebase[i]}</li>`);
  }
});


var arrayOfInfgredientsFromFirebase = [];
function getIngredientsFromFirebase() {
  database.ref(`/${username}/shoppinglist`).once("value").then(function (snapshot) {
    console.log(snapshot.val());
    console.log(Object.values(snapshot.val()));


  });

}


// google maps code below
// Initialize and add the map
function initMap() {
  // The location of Richmond
  var richmond = {
    lat: 37.5759,
    lng: -77.5410
  };
  // The map, centered at Richmond
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 13,
      center: richmond
    });
  // The marker, positioned at Richmond
  var marker = new google.maps.Marker({
    position: richmond,
    map: map
  });

  var locations = [
    ['Libbie Market <br>\
        400 Libbie Ave, Richmond, VA 23226 <br>\
         <a href="https://goo.gl/maps/C4JJKphhfHF2">Get Directions</a>', 37.5746, -77.5182],
    ['Kroger Willow Lawn<br>\
        1601 Willow Lawn Dr, Richmond, VA 23230<br>\
        <a href="https://goo.gl/maps/5XwxdriB9xK2">Get Directions</a>', 37.5802, -77.4991],
    ['Aldi West Broad<br>\
        6295 W Broad St, Richmond, VA 23230<br>\
        <a href="https://goo.gl/maps/gMV4u9ZfkjA2">Get Directions</a>', 37.5958, -77.513137],

    ['Lidl West Broad<br>\
        4700 W Broad St, Richmond, VA 23230<br>\
        <a href="https://goo.gl/maps/BYyiWu2sppy">Get Directions</a>', 37.579832, -77.490471],

    ['Stellas Grocery - Monument Location<br>\
        1007 Lafayette St, Richmond, VA 23221<br>\
        <a href="https://goo.gl/maps/WmaMe3fkaW42">Get Directions</a>', 37.56731, -77.486151],

    ['Ellwood Thompsons<br>\
        4 N Thompson St, Richmond, VA 23221<br>\
        <a href="https://goo.gl/maps/PhDRWWp2ap72">Get Directions</a>', 37.557447, -77.488621],

    ['Kroger Carytown<br>\
        3507 W Cary St, Richmond, VA 23221<br>\
        <a href="https://goo.gl/maps/5YTUaUypLh32">Get Directions</a>', 37.554478, -77.488031],

    ['Linnie Food Mart<br>\
        8600 Patterson Ave, Richmond, VA 23229<br>\
        <a href="https://goo.gl/maps/CqY7vAdvqdM2">Get Directions</a>', 37.5950023, -77.56669950000003],

    ['Pucks Market<br>\
        A, 435-A N Ridge Rd, Henrico, VA 23229<br>\
        <a href="https://goo.gl/maps/JzLUVxQuC292">Get Directions</a>', 37.582701, -77.554188],


    // ['Nicks International Foods<br>\
    // address<br>\
    // <a href="">Get Directions</a>', 37.574379, -77.481691]

    // ['Kroger Parham', 37.603089, -77.561696],
    // ['Kroger Short Pump', 37.652874, -77.625489],
    // ['grocery', 3333, 33333],
    // https://www.gps-coordinates.net/ is a lifesaver.
  ];

  console.log(locations);

  var infowindow = new google.maps.InfoWindow();
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i]
      [2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }


}


// end of google maps code


var recipeIdforViewing;


// global var of recipe in display window
var displayRecipe = {};



// Function that calls api to create an object for 
function makeRecipeObjectForDisplayInRecipeView() {
  $.ajax({
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeIdforViewing + "/information?includeNutrition=false",
    method: "GET",
    headers: {
      "X-Mashape-Key": "M1t9h6bSWOmshPTVemfyZqQgd4ogp1HsYgsjsnSCG4Kb6mjzvX",
      "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
    }
  })
    .then(function (response) {
      console.log(response);
      var steps = [];
      //Below the variables for the recipe object are being pulled and stored for creating the variable at the bottom
      for (var i = 0; i < response.analyzedInstructions[0].steps.length; i++) {
        console.log("Step: " + response.analyzedInstructions[0].steps[i].number + " " + response.analyzedInstructions[0].steps[i].step);
        var index = "Step " + response.analyzedInstructions[0].steps[i].number + ": " + response.analyzedInstructions[0].steps[i].step;
        steps.push(index);
      }
      console.log("Recipe by: " + response.creditText);
      var recipeSource = "Recipe by: " + response.creditText;
      var ingredientArrayForDisplay = [];
      var ingredientArrayForShoppingList = [];

      //for loop to loop through api and get ingredients
      for (var i = 0; i < response.extendedIngredients.length; i++) {
        var ingredientId = response.extendedIngredients[i].id;
        var ingredientAmount = response.extendedIngredients[i].measures.us.amount;
        var ingredientName = response.extendedIngredients[i].name;
        var ingredientUnit = response.extendedIngredients[i].measures.us.unitLong;
        var ingredientOriginal = response.extendedIngredients[i].original;
        var ingredientsForShoppingList = {
          ingredientId: ingredientId,
          ingredientAmount: ingredientAmount,
          ingredientName: ingredientName,
          ingredientUnit: ingredientUnit
        };
        ingredientArrayForShoppingList.push(ingredientsForShoppingList);
        ingredientArrayForDisplay.push(ingredientOriginal);
      };

      var ingredientsImageLInk = response.image;
      var displayingRecipeId = response.id;
      var cookTime = response.readyInMinutes;
      var displayReciepServing = response.servings;
      var displayAggregateLikes = response.aggregateLikes;
      var displayRecipeTitle = response.title;


      // object to be used to populate the recipe view when when the button on the search is selected
      displayRecipe = {
        steps: steps,
        recipeSource: recipeSource,
        displayIngredients: ingredientArrayForDisplay,
        shoppingListINgredients: ingredientArrayForShoppingList,
        image: ingredientsImageLInk,
        recipeId: displayingRecipeId,
        cookTime: cookTime,
        servings: displayReciepServing,
        aggregateLikes: displayAggregateLikes,
        favorited: false,
        title: displayRecipeTitle
      };

      console.log(displayRecipe);

      //display data in the recipe view window
      $("#display-recipe-name").text(displayRecipe.title);
      $(".recipe-image").attr("src", displayRecipe.image);
      $(".display-servings").html(`<h4>Yields: ${displayRecipe.servings} servings</h4>`);
      $(".display-cook-time").html(`<h4>Cook Time: ${displayRecipe.cookTime} minutes</h4>`);
      $(".display-likes").html(`<h4>Likes: ${displayRecipe.aggregateLikes}</h4>`);
      $("#ingredients-appear-here").empty();
      for (var i = 0; i < displayRecipe.displayIngredients.length; i++) {
        $("#ingredients-appear-here").append(`<input type="checkbox"/ p>${displayRecipe.displayIngredients[i]}<br>`);
      }
      $("#instructions-appear-here").empty();
      for (var i = 0; i < displayRecipe.steps.length; i++) {
        $("#instructions-appear-here").append(`<p>${displayRecipe.steps[i]}`);
      }
    });
};


// Function for turning search result selected into an object
$(document).on("click", ".view-recipe", function (event) {
  event.preventDefault();
  recipeIdforViewing = $(this).attr("data-recipeId");
  makeRecipeObjectForDisplayInRecipeView();
});


// database.ref(`${username}`).on("child_added", function (childSnapshot) {
//   console.log("child added");
//   var favorites = childSnapshot.val().favorites;
//   console.log("firebase: ")

//   console.log(childSnapshot.val().favorite[i]);

//   console.log("----------------------------------------");
//   // console.log("favorites length: " + favorite.length);

//   //     function getSingleDatabase() {
//   //         this.collectionReference=this.db.collection('posts');
//   //         this.collectionReference.get()
//   //         .then(snapshot =>{
//   //           snapshot.forEach(doc => {
//   //             this.firstGet.push(doc.data());
//   //           });
//   //         })
//   //         .catch(err =>{
//   //           console.log(err);
//   //         });
//   //         return this.firstGet;
//   //       };
//   //       getSingleDatabase()
//   //   .then(firstGet => {
//   //      //do whatever you need to with the value here
//   //      console.log('result:', firstGet);
//   //   });

//   var newRow = $("<tr>").append(
//     $("<td>").text(favorites)
//   );
//   $("#favoritesSection").append(newRow);

// })}
