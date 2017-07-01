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

        //
        window.categories = {};
        function makeStructure(data, key, path) {

            if (key === undefined) {
                var initKey = data.shift();
                var initPath = categories;
                makeStructure(data, initKey, initPath);
            } else {

                if (path[ key ] === undefined) {
                    path[ key ] = {};
                }

                if (data.length == 0) {
                    return 0;
                }

                var newKey = data.shift();
                var newPath = path[ key ];
                makeStructure(data, newKey, newPath);
            }
        }

        function handleFileSelect(evt) {

            // FileList object
            var files = evt.target.files;

            // Loop through FileList
            for (var i = 0, f; f = files[i]; i++) {

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {

                        // lines
                        var lines = e.target.result;
                        lines = lines.split("\n");
                        for (var i = 0; i < lines.length; i++) {

                            // entries
                            var line = lines[i];
                            line = line.substring(0, line.length - 1);  // remove last invisible character from line

                            var entries = line.split("|");
                            for (var j = 0; j < entries.length; j++) {

                                // category
                                var entry = entries[j];
                                var category = entry.split("/");

                                if (category == "") {
                                    break;
                                }

                                makeStructure(category);
                            }
                        }

                        console.dir( categories );
                        $('#list').html( JSON.stringify( categories, null, 4 ) );
                    };
                })(f);

                // Read as text
                reader.readAsBinaryString(f);
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