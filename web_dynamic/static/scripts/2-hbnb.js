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
