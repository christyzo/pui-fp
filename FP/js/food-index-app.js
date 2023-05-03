
var itemName = [];


$(document).ready(function() {
  $.each(itemData, function(index, value) {
    $.each(value, function(idx, course) {
      var itemImg = $("<img>", {src: course.src});
      var itemName = course.name;
      itemImg.attr("alt", itemName);
      var item = $("<div>", {class: "grid-item","data-name": itemName, "data-category": index, "data-index": idx}).append(itemImg);
      $(".grid").append(item);
    })


    // hover function
    $(".grid-item").hover(function() {
      $(this).css({"background-color":"rgba(0,0,255,0.3"});
    },
      function() {
        $(this).css({"background-color":"white"});
    });
  });


  // toggle click
  $(".grid-item").click(function() {
    var $overlay = $(".overlay");
    $overlay.toggle();
    var combinedArray = [];
    for (var key in itemData) {
      for (var i = 0; i < itemData[key].length; i++) {
        combinedArray.push({
          src: itemData[key][i].src,
          name: itemData[key][i].name,
          description: itemData[key][i].description,
          score: itemData[key][i].score,
          category: itemData[key][i].category
        });
       
      }
      
    }
    if ($overlay.is(":visible")) {
      $(".grid").hide();
      // dynamically generate overlay content
      var index = $(this).data("index");
      var category = $(this).data("category")
      var image = itemData[category][index];

     
      var $overlayContent = $("<div>", { class: "overlay-content" });
      $overlayContent.append($("<img>", {src:"../assets/x.png", id:"x"}).css({"width":"30px", "height":"30px", "cursor":"pointer"}).click(function() {
        $overlay.hide();
        $(".grid").show();
      }));
      
      var $overlayContentText = $("<div>", { class: "overlay-text" });
      $overlayContent.css({"padding":"20px", "margin":"20px"});
      $overlayContent.append($("<img>", { src: image.src }).css({
      "width":"40%", 
      "margin":"10px 10px 10px 0px"
      }));
      $overlayContentText.append($("<p>", { text: "score: " + image.score }).css({
        "padding-top":"4rem",
        "font-size":"40px",
        "font-weight":"bold",
        "color":"#c2282a"
        
      }));
      $overlayContentText.append($("<p>", { text: image.description }).css({
        "font-family":"Courier",
        "font-size":"15px",
        "padding-top":"2rem",
        "color":"blue"
      }));
      $overlayContentText.append($("<p>", { text: image.category }).css({
        "padding":".5rem 1rem",
        "border":"1px #c2282a solid",
        "border-radius":"20px",
        "color":"#c2282a"
        
        


    
        
      }));
      $overlayContentText.append($("<p>", { text: image.name }).css({ 
        "font-size":"36px", 
        "color":"#c2282a", 
        "font-style":"italic",
        // "padding-bottom":"1rem",
        "margin-right":"1.5rem"
        }));
      
      
     
      
     
      $overlayContent.append($overlayContentText);
      $overlayContent.css({"justify-content":"space-between"})
      // $overlayContentText.css({"display":"block", "background-color":"blue"})
      
      $overlay.html($overlayContent);
    }

  });

    
     
  
  


 
    

   

  
});

function generateOverlayContent(itemData) {
  var image = itemData;
  var content = $('<div class="overlay-content">');
  var overlayImage = $(".overlay-image").attr("src", image.path);
  var overlayName = $(".overlay-name").text(image.name);
  var overlayCategory = $(".overlay-category").text(image.category);
  var overlayDescription = $(".overlay-description").text(image.description);
  var overlayScore = $("overlay-score").text("Score: " + image.score);
  content.append(overlayImage, overlayName, overlayCategory, overlayDescription, overlayScore);
  return content;

}


