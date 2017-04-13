var key = "bce905ae4154f415fe521760666c09b2";

function celsiusToFahr(temp) {
    return Math.round((temp * 1.8) + 32);
}

function fahrToCelsius(temp) {
    return Math.round((temp - 32) / 1.8);
}

/*
function getPosition() {
    var url = "http://ip-api.com/json";
    $.getJSON(url, function(pos) {
        getWeather(pos);
    });
}
*/

function getPosition() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(getWeather);
    }
    else {
       $("#location").html("Geolocation not supported. Sorry :(");
    }
} 

function getWeather(pos) {
    var lat = pos.lat;
    var lon = pos.lon;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+key;
    $.getJSON(url, function(weather) {
        displayWeather(weather);
    });
}

function displayWeather(weather) {
    var city = weather.name;
    var country = weather.sys.country;
    var temp = Math.round(weather.main.temp);
    var ftemp = celsiusToFahr(temp - 273);
    var description = weather.weather[0].description;
    var weather_code = weather.weather[0].id;

    backgroundColor(weather_code);
    $("#location").html("Somewhere near " + city + ", " + country);
    $("#temp").html(ftemp);
    $("#description").html(description);
}

function backgroundColor(code) {
    switch (Math.floor(code/100)) {
        /* Thunderstorm */
        case 2:
			$("body").css({"background-color":"#ff0000"});
			if (code < 210 || code >= 230) {
				$("#icon").html("<i class='wi wi-storm-showers'></i>");
			}
			else {
				$("#icon").html("<i class='wi wi-thunderstorm'></i>");
			}
			break;
		/* Drizzle and Rain */
		case 3:
		case 5:
			$("body").css({"background-color": "#666699"});
			$("#icon").html("<i class='wi wi-showers'></i>");
			break;
		/* Snow */
		case 6:
			$("body").css({"background-color": "#669999"});
			$("#icon").html("<i class='wi wi-snow'></i>");
			break;
		/* Clear or clouds */
		case 8:
			/* Overcast */
			if (code == 803 || code == 804) {
				$("body").css({"background-color" : "#adad85"});
				$("#icon").html("<i class='wi wi-cloudy'></i>");
			}
			else {
				$("body").css({"background-color":"#0099cc"});
				$("#icon").html("<i class='wi wi-day-sunny'></i>");
			}
			break;
			}
}

$(document).ready(function() {
	
	/* Set up the screen, get the weather, etc... */
	getPosition();

	/* Toggling the units */
	var imperial = true;
	$("#unit").click(function() {
		if (imperial) {
			imperial = false;
			var ftemp = Number($("#temp").text());
			var ctemp = fahrToCelsius(ftemp);
			$("#temp").html(ctemp);
			$("#unit").html('&#8451');
		}
		else {
			imperial = true;
			var ctemp = Number($("#temp").text());
			var ftemp = celsiusToFahr(ctemp);
			$("#temp").html(ftemp);
			$("#unit").html('&#8457');
		}
	});
});
