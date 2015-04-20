$(function() {


L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
// In this case, we just hardcode data into the file. This could be dynamic.
// The important part about this data is that the 'id' property matches
// the HTML above - that's how we figure out how to link up the
// map and the data.







// initiate map with options
var map = L.mapbox.map('map', 'examples.map-i86nkdio', {
    zoomControl: true
})

// disable zoom wheel
map.scrollWheelZoom.disable();


var $body;
var $map;
var $topbar;

$body = $('body');
$map = $('#map');
$topbar = $('.topbar');

// begin destinations ajax call
$.getJSON("data/destinations.json", function(data) {

// handlebars rendering
var template = $("#itemTemplate").html();
var renderer = Handlebars.compile(template);

var result = renderer(data);

$('.sections').html(result);




// declare all variables at top

var $narrative;
var $sections;

var currentId;


// Ahead of time, select the elements we'll need -
// the narrative container and the individual sections

$narrative = $('#narrative');
$sections = $('#narrative section');

currentId = '';






// grab geojson
$.getJSON('data/data.geojson', function(data) {



// add markers to map
var placesLayer = L.mapbox.featureLayer(data)
    .addTo(map);



// highlight marker and corresponding panel on click

placesLayer.eachLayer(function(layer) {


    layer.on('click', function() {
        setId(this.feature.properties.id);

        var $listItem = $('.active');


        $('html, body').animate({
            scrollTop: $listItem.offset().top - 100
        });




    })




});











// highlight the first panel on page load
setId('cover');



// highlight panels
function setId(newId) {


    // If the ID hasn't actually changed, don't do anything
    if (newId === currentId) {
        return;
    }

    // Otherwise, iterate through layers, setting the current
    // marker to a different color and zooming to it.
    placesLayer.eachLayer(function(layer) {


        if (layer.feature.properties.id === newId) {

            map.setView(layer.getLatLng(), layer.feature.properties.zoom || 14);
            layer.setIcon(L.mapbox.marker.icon({
                'marker-color': '#a8f'
            }));

        } else {

            layer.setIcon(L.mapbox.marker.icon({
                'marker-color': '#404040'
            }));

        }

    });

    // highlight the current section
    for (var i = 0; i < $sections.length; i++) {
        if ( $sections[i].id === newId ) {
            $($sections[i]).addClass('active');
        } else {
            $($sections[i]).removeClass('active');
        }
    }

    // And then set the new id as the current one,
    // so that we know to do nothing at the beginning
    // of this function if it hasn't changed between calls
    currentId = newId;

} // end setId()











function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


// Prevent the pan scrolling event from firing constantly
var panDebouncer = debounce(function() {
    var narrativeHeight = $narrative.height();
    var newId = currentId;



    // Find the section that's currently scrolled-to.
    // We iterate backwards here so that we find the topmost one.
    for (var i = $sections.length - 1; i >= 0; i--) {

        var sections = $($sections[i]);
        var rect = sections.offset();

        if ( rect.top >= $('html, body').scrollTop() ) {
            newId = $sections[i].id;
        }



    };

    setId(newId);
}, 150);



$(window).on('scroll', function() {

    panDebouncer();

}); // end window scroll



}); // end geojson ajax call




}); // end getjson




// Toggle info overlay
var $infoToggle;
var $overlay;
var $closeInfo;

$infoToggle = $('.js__info-open');
$overlay = $('.info-overlay')
$closeInfo = $('.js__info-close');

$infoToggle.on('click', function(e) {
    e.preventDefault();
    $body.css('overflow', 'hidden');
    $overlay.fadeIn();
    $map.addClass('blur');
    $topbar.addClass('blur');
//    $narrative.addClass('blur');
});
$closeInfo.on('click', function(e) {
    e.preventDefault()
    $body.css('overflow', 'auto');
    $overlay.fadeOut();
    $map.removeClass('blur');
    $topbar.removeClass('blur');
})


}); // end document ready












