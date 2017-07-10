(function() {

    'use strict';

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

                Papa.parse(f, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        console.log(results.data);
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