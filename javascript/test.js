//Getting Data From the API and putting into an object

//Array of recipes with data to populate search results.  Starts empty and changes based on the search button that is selected.
var recipeArray = [];

// search query from button selected
var searchQuery = "";
// This function calls the API for getting summerized recipe information to populate the search results.
function returnSearchResultsForApi (){

$.ajax({
    // the headers are required by the API
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&query="+ searchQuery + "&type=main+course",
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
            <img class="card-img-top" src="${recipeArray[i].image}" alt="Recipe Image"
            style="position:relative">
          <button class="btn btn-outline-danger btn-circle" data-icon="favorite-icon" style="position:absolute;left:0;top:0;"></button>
          <div class="card-body">
            <h5 class="card-title" id="recipe-name">${recipeArray[i].title}</h5>
            <p class="card-text">"Servings: ${recipeArray[i].servings}"</p>
            <p class="card-text">"Preparation Time: ${recipeArray[i].readyInMinutes} minutes"</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">
              <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">Click
                for Recipe!</button>
              <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3 class="modal-title" id="recipe-name">Baked
                        Chicken</h3>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <img src="https://picsum.photos/750/550?image=835">
                    </div>
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-md-4 ml-auto vl">.col-sm-2
                          .ml-auto</div>
                        <div class="col-md-4 ml-auto vl">.col-sm-2
                          .ml-auto</div>
                        <div class="col-md-4 ml-auto">.col-sm-2
                          .ml-auto</div>
                      </div>
                      <br>
                      <div class="row">
                        <div class="col-lg-10 ml-auto">
                          <div data-target="ingredients">
                            <h3>Ingredients: </h3>
                          </div>
                          <div id="ingredients-appear-here"></div>
                        </div>

                      </div>
                      <br>
                      <div class="row">
                        <div class="col-lg-10 ml-auto">
                          <div data-target="instructions">
                            <h3>Instructions: </h3>
                          </div>
                          <div id="ingredients-appear-here"></div>
                        </div>

                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-outline-danger btn-circle" data-icon="favorite-icon"></button>
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

//Search Results Functionality

//We keep the search results section hidden for now
$("#preview-recipe").hide();

//Click event that checks the data attribute of the search button clicked and returns the associated results from the spoonacular api
$(document.body).on("click", "button", function () {
    event.preventDefault();
    //The display that shows when the app is opened should be hidden
    $(".intro-content").hide();
    //And search results should be revealed in its place
    $("#preview-recipe").show();
    //Get the data attribute of the button
    $(this).attr("data-icon");
    console.log($(this).attr("data-icon"));
  //Set conditionals for each button type based on its data attribute that manipulate the search query to determine what results are returned
    if ($(this).attr("data-icon")==="chicken-icon") {
        searchQuery = "chicken"
        console.log("Search results " + searchQuery);
        returnSearchResultsForApi();
        
    }
    else if ($(this).attr("data-icon")==="beef-icon") {
        searchQuery = "steak"
        console.log("Search results " + searchQuery);
        returnSearchResultsForApi();
        
    }
    else if ($(this).attr("data-icon")==="vegetables-icon") {
        searchQuery = "vegetable"
        console.log("Search results " + searchQuery);
        returnSearchResultsForApi();
        
    }
    else if ($(this).attr("data-icon")==="soup-icon") {
        searchQuery = "soup"
        console.log("Search results " + searchQuery);
        returnSearchResultsForApi();
        
    }
    else if ($(this).attr("data-icon")==="fish-icon") {
        searchQuery = "fish"
        console.log("Search results " + searchQuery);
        returnSearchResultsForApi();
        
    }
    
});

// google maps code below
// locations are hard coded in for this version. placed by coordinates
var locations = [
  ['Libbie Market', 37.5746, -77.5182],
  ['Kroger Willow Lawn', 37.5802, -77.4991],
  ['Aldi West Broad', 37.5958, -77.513137],
  ['Lidl West Broad', 37.579832, -77.490471],
  ['Nicks International Foods', 37.574379, -77.481691],
  ['Stellas Grocery - Monument Location', 37.56731, -77.486151],
  ['Ellwood Thompsons', 37.557447, -77.488621],
  ['Kroger Carytown', 37.554478, -77.488031],
  // ['Kroger Parham', 37.603089, -77.561696],
  // ['Kroger Short Pump', 37.652874, -77.625489],
  // ['grocery', 3333, 33333],

  // https://www.gps-coordinates.net/ is a lifesaver.
];
console.log(locations);
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  center: new google.maps.LatLng(37.5759, -77.5410),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});
//   console.log(map);
var infowindow = new google.maps.InfoWindow();
// console.log(infowindow);
var marker, i;
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
};
// end of google maps code


//favorites
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

  database.ref().on("child_added", function (childSnapshot) {
    console.log("child added");
    var favorites = childSnapshot.val().favorites;
    console.log("firebase: ")

    console.log(childSnapshot.val().favorite[i]);



    console.log("----------------------------------------");
    // console.log("favorites length: " + favorite.length);
    
//     function getSingleDatabase() {
//         this.collectionReference=this.db.collection('posts');
//         this.collectionReference.get()
//         .then(snapshot =>{
//           snapshot.forEach(doc => {
           
//             this.firstGet.push(doc.data());
//           });
//         })
//         .catch(err =>{
//           console.log(err);
//         });
//         return this.firstGet;
        
//       };

//       getSingleDatabase()
//   .then(firstGet => {
//      //do whatever you need to with the value here
//      console.log('result:', firstGet);
//   });


    
    
    var newRow = $("<tr>").append(

        $("<td>").text(favorites),
    );

    $("#favoritesSection").append(newRow);

  });

