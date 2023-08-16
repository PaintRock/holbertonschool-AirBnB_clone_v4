$// Wait for the document to be fully loaded
$(document).ready(function() {
    // Get the status from the API endpoint
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            // Add the 'available' class to div#api_status
            $('#api_status').addClass('available');
        } else {
            // Remove the 'available' class from div#api_status
            $('#api_status').removeClass('available');
        }
    });

    // Store the selected amenity IDs and names
    const amenityIds = {};

    // Listen for changes on each input checkbox tag with class 'amenity-checkbox'
    $('.amenity-checkbox').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            amenityIds[amenityId] = amenityName; // Add to the selected amenities
        } else {
            delete amenityIds[amenityId]; // Remove from the selected amenities
        }

        // Update the h4 tag with the list of selected amenities
        const selectedAmenities = Object.values(amenityIds).join(', ');
        $('.amenities h4').text('Amenities: ' + selectedAmenities);
    });
});

$(document).ready(function () {
    // Send a POST request to the places_search endpoint
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({}), // Send an empty JSON object
        success: function (data) {
            // Loop through the result and create article tags for each place
            data.forEach(function (place) {
                const placeHtml = `
                    <article>
                        <div class="title_box">
                        <h2>{{ place.name }}</h2>
                    <div class="price_by_night">${{ place.price_by_night }}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
                        <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
                        <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
                  </div>
                  <div class="user">
                        <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
                      </div>
                      <div class="description">
                    {{ place.description | safe }}
                      </div>
                    </div>
                    </article>
                `;
                $('.places').append(placeHtml);
            });
        }
    });
});
