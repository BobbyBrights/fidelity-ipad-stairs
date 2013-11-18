(function($){
// bind the event listener to the video container
	/*$('#video_container').bind('click', function() {
 	 
 		 //$('#video_container').animate().css('background',0);
 	
 	 	//$('#mainvideo').css('display','block');
 	 	//$("#mainvideo").get(0).play();
 	 	console.log('lol');
 	 	alert("dd")
	});*/






})(jQuery);



/**-----*/


var portrait = {};
var landscape = {};

var buttonA = {};
var buttonB = {};

var fps =16;
window.onload = function() {

// bind event

//$('#buttonAcanvas').bind('click', function() { });
//$('#buttonBcanvas').bind('click', function() { });
$('#close_bt').bind('click', function() { 
  console.log(this);
  $('#box').css("display", "none");
});

var orientationLabel="landscape";


//document.getElementById("tester").innerHTML = orientationLabel;


///

/*window.checkOrientation = function () {

   if (Math.abs(window.orientation) === 90) {
        // Landscape
        orientationLabel = "landscape";
    } else {
      // Portrait
      orientationLabel = "portrait";
    }

}

window.checkOrientation(); */

window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  window.checkOrientation();
  //document.getElementById("tester").innerHTML = orientationLabel;

  if(orientationLabel=="portrait") {

       clearTimeout(landscape.ffp)
       cancelAnimationFrame(landscape.request);
       portrait.drawFrame();


  } else if(orientationLabel=="landscape") {

       clearTimeout(portrait.ffp)
       cancelAnimationFrame(portrait.request);
       landscape.drawFrame();



  }

}, false);

//-----------------------------      
// defined the landscape object 

       landscape.loaded =0;
    

	     landscape.SCREEN_WIDTH = 1024; 
       landscape.SCREEN_HEIGHT = 748;        
       
       landscape.canvas = document.getElementById('landscape-canvas');
       landscape.c = landscape.canvas.getContext('2d');
         
          
       landscape.canvas.width = landscape.SCREEN_WIDTH;
       landscape.canvas.height = landscape.SCREEN_HEIGHT;
        
       landscape.index = 0;

       landscape.strips = new Array();
      

             //preload images: set path, enter image names
    
      landscape.path = 'img/landscape/';
      landscape.images = [
       'landscape1.png','landscape2.png', 'landscape3.png', 'landscape4.png', 'landscape5.png', 'landscape6.png',
       'landscape7.png', 'landscape8.png', 'landscape9.png', 'landscape10.png'
        ];

      for (image in landscape.images) {
        var ni = new Image();
        ni.src = landscape.path + landscape.images[image];
        landscape.strips.push(ni);
        

        // attach event listener
        landscape.strips[image].onload = function() {
          landscape.loaded ++;
          landscape.loadingProgressCheck(landscape.loaded);
        }
        

    }

    
      

       landscape.loadingProgressCheck = function(l) {
       // drawFrame();
          if(l==10) {
              console.log("it is loaded");
              
           
               if(orientationLabel=="landscape"){    }
                    console.log(orientationLabel + "--");
                      landscape.drawFrame();
           
              
              
          }

       }


 
    landscape.drawFrame =  function () {
              
              landscape.ffp  =   setTimeout(function() {

       
        	     
               landscape.request = requestAnimationFrame(landscape.drawFrame, landscape.canvas)
               landscape.c.clearRect(0,0, landscape.SCREEN_HEIGHT,landscape.SCREEN_WIDTH);
               landscape.c.drawImage(landscape.strips[landscape.index],0,0,1024,748,0,0,1024,748);
               landscape.index++;

                if(landscape.index>=10) {
                  landscape.index = 0;
                }

               
             }, 1000 / fps);

           
            //console.log(landscape.images[landscape.index]);
        

      }
      
    

     //--------------------------------     

     //-----------------------------      
// defined the portrait object 
      

        portrait.loaded =0;
       portrait.SCREEN_WIDTH = 768; 
       portrait.SCREEN_HEIGHT = 1004;        
       
       portrait.canvas = document.getElementById('portrait-canvas');
       portrait.c = portrait.canvas.getContext('2d');
         
          
       portrait.canvas.width = portrait.SCREEN_WIDTH;
       portrait.canvas.height = portrait.SCREEN_HEIGHT;
        
       portrait.index = 0;

       portrait.strips = new Array();
      

             //preload images: set path, enter image names
    
      portrait.path = 'img/portrait/';
      portrait.images = [
       'portrait1.png','portrait2.png', 'portrait3.png', 'portrait4.png', 'portrait5.png', 'portrait6.png',
       'portrait7.png', 'portrait8.png', 'portrait9.png', 'portrait10.png'
        ];

      for (image in portrait.images) {
        var ni = new Image();
        ni.src = portrait.path + portrait.images[image];
        portrait.strips.push(ni);

           // attach event listener
        portrait.strips[image].onload = function() {
          portrait.loaded ++;
          portrait.loadingProgressCheck(portrait.loaded);
        }
        //console.log(image)

    }

     portrait.loadingProgressCheck = function(l) {
       // drawFrame();
        if(l==10) {
           console.log("ready to draw frame");
             // portrait.drawFrame();
            
            if(orientationLabel=="portrait"){     }
                    console.log(orientationLabel + "-----++")
                    portrait.drawFrame();
          
            
             
         
        }

       }


       
  portrait.drawFrame =  function () { 
   
           portrait.ffp  =  setTimeout(function() {
      

            portrait.request = window.requestAnimationFrame(portrait.drawFrame, portrait.canvas)
            portrait.c.clearRect(0,0, portrait.SCREEN_HEIGHT,portrait.SCREEN_WIDTH);
            portrait.c.drawImage(portrait.strips[portrait.index],0,0,768,1004,0,0,768, 1004);
            portrait.index++;
              if(portrait.index>=10) {
                  portrait.index = 0;
              }
            }, 1000 / fps);


            //console.log(landscape.index%10);
        

      }
         // portrait.drawFrame();

     //--------------------------------     



    // defined the buttons object.

//>------------------------------
    // sprite version button A
    
    buttonA.SCREEN_WIDTH = 238;
    buttonA.SCREEN_HEIGHT = 90;


    buttonA.canvas  = document.getElementById('buttonAcanvas');
    buttonA.c = buttonA.canvas.getContext('2d');
    buttonA.canvas.width =  buttonA.SCREEN_WIDTH;
    buttonA.canvas.height = buttonA.SCREEN_HEIGHT;
 
    buttonA.sheet = new Image();
    buttonA.sheet.src = 'img/buttonA/sprite_sheet_buttonA.png';


    buttonA.xpos =0;
    buttonA.ypos =0;
    buttonA.numFrames = 21;
    buttonA.index = 0;

    
    buttonA.drawStaticFrame = function () {
           
            buttonA.c.clearRect(0,0, buttonA.SCREEN_WIDTH,buttonA.SCREEN_HEIGHT);
            buttonA.c.drawImage(buttonA.sheet,0,0,238,90,0,0,238,90);
    }
    buttonA.drawFrame =  function () {

          buttonA.ffp  =   setTimeout(function() {

                          requestA = window.requestAnimationFrame(buttonA.drawFrame, buttonA.canvas)
                          buttonA.c.clearRect(0,0, buttonA.SCREEN_WIDTH,buttonA.SCREEN_HEIGHT);
                          buttonA.c.drawImage(buttonA.sheet,buttonA.xpos,buttonA.ypos,238,90,0,0,238,90);
                

                        //each time around we add the frame size to our xpos, moving along the source image
                        buttonA.xpos += 238;
                        //increase the index so we know which frame of our animation we are currently on
                        buttonA.index += 1;
                        //if our index is higher than our total number of frames, we're at the end and better start over
                        if (buttonA.index >= buttonA.numFrames) {
                            buttonA.xpos =0;
                            buttonA.ypos =0;
                            buttonA.index=0;  
                            cancelAnimationFrame(requestA);
                            

                           
                            buttonB.shimmerInterval(100, function() {});
                        //if we've gotten to the limit of our source image's width, we need to move down one row of frames        
                        } else if (buttonA.xpos + 238 > buttonA.sheet.width){
                            buttonA.xpos =0;
                            buttonA.ypos += 90;
                        }

          }, 1000/fps);
        

      }

     

        buttonA.sheet.onload = function() {
          
          console.log("button A sprite sheet loadded");
          buttonA.drawStaticFrame();
          buttonA.drawFrame();
        }

      buttonA.shimmerInterval  = function (time,f) {

         buttonA.shimmerTimer = setTimeout(function() {
         
          //clearInterval(buttonB.shimmerTimer);
          clearTimeout(buttonA.shimmerTimer);
          buttonA.drawFrame();
          
          f();
        },time);

      }

      //buttonA.shimmerInterval(1500, function() {console.log("run shimmerA1")});


     /* buttonA.shimmerTimer = setInterval(function() {
          //clearInterval(buttonB.shimmerTimer);
         buttonA.drawFrame();
      },3000);*/
      ///

//>------------------------------------
      // sprite version button B
    
    buttonB.SCREEN_WIDTH = 238;
    buttonB.SCREEN_HEIGHT = 90;


    buttonB.canvas  = document.getElementById('buttonBcanvas');
    buttonB.c = buttonB.canvas.getContext('2d');
    buttonB.canvas.width =  buttonB.SCREEN_WIDTH;
    buttonB.canvas.height = buttonB.SCREEN_HEIGHT;
 
    buttonB.sheet = new Image();
    buttonB.sheet.src = 'img/buttonB/sprite_sheet_buttonB.png';


    buttonB.xpos =0;
    buttonB.ypos =0;
    buttonB.numFrames = 21;
    buttonB.index = 0;


    buttonB.drawStaticFrame = function () {
           
            buttonB.c.clearRect(0,0, buttonB.SCREEN_WIDTH,buttonB.SCREEN_HEIGHT);
            buttonB.c.drawImage(buttonB.sheet,0,0,238,90,0,0,238,90);
    }

    buttonB.drawFrame =  function () {

        buttonB.ffp  =   setTimeout(function() {
                        requestB = window.requestAnimationFrame(buttonB.drawFrame, buttonB.canvas)
                        buttonB.c.clearRect(0,0, buttonB.SCREEN_WIDTH,buttonB.SCREEN_HEIGHT);
                        buttonB.c.drawImage(buttonB.sheet,buttonB.xpos,buttonB.ypos,238,90,0,0,238,90);
                   

                      //each time around we add the frame size to our xpos, moving along the source image
                      buttonB.xpos += 238;
                      //increase the index so we know which frame of our animation we are currently on
                      buttonB.index += 1;
                      //if our index is higher than our total number of frames, we're at the end and better start over
                      if (buttonB.index >= buttonB.numFrames) {
                          buttonB.xpos =0;
                          buttonB.ypos =0;
                          buttonB.index=0;  
                          cancelAnimationFrame(requestB);
                       
                          buttonA.shimmerInterval(500, function() {});
                          
                          


                      //if we've gotten to the limit of our source image's width, we need to move down one row of frames        
                      } else if (buttonB.xpos + 238 > buttonB.sheet.width){
                          buttonB.xpos =0;
                          buttonB.ypos += 90;
                      }

           
            },1000/fps);

      }

      
      
      buttonB.shimmerInterval  = function (time,f) {

         buttonB.shimmerTimer = setTimeout(function() {
         
          //clearInterval(buttonB.shimmerTimer);
           clearTimeout(buttonB.shimmerTimer);
           buttonB.drawFrame();
         
          f();
        },time);

      }

        buttonB.sheet.onload = function() {
            
            buttonB.drawStaticFrame()

        
        }

     
 


} //the end of window onload
