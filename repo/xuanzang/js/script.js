L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
// In this case, we just hardcode data into the file. This could be dynamic.
// The important part about this data is that the 'id' property matches
// the HTML above - that's how we figure out how to link up the
// map and the data.
var places = { type: 'FeatureCollection', features: [
{ geometry: { type: "Point", coordinates: [-0.12960000, 51.50110000] },
  properties: { id: "cover", zoom: 9 }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.15591514, 51.51830379] },
  properties: { id: "baker" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.07571203, 51.51424049] },
  properties: { id: "aldgate" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.08533793, 51.50438536] },
  properties: { id: "london-bridge" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [0.05991101, 51.48752939] },
  properties: { id: "woolwich" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.18335806, 51.49439521] },
  properties: { id: "gloucester" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.19684993, 51.5033856] },
  properties: { id: "caulfield-gardens" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.10669358, 51.51433123] },
  properties: { id: "telegraph" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.12416858, 51.50779757] },
  properties: { id: "charing-cross" }, type: 'Feature' }
]};




// initiate map with options
var map = L.mapbox.map('map', 'examples.map-i86nkdio', {
    zoomControl: true
});

// disable zoom wheel
map.scrollWheelZoom.disable();

// add markers to map
var placesLayer = L.mapbox.featureLayer(places)
    .addTo(map);


// declare all variables at top
var $narrative;
var $sections;
var currentId;


// Ahead of time, select the elements we'll need -
// the narrative container and the individual sections
$narrative = $('#narrative');
$sections = $('#narrative section');
currentId = '';




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






