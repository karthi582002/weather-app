$(document).ready(function(){
$("#weather-logo, #fotter, #windspeed").hide();
$("#search").on("click",function(){

    let loc = $("#location").val();
    if(loc==""){
        alert("Enter The Location...");
    }else{
    loc = loc.trim();
    loc = loc.charAt(0).toUpperCase()+loc.slice(1).toLowerCase();
    console.log(loc);
    fetch( `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=70d98df72b2c48dafa3ac527d0a91edc&units=metric`)
    .then(resp=>resp.json()).then(json=>{

    
        if(json.cod == '404'){
            $("#main-img").attr('src','/weather/images/error.jpg').css({
                "margin-top": "50px",
                "width": "130%",
                "margin-bottom" : "150px"
            })
            $("#degree").text("");
            $("#place").text("No-Data.");
            $("#weather-logo").show();
        
        }else{
        $("#weather-logo, #fotter, #windspeed").show();
        switch(json.weather[0].main){
            case 'Clear':
                $("#main-img").attr('src','/weather/images/clear.png');
                break;
            case 'Rain':
                $("#main-img").attr('src','/weather/images/rain.png');
                break;
            case 'Snow':
                $("#main-img").attr('src','/weather/images/snow.png');
                break;
            case 'Clouds':
                $("#main-img").attr('src','/weather/images/clouds.png');
                break;
            case 'Mist':
                $("#main-img").attr('src','/weather/images/mist.png');
                break;
            case 'Drizzle':
                $("#main-img").attr('src','/weather/images/drizzle.png');
            default:
                $("#main-img").attr('src','/weather/images/clouds.png'); 
                break;
        }
        $("#windimg").attr('src','/weather/images/wind.png');
        $("#humimg").attr('src','/weather/images/humidity.png');
        $("#degree").text(parseInt(json.main.temp)+"°");
        $("#place").text(loc);
        $("#speed-value").text(json.wind.speed +" Km/h"); 
        $("#humid-perc").text(json.main.humidity +"%")
        
        }
    
        });
    }   
    })
});