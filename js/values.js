(function() {

    'use strict';

    // helper function, check a value exists in an array
    function include(arr, obj) {
        return (arr.indexOf(obj) != -1);
    }

    $(document).ready(function() {

        // Check for the various File API support.
        if (! (window.File && window.FileReader && window.FileList && window.Blob)) {
            console.warn('File API not supported on this browser.');
            return 0;
        }

        window.parsed = {};
        window.values = {};

        function combine() {

            for (var i = 0; i < parsed.length; i++) {
                for (var key in parsed[i]) {
                    if (parsed[i].hasOwnProperty(key) && parsed[i][key]) {

                        var newValues = parsed[i][key];
                        newValues = newValues.toString();
                        var newValArray = newValues.split('|');

                        for (var index in newValArray) {

                            if (newValArray.hasOwnProperty(index) && Array.isArray(window.values[key])) {
                                if (! include(window.values[key], newValArray[index]) ) {
                                    window.values[key].push( newValArray[index] );
                                    window.values[key].sort();
                                }
                            } else {
                                window.values[key] = [ newValArray[index] ];
                            }

                        }
                    }
                }
            }

            console.dir(window.values);
            $('#list').html( JSON.stringify( window.values, null, 4 ) );
        }

        function handleFileSelect(evt) {

            // FileList object
            var files = evt.target.files;

            // Loop through FileList
            for (var i = 0, f; f = files[i]; i++) {

                Papa.parse(f, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        window.parsed = results.data;
                        combine();
                    }
                });
            }
        }

        $('#files').change(function(evt) {
            handleFileSelect(evt);
        });

        $('#reset').click(function() {
            $('#files').val('');
            $('#list').html('');
        });

    });

})(jQuery);