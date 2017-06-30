(function() {

    'use strict';

    // input data file name
    var fileName = "data/category-column-01.txt";

    $(document).ready(function() {

        // Check for the various File API support.
        if (! (window.File && window.FileReader && window.FileList && window.Blob)) {
            console.warn('File API not supported on this browser.');
            return 0;
        }

        function handleFileSelect(evt) {

            // FileList object
            var files = evt.target.files;

            // Loop through FileList
            for (var i = 0, f; f = files[i]; i++) {

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {

                        var output = "";
                        var lines = e.target.result;
                        lines = lines.split("\n");

                        for (var i = 0; i < lines.length; i++) {
                            output += '<li>' + lines[i] + '</li>';
                        }

                        $('#list').html(output);
                    };
                })(f);

                // Read as text
                reader.readAsText(f);
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