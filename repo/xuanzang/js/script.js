$('document').ready(function() {


L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
// In this case, we just hardcode data into the file. This could be dynamic.
// The important part about this data is that the 'id' property matches
// the HTML above - that's how we figure out how to link up the
// map and the data.







// initiate map with options
var map = L.mapbox.map('map', 'examples.map-i86nkdio', {
    zoomControl: true
}).setView([51.50110000, -0.12960000], 9);

// disable zoom wheel
map.scrollWheelZoom.disable();




// declare all variables at top
var $narrative;
var $sections;
var currentId;


// Ahead of time, select the elements we'll need -
// the narrative container and the individual sections
$narrative = $('#narrative');
$sections = $('#narrative section');
currentId = '';






// add markers to map
var placesLayer = L.mapbox.featureLayer()
    .loadURL('data/data.geojson')
    .addTo(map);


console.log(placesLayer);



// highlight marker and corresponding panel on click

$('document').ready(function() {


placesLayer.eachLayer(function(layer) {

console.log(1);

    layer.on('click', function() {
        setId(this.feature.properties.id);

        var $listItem = $('.active');


        $('html, body').animate({
            scrollTop: $listItem.offset().top - 100
        });




    })




});

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
        $sections[i].className = $sections[i].id === newId ? 'active' : '';
    }

    // And then set the new id as the current one,
    // so that we know to do nothing at the beginning
    // of this function if it hasn't changed between calls
    currentId = newId;

} // end setId()








// If you were to do this for real, you would want to use
// something like underscore's _.debounce function to prevent this
// call from firing constantly.
$(window).on('scroll', function() {

setTimeout(function(){
    var narrativeHeight = $narrative.height();
    var newId = currentId;



    // Find the section that's currently scrolled-to.
    // We iterate backwards here so that we find the topmost one.
    for (var i = $sections.length - 1; i >= 0; i--) {

        var sections = $($sections[i]);
        var rect = sections.offset();



        if ( rect.top >= $('html, body').scrollTop() - 100 ) {
            newId = $sections[i].id;
        }



    };

    setId(newId);
 }, 500);
}); // end window scroll






}); // end document ready












