// Hamburger menu functionality with toggle//
let menu=function(){
    //if and else provide logic for toggle
    if (document.getElementById("menu").style.display=="flex"){
        document.getElementById("menu").style.display="none";
        return;
    }
    else{
        document.getElementById("menu").style.display="flex";
    }
}

// Map building via Google Maps API
let holder=document.getElementById("maphold");
	let locater=function(){
        //create function to get coordinates, get image, then append
		let mapcreate=function(location){
            let results=location.coords;

            //check if map already placed, if so, break function
            if (holder.firstElementChild!==null){
                return;
            }
            
            //create image, adjust properties to holder div's dimensions
            let imag=new Image();
            imag.width=holder.clientWidth;
            imag.height=holder.clientHeight;
 			imag.src="https://maps.googleapis.com/maps/api/staticmap?center=" + results.latitude + "," + results.longitude+"&zoom=16&size=850x500&key=AIzaSyBAACnxYrk7BaKlO9HLon7RpU5srEzAo_c";
            holder.appendChild(imag);
        }

        //define error function, then execute api with function arguments
 		let err=function(){
  			holder.innerHTML="Failure";
 		}
 		navigator.geolocation.getCurrentPosition(mapcreate,err);
    }

// Weather Stuff, start with Fetch API to pull, then take response and select the JSON out of it
let WeatherFetch=function(){
    let url="https://api.openweathermap.org/data/2.5/weather?q=Calgary,ca&APPID=117188a5327d55d4bca1feec9be3ee49";
    fetch(url).then(response => {
          return response.json();
        }).then(weatherJSON => {
          //console.log(weatherJSON);  
          //replace holder text with conditions from JSON response
          let weatherhold=document.getElementById("weatherH");
          weatherhold.innerHTML="Temperature in Calgary "+ weatherJSON.main.temp +" Kelvin, Condition: " + weatherJSON.weather[0].description + ", Wind: "+ weatherJSON.wind.speed + " m/s";
          
          //append weather icon to holder div
          let icon_var=document.getElementById("icon");
          let imag=document.createElement("img");
                    
          //statement to prevent appending multiple child nodes
          if(icon_var.childElementCount>0){
             return;
          }

          //if okay, append child
          let iconimg=weatherJSON.weather[0].icon;
          imag.src="https://openweathermap.org/img/w/"+iconimg+".png";
          icon_var.appendChild(imag);
    })
};

