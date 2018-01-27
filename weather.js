function celsiusToFahr(temp) {
    return (temp * 1.8) + 32;
}

function fahrToCelsius(temp) {
    return (temp - 32) / 1.8;
}

function updateWeather(pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;

    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" +
        latitude + "&lon=" + longitude;
    $.getJSON(url, function(weather) {
        var description = weather.weather[0].description;
        // TODO: this seems like it's inaccurate sometimes, should look
        // into another location API
        var city = weather.name;
        var ctemp = Math.round(weather.main.temp);

        // TODO: add country data from JSON?
        $("#location").html("Somewhere near " + city + ", US");
        $("#temp").html(ctemp);
        $("#description").html(description);

        var weather_code = weather.weather[0].id;
        updateBackground(weather_code);
    });
}

function updateBackground(code) {
    switch (Math.floor(code/100)) {
        // Thunderstorm
        case 2:
            $("body").css({"background-color": "#FF0000"});
            break;
        // Drizzle and rain
        case 3:
        case 5:
            $("body").css({"background-color": "#666699"});
            break;
        // Snow
        case 6:
            $("body").css({"background-color": "#669999"});
            break;
        // Clear or Clouds
        case 8:
            // Clear
            if (code == 800) {
                $("body").css({"background-color": "#ADAD85"});
            }
            // Overcase
            else {
                $("body").css({"background-color": "#0099CC"});
            }
            break;
        default:
            $("body").css({"background-color": "grey"});
    }
}

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateWeather);
    }
    else {
        $("#location").html("Geolocation is not supported :(");
    }

    // Unit switching
    var imperial = false;
    $("#unit").click(function() {
        var ftemp;
        var ctemp;
        if (imperial) {
            imperial = false;
            ftemp = Number($("#temp").text());
            ctemp = fahrToCelsius(ftemp);
            $("#temp").html(ctemp);
            $("#unit").html(' &#8451');
        }
        else {
            imperial = true;
            ctemp = Number($("#temp").text());
            ftemp = celsiusToFahr(ctemp);
            $("#temp").html(ftemp);
            $("#unit").html(' &#8457');
        }
    });
});
