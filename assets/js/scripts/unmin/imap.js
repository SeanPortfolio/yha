(function(w, d, $){

  // DEFINE GLOBAL CONSTANTS
  
  // DEFINE GLOBAL VARIABLES
  
  var map,
      mapStyles,
      addedMarkers = [],
      addedGatewayMarkers = [],
      totalMarkersOnMap = 0,
      toggleAllBlock = 'toggle-all',
      toggleAllSel = ('.' + toggleAllBlock),
      filterElmSel = '.hostel-feature',
      fromLocationSel = '#location-from',
      toLocationSel = '#location-to',
      hostels,
      distancePath,
      infoBox,
      addedLabels = [],
      infoBoxType;

  
  function getMapStyles(callback) {
    $.get('/resources/json/map-styles.json', callback, 'json');
  }

  function getPosition(lat, lng) {

    lat = parseFloat(lat),
    lng = parseFloat(lng);

    if (!isNaN(lat) && !isNaN(lat)) {
      return  new google.maps.LatLng(lat, lng);
    }

    return false;
  }

  function getMarkerIcon(type) {

    var width  = 14,
        height = 14,
        posX   = 3,
        posY   = 0;
    
    switch (type) {
      case 'grey':
        posX = 3;
        posY = 20;
      break;
      case 'grey-lg':
        width  = 20;
        height = 20;
        posX   = 0;
        posY   = 95;
      break;
      case 'orange-lg':
        width  = 20;
        height = 20;
        posX   = 0;
        posY   = 41;
      break;
      case 'green-lg':
        width  = 20;
        height = 20;
        posX   = 0;
        posY   = 67;
      break;

    }

    return new google.maps.MarkerImage("/graphics/map-markers.png?v=2", 
      new google.maps.Size(width, height), 
      new google.maps.Point(posX, posY)
    );

  }

  function addMarker(opts) {

    var markerCenter;

    if (typeof opts !== 'object') {
      return false;
    }

    if (!opts.position) {
      markerCenter = getPosition(opts.lat, opts.lng);
      opts.position = markerCenter;
    } else {
      markerCenter = opts.position;
    }
    
    if (markerCenter) {

      opts.map =  map;

      var marker = new google.maps.Marker(opts);

      addedMarkers.push(marker);

      if (marker.isGateway) {
        addedGatewayMarkers.push(marker);
      }

      marker.addListener('click', function() {
        var ths = this;
        showInfoBox(ths);
      });

      return marker;

    }

    return false;

  }
  

  function showInfoBox(marker) {
    
    destroyInfoBox();

    var tmplSel = (infoBoxType === 'inverse') ? '#map-infobox-inverse-tmpl' : '#map-infobox-tmpl';

    var contentTmplStr = $(tmplSel).html();
    var _tmpl          = _.template(contentTmplStr);
    var content        = _tmpl({data: marker});

    var infoBoxOptions = {
      content: content,
      disableAutoPan: false,
      maxWidth: 260,
      pixelOffset: new google.maps.Size(-100, -100),
      zIndex: null,
      infoBoxClearance: new google.maps.Size(1, 1),
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false,
      closeBoxMargin: "0px;position: absolute;right: 10px;top: 7px;width: 25px;opacity:0;z-index: 3;"
    };

    infoBox = new InfoBox(infoBoxOptions);

    infoBox.open(map, marker);

  }

  function addLabels(colorCls, inActives) {

    if (!inActives) {
      inActives = [];
    }

    if (!colorCls) {
      colorCls = '';
    }

    var contentTmplStr = $('#map-label-tmpl').html();

    var labelDefaults = {
      content: "",
      disableAutoPan: false,
      maxWidth: 260,
      pixelOffset: new google.maps.Size(-90, 3),
      zIndex: null,
      isHidden: false,
      pane: "floatPane",
      enableEventPropagation: false,
      closeBoxMargin: "0px;display:none;"
    };

    _.each(addedGatewayMarkers, function(gatewayMarker){

      var inActiveCls = (inActives.indexOf(gatewayMarker.id) > -1) ? ' map__label--grey'
        : '';

      var _tmpl   = _.template(contentTmplStr);
      var content = _tmpl({
        label: gatewayMarker.heading,
        colorCls: (colorCls+inActiveCls)
      });

      var labelOptions = {
        content: content,
      };

      labelOptions = $.extend(true, labelDefaults, labelOptions);

      var objLabel = new InfoBox(labelOptions);

      objLabel.open(map, gatewayMarker);

    });
    
  }

  function destroyLabels(objMap) {
    _.each(addedLabels, function(addedLabel){
      addedLabel.setMap(objMap);
    });
  }

  function destroyInfoBox() {
    if (infoBox) {
      infoBox.close();
    }
  }

  function destroyDistancePath() {
    if (distancePath) {
      distancePath.close();
    }
  }

  function setDefaultMarkers() {

    $.getJSON('/resources/json/hostels.json', function(markers){

      hostels = _.sortBy(markers, 'title');

      if (markers.length > 0) {

        var bounds = new google.maps.LatLngBounds();

        _.each(markers, function(markerData){

          var iconType = ((markerData.isGateway) ? 'orange-lg' : '');
          var position = getPosition(markerData.lat, markerData.lng);
          var icon     = getMarkerIcon(iconType);

          markerData.icon     = icon;
          markerData.position = position;

          if (addMarker(markerData)) {
            bounds.extend(position);
          }

        });

        map.fitBounds(bounds);
      }

      createHostelsList();

      addLabels();


    });
  }

  function setFilteredMarkers(data, gatewayCls) {

    if (!gatewayCls) {
      gatewayCls = 'orange-lg';
    }

    var inActiveGatewayLabels = [];
    var iconType;

    if (data !== 'show-initial') {

      _.each(addedMarkers, function(addedMarker){
      
        iconType = (addedMarker.isGateway) ? 'grey-lg' : 'grey';

        _.each(data, function(markerData){

          if (
            markerData.lat == addedMarker.lat
            && markerData.lng == addedMarker.lng
          ) {
            iconType = (markerData.isGateway) ? gatewayCls : '';
          }
          
        });

        addedMarker.setIcon(getMarkerIcon(iconType));

        if (iconType.indexOf('grey') > -1) {
          inActiveGatewayLabels.push(addedMarker.id);
        }

      });

      destroyLabels();
      addLabels('', inActiveGatewayLabels);

    } else {
      _.each(addedMarkers, function(addedMarker){
        iconType = (addedMarker.isGateway) ? 'orange-lg' : 'green';
        addedMarker.setIcon(getMarkerIcon(iconType));
      });
    }

  }

  function filterMarkers() {
    $(d).on('change', filterElmSel, function(){
      var self = $(this);
      var selectedFilters = $(filterElmSel+":checked").serialize();

      $(toggleAllSel).attr('checked', false);
      
      destroyDistancePath();

      $.post(
        '/resources/json/filtered-hostels.json', 
        selectedFilters, 
        function(response){
          setFilteredMarkers(response);
        },
        'json'
      );
    });
  }

  function getLocalStoriesMarkers () {
    $(d).on('change', '.toggle-local-stories', function(){

      var self = $(this);

      destroyInfoBox();
      destroyDistancePath();

      if (self.is(":checked")) {
        infoBoxType = 'inverse';
        $.post(
          '/resources/json/local-story-hostels.json', 
          'get-local-stories='+true, 
          function(response){
            setFilteredMarkers(response);
          },
          'json'
        );
      } else {
        infoBoxType = '';
        setFilteredMarkers('show-initial');
      }
      
    });
  }
  
  function createHostelsList() {

    var options = [];

    _.each(hostels, function(hostel){
      options.push({
        val: hostel.id,
        label: hostel.title,
      });
    });

    var fromLocationDDData = {
      defaultLabel: 'From',
      options: options
    };

    var toLocationDDData = {
      defaultLabel: 'To',
      options: options
    };

    var optionsTmplStr = $('#option-tmpl').html();

    var _fromListTmpl = _.template(optionsTmplStr);
    var _toListTmpl   = _.template(optionsTmplStr);

    $(fromLocationSel).html(_fromListTmpl(fromLocationDDData));

    $(toLocationSel).html(_toListTmpl(toLocationDDData));

  }

  function showDistanceDetails(locationsData, distanceMatrix, status) {

    var detailsElmSel  = '#distance-details';
    var detailsTmplSTr = $('#distance-data-tmpl').html();
    var detailsHtml    = '';

    destroyDistancePath();

    if (status === "OK") {

      var paths = [];
      var distanceInKms = distanceMatrix.rows[0].elements[0].distance.text;
      var distanceDetails = '<p>'+
        '<strong>By Road: </strong>Approx 3hrs 2min via state highway 8</p>'+
        '<strong>Local\'s advice: </strong>Direct flights not available</p>';

      paths.push(locationsData.origin);
      paths.push(locationsData.destination);

      distancePath = new google.maps.Polyline({
        path: paths,
        geodesic: true,
        strokeColor: '#939492',
        strokeOpacity: 1,
        strokeWeight: 2
      });

      distancePath.setMap(map);

      var panPosition = getPosition(
        locationsData.origin.lat, 
        locationsData.destination.lng
      );

      setFilteredMarkers(paths, 'green-lg');

      var _detailsTmpl = _.template(detailsTmplSTr);

      detailsHtml = _detailsTmpl({
        data: {
          distanceInKms: distanceInKms,
          distanceDetails: distanceDetails
        }
      });
      
    } else {
      setFilteredMarkers(null);
    }

    $(detailsElmSel).html(detailsHtml);
  }

  function getDistanceData() {
    
    $(d).on('change', fromLocationSel+', '+toLocationSel, function(){
      var self = $(this),
          fromLocation  = $(fromLocationSel).val(),
          toLocation    = $(toLocationSel).val();

      if (fromLocation) {
        $(toLocationSel).attr('disabled', false);
      } else {
        $(toLocationSel).attr('disabled', true);
      }

      $(toLocation+' option').removeClass('hidden');
      
      $(toLocation+' option[value="'+fromLocation+'"]').addClass('hidden');

      // GET DATA
      if (fromLocation && toLocation) {
        $.getJSON('/resources/json/hostels.json', function(data){

          //[@TODO] - Remove this block of code once actual endpoint is provided
          var fromLocationData = _.find(data, function(obj){
            return (obj.id == fromLocation);
          });
          // BLOCK END

          //[@TODO] - Remove this block of code once actual endpoint is provided
          var toLocationData = _.find(data, function(obj){
            return (obj.id == toLocation);
          });
          // BLOCK END

          if (fromLocationData && toLocationData) {

            var origin = getPosition(
              fromLocationData.lat, 
              fromLocationData.lng
            );

            var destination = getPosition(
              toLocationData.lat, 
              toLocationData.lng
            );

            var locationsData = {
              origin: fromLocationData,
              destination: toLocationData
            };

            var service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix(
              {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING'
              }, 
              function(data, status) {
                showDistanceDetails(locationsData, data, status);
              }
            );

          }

        });
      }

    })

  }
  
  /**
  * This function uses Google maps v3 API to show map
  *
  * @param string canvasId, ID selector (without #) of a element on which 
  *                         map will be loaded
  *
  * @param object options, object of map settings
  *
  * @return void
  */
  function loadMap(canvasId, options, callback) {

    var canvas = document.getElementById(canvasId);

    if (!canvas) {
      console.warn('canvas is required to display google maps');
      return false;
    }
    
    if (canvas) {

      var lat  = -41.2296724,
        lng  = 169.421223,
        zoom = 6;
      
      var mapCenter = new google.maps.LatLng(lat, lng);
      
      var mapOptions = {
        zoom: zoom,
        center: mapCenter, 
        scrollwheel: false,
        draggable:true,
        mapTypeControl: false,
        styles: mapStyles
      };

      map = new google.maps.Map(canvas, mapOptions);

    }
    
    if (typeof callback == 'function') {
      callback.call();
    }
    
  }
  
  w.initInteractiveMap = function(canvasId, options) {

    getMapStyles(function(data){
      mapStyles = data;

      loadMap(canvasId, options, setDefaultMarkers);

      filterMarkers();

      getLocalStoriesMarkers();

      getDistanceData();
    });

  };
  
})(window, document, jQuery);
