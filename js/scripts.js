(function() {

    'use strict';

    // input data file name
    var fileName = "data/category-column-01.txt";

    $(document).ready(function() {

        /*
        var a1 = [
            "apple", "banana", "citrus"
        ];
        a1.shift();

        var cnt = 0;
        var final = {};
        function makeStructure(key, path, data) {
            // final[ key ] = 1;
            console.log('-----');
            console.log(key);
            console.log(data);

            console.log("final" + path + " = {};");
            console.log(final);
            if (! eval("final" + path) ) {
                eval("final" + path + " = {};");
            } else {

            }

            if (data.length == 0) {
                return 0;
            }
            var newKey = data.shift();

            var newPath = path + '["' + newKey + '"]';
            // console.log(newKey);
            // console.log(newPath);
            // console.log(data);

            if (cnt > 10) {
                return 0;
            }
            cnt++;

            makeStructure(newKey, newPath, data);
        }
        makeStructure("apple", '["apple"]', a1);
        console.dir(final);

        return 0;
        */

        // Check for the various File API support.
        if (! (window.File && window.FileReader && window.FileList && window.Blob)) {
            console.warn('File API not supported on this browser.');
            return 0;
        }

        //
        var categories = {};

        function handleFileSelect(evt) {

            // FileList object
            var files = evt.target.files;

            // Loop through FileList
            for (var i = 0, f; f = files[i]; i++) {

                var reader = new FileReader();

                reader.onload = (function(theFile) {
                    return function(e) {

                        var output = "";
                        var categories = {};

                        // lines
                        var lines = e.target.result;
                        lines = lines.split("\n");
                        for (var i = 0; i < lines.length; i++) {

                            // entries
                            var line = lines[i];
                            var entries = line.split("|");
                            for (var j = 0; j < entries.length; j++) {

                                // category
                                var entry = entries[j];

                                console.log( entry );
                                if (categories[ entry ] === undefined) {
                                    categories[ entry ] = 1;
                                } else {
                                    categories[ entry ] = categories[ entry ] + 1;
                                }

                                // var category = entry.split("/");
                                // var test = {};
                                // for (var k = 0; k < category.length; k++) {
                                //     console.log(k, category[k] );
                                // }

                                // var test = category.map(c => `["${c}"]`).join('');
                                // console.log(test);


                                // var expresssionNewCategory = "categories" + test;

                                // console.log(expresssionNewCategory);

                                // console.log(scope);

                                // var test = category.map(c => `["${c}"]`).join('');
                                // var expresssionNewCategory = "categories" + test + "=1;";
                                // console.log(expresssionNewCategory);
                            }


                            output += '<li>' + lines[i] + '</li>';
                        }

                        $('#list').html(output);

                        console.dir( categories );
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