$(document).ready(function() {

    var clicks = 0;
    var objCount = 1;

    var imgDataSelector = $("#img-data");
    var clickSelector = $(".clicks");
    var clickCountSelector = $(".click-count");
    var imgDataDuration = 500;

    var carsCoordsObj = {
        "lambo" : "390, 119, 589, 283",
        "ferrari" : "600, 110, 795, 240",
        "aston" : "200, 110, 378, 240",
        "lamboR" : "808, 103, 995, 209",
        "lamboL" : "5, 103, 192, 209"
    };
    var carsDataObj = {
        "lambo" : "<strong>Lamborghini Murcielago</strong> is a sports car produced by Italian automaker Lamborghini between 2001 and 2010. The Murcielago was first available in North America for the 2002 model year. The automaker's first new design in eleven years, the car was also the brand's first new model under the ownership of German parent company Audi, which is owned by Volkswagen. The car has V12 engine capacity of 580 PS (572 hp) which allows accelerate the car to 100 km/h (62 mph) in 3.8 seconds",
        "ferrari" : "<strong>Ferrari 612 Scaglietti</strong>  is a grand tourer produced by Ferrari between 2004 and 2010. It is a large two door fastback coupe. The 612 Scaglietti was designed to replace the smaller 456 M; its larger size makes it a true 4 seater with adequate space in the rear seats for adults. The 612 Scaglietti shares its engine with the Ferrari 575M Maranello. The engine has compression ratio of 11:1. It has a top speed of 320 km/h (198.8 mph) and has a 0–100 km/h acceleration time of 4.2 seconds.",
        "aston" : "<strong>Aston Martin Vantage Roadster</strong> is a sport car which debuting at the 2006 Greater Los Angeles Auto Show. The car gained 200 pounds over the coupe, but Aston Martin claimed the car would have the same performance as the coupe. The soft top could be raised or lowered electronically in 18 seconds. It had the same 4.3 litre V8 from the hard top version producing 380 bhp (283 kW; 385 PS). It would accelerate from 0–60 mph (0–97 km/h) in 4.8 seconds and give a top speed of 178 mph (286 km/h).",
        "lamboR" : "<strong>Lamborghini Murcielago LP640</strong> is a modification of Lamborghini Murcielago. In March 2006, Lamborghini unveiled a new version of its halo car at the Geneva Motor Show: the Murcielago LP 640. The new title incorporated the car's name, along with an alphanumeric designation which indicated the engine's orientation (Longitudinale Posteriore), along with the newly updated power output. With displacement now increased to 6.5 litres, the new car made 640 PS (471 kW; 631 hp) at 8000 rpm.",
        "lamboL" : "<strong>Lamborghini Gallardo Spyder</strong> is a modification of Lamborghini Gallardo. The production spyder model of the Gallardo was unveiled at the Los Angeles Auto Show in January 2006. It was considered by the company to be an entirely new model, with 520 PS (382 kW; 513 hp) and a lower-ratio six-speed manual transmission. It has improved a top speed to 314 km/h (197 mph) and allowed accelerate the car to 100 km/h (62 mph) in 4.2 seconds. The soft top was fully retractable."
    };
    var carsSettingsObj = {
        "activeItem" : "lambo",
        "activeItemSort" : "last"
    };

    var headerCoordsJSON = '{' +
        '"item1" :' + '{ "top": "56", "left": "29", "height" : "31", "width" : "31" }, ' +
        '"item3" :' + '{ "top": "56", "left": "911", "height" : "93", "width" : "63" }, ' +
        '"item2" :' + '{ "top": "56", "left": "408", "height" : "31", "width" : "31" }, ' +
        '"item4" :' + '{ "top": "56", "left": "550", "height" : "93", "width" : "86" } ' +
        '}';
    var headerSettingsJSON = '{ ' +
        '"item1" :' + '{ "hoverFillColor" : "blue" },' +
        '"item2" :' + '{ "hoverFillColor" : "green" },' +
        '"item4" :' + '{ "hoverFillColor" : "red" },' +
        '"item3" :' + '{ "hoverFillColor" : "orange" }' +
        '}';

    function clickPlusPlus() {

        clickCountSelector.text(++clicks);

        if(clicks > 0) {
            clickSelector.css("display", "block");
        }
    }

    function showImageData() {
        var data = $(this).data("value");

        imgDataSelector.html(data);
    }

    /*function showImageData() {

     var self = this;

     if(imgDataSelector.hasClass('active')) {
     hideImageData.call(self);
     }
     else {
     var data = $(self).data("value");
     imgDataSelector.html(data);
     imgDataSelector.slideDown(imgDataDuration, function() {
     $(this).addClass("active");
     });
     }
     }

     function hideImageData() {

     var self = this;

     imgDataSelector.slideUp(imgDataDuration, function() {
     $(this).removeClass("active");
     showImageData.call(self);
     });
     } */

    $('#images-container > .left > img').imgAreaSelect({

        handles: true,
        onSelectEnd : function (img, selection) {

            var top = selection.y1;
            var left = ((selection.x2 - selection.x1) > 0) ? selection.x1 : selection.x2;
            var height = selection.height;
            var width = selection.width;

            if(width > 0 && height > 0) {

                var coordsObj = new Object;
                var mapObj = "map" + objCount;
                coordsObj[mapObj] = { "top": top, "left": left, "height": height, "width": width };

                var data = {};
                var settings = {};

                mcMap.createOne(coordsObj, data, settings);
            }

            objCount++;
        }
    });

    var carsMap = $('#img-cont').interactiveMap({
        coordsObj: carsCoordsObj,
        dataObj: carsDataObj,
        showOptionsObj: carsSettingsObj,
        strokeWidth: 2,
        fillOpacity: 0.2,
        hoverFillOpacity: 0.4,
        staticFillOpacity: 0.3,
        fadeTime: 1000,
        setQueue: false,
        setPause: false,
        onClick: function() { showImageData.call(this) },
        onRender: function() {
            var selector = null;

            //Т.к. активный элемент появляется последним, то берем последний элемент из массива
            if($.isArray(this)) {
                selector = this[this.length - 1];
            }

            showImageData.call(selector)
        }
    });

    var mcMap = $('#images-container > .right').interactiveMap({
        strokeWidth: 1,
        fillColor: "aqua",
        fillOpacity: 0.1,
        strokeColor: 'orange',
        hoverFillColor: "red",
        hoverFillOpacity: 0.1,
        staticFillColor: "indigo",
        staticFillOpacity: 0.2,
        fadeTime: 600,
        enableClose: true,
        hideStatic: true
    });

    var headerMap = $('header').interactiveMap({
        coordsObj: headerCoordsJSON,
        showOptionsObj: headerSettingsJSON,
        strokeColor: '#000000',
        strokeWidth: 5,
        fillOpacity: 0,
        hoverFillOpacity: 0.5,
        fadeTime: 600,
        setStatic: false,
        setQueue: true,
        onClick: clickPlusPlus,
        onRender: function() {
            carsMap.createItems();
        }
    });

    mcMap.createItems();

    headerMap.createItems();
});