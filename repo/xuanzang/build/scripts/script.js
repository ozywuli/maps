$(function(){L.mapbox.accessToken="pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w";var o=L.mapbox.map("map","examples.map-i86nkdio",{zoomControl:!0});o.scrollWheelZoom.disable();var e,a,t;e=$("body"),a=$("#map"),t=$(".topbar"),$.getJSON("data/destinations.json",function(e){var a=$("#itemTemplate").html(),t=Handlebars.compile(a),r=t(e);$(".sections").html(r);var n,i,l;n=$("#narrative"),i=$("#narrative section"),l="",$.getJSON("data/data.geojson",function(e){function a(e){if(e!==l){r.eachLayer(function(a){a.feature.properties.id===e?(o.setView(a.getLatLng(),a.feature.properties.zoom||14),a.setIcon(L.mapbox.marker.icon({"marker-color":"#a8f"}))):a.setIcon(L.mapbox.marker.icon({"marker-color":"#404040"}))});for(var a=0;a<i.length;a++)i[a].id===e?$(i[a]).addClass("active"):$(i[a]).removeClass("active");l=e}}function t(o,e,a){var t;return function(){var r=this,n=arguments,i=function(){t=null,a||o.apply(r,n)},l=a&&!t;clearTimeout(t),t=setTimeout(i,e),l&&o.apply(r,n)}}var r=L.mapbox.featureLayer(e).addTo(o);r.eachLayer(function(o){o.on("click",function(){a(this.feature.properties.id);var o=$(".active");$("html, body").animate({scrollTop:o.offset().top-100})})}),a("cover");var s=t(function(){for(var o=(n.height(),l),e=i.length-1;e>=0;e--){var t=$(i[e]),r=t.offset();r.top>=$("html, body").scrollTop()&&(o=i[e].id)}a(o)},150);$(window).on("scroll",function(){s()})})});var r,n,i;r=$(".js__info-open"),n=$(".info-overlay"),i=$(".js__info-close"),r.on("click",function(o){o.preventDefault(),e.css("overflow","hidden"),n.fadeIn(),a.addClass("blur"),t.addClass("blur")}),i.on("click",function(o){o.preventDefault(),e.css("overflow","auto"),n.fadeOut(),a.removeClass("blur"),t.removeClass("blur")})});