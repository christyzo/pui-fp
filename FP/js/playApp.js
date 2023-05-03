const $menuContainer = $("#menu-container");
const $menuItems = $("#menu-items");
var currentScoreWidth = 0;
var currentScoreBar = $("#current-score-bar");
addedScore=[];
addedImages=[];
var $container = $('#on-plate-image-container');
function populateMenu(menuType, subCategory) {
    if (!itemData.hasOwnProperty(menuType)) {
        console.log(`Error: '${menuType}' is not a valid menu type.`);
        return;
      }  
    $("#menu-items").empty();
   
    
    $.each(itemData[menuType], function(index, item) {
      if (item.src.includes(subCategory)) {
        var itemImg = $("<img>", {src: item.src});
        var itemName = $("<p>", {text: item.name});
        var itemDiv = $("<button>", {class: "menu-item","data-name": item.name, "data-score": item.score}).append(itemImg, itemName);
        $("#menu-items").append(itemDiv);
        $(".menu-item").hover(function() {
            $(this).css({"background-color":"rgba(0,0,255,0.3"});
          },
            function() {
              $(this).css({"background-color":"white"});
          });
        
      }
    });
    $(".menu-item").click(function() {

      var $img = $(this).find('img');
      var $score = $(this).data('score');
      console.log("score", $score);
      // console.log('Found image:', $img);
      var imgSrc = $img.attr('src');
      // console.log(imgSrc);
      
      
      if (addedImages.includes(imgSrc)) {
          // Remove image from container and addedImages array
          $container.find('img[src="' + imgSrc + '"]').remove();
          addedImages.splice(addedImages.indexOf(imgSrc), 1);
        } else {
          // Create a new image element and add it to container
          currentScoreWidth = currentScoreWidth + $score;
          $("#current-score").text("Score: "+currentScoreWidth + "/10");
          console.log("currentscorewidth:", currentScoreWidth);
          currentScoreBar.css({"width":currentScoreWidth*10+"%"});
          if (currentScoreWidth >= 0 && currentScoreWidth < 3) {
            currentScoreBar.css({"background-color":"green"});
            console.log("less than 3");
          } else if (currentScoreWidth >= 3 && currentScoreWidth < 6){
            currentScoreBar.css({"background-color":"yellow"});
            console.log("less than 6");
          } else if (currentScoreWidth >= 6 && currentScoreWidth <=10 ){
            currentScoreBar.css({"background-color":"red"});
          } 

          // if (currentScoreWidth > 10) {
          //   $('.menu-item').prop('disabled', true);
          //   console.log("disabled");
          // }
          

          
          var $newImg = $('<img>', {src: imgSrc, class: 'added-image'});
          $container.append($newImg);
          addedImages.push(imgSrc);
          
          var containerWidth = $container.width();
          var containerHeight = $container.height();
          var imgWidth = $newImg.width();
          var imgHeight = $newImg.height();
          var posX = Math.floor(Math.random() * (containerWidth - imgWidth));
          var posY = Math.floor(Math.random() * (containerHeight - imgHeight));
          $newImg.css({"top": posY, "left": posX, "margin":"-1rem", "position":"absolute"});
          
         
         
          
        }   
    });

    $("#restart").click(function() {
      console.log("restart");
      addedImages.length = 0; 
      console.log("addedimages", addedImages);
      $container.empty();
      currentScoreWidth=0;
      currentScoreBar.css({"width":0+"px"});
    });
    
    
  }



$(document).ready(function() {
    populateMenu(["appetizers"], "Dairy");
    
  
    

    $(".menu-button").on("click", function() {
        // Remove the active class from all tabs
        $(".menu-button").removeClass("active");
        // Add the active class to the clicked tab
        $(this).addClass("active");
        // Get the menu type from the data attribute
        var subCategory = $(this).data("category");
        // Populate the menu with the selected type
        populateMenu(["appetizers"],subCategory);
        console.log(["appetizers"],subCategory);
    });

    

    $('.next').on('click', function() {
      if (currentScoreWidth >= 0 && score <= 5) {
        // Redirect to outcome page 1
        window.location.href = "outcome1.html";
      } else if (score >= 6 && score <= 10) {
        // Redirect to outcome page 2
        window.location.href = "outcome2.html";
      } else {
        // Redirect to outcome page 3
        window.location.href = "outcome3.html";
      }
    });

   
  });

    
    
   


    // $(".menu-item").click(function() {
    //     console.log('Clicked menu item');
    //     var $img = $(this).find('img');
    //     console.log('Found image:', $img);
    //     var imgSrc = $img.attr('src');
    //     console.log(imgSrc);
        
    //     var $container = $('#on-plate-image-container');
    //     if (addedImages.includes(imgSrc)) {
    //         // Remove image from container and addedImages array
    //         $container.find('img[src="' + imgSrc + '"]').remove();
    //         addedImages.splice(addedImages.indexOf(imgSrc), 1);
    //       } else {
    //         // Create a new image element and add it to container
    //         var $newImg = $('<img>', {src: imgSrc, class: 'added-image'});
    //         $container.append($newImg);
    //         addedImages.push(imgSrc);
            
    //         var containerWidth = $container.width();
    //         var containerHeight = $container.height();
    //         var imgWidth = $newImg.width();
    //         var imgHeight = $newImg.height();
    //         var posX = Math.floor(Math.random() * (containerWidth - imgWidth));
    //         var posY = Math.floor(Math.random() * (containerHeight - imgHeight));
    //         $newImg.css({top: posY, left: posX});
    //       }
       
    //   });

    
