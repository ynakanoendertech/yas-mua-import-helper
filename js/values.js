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

        window.myParsed = {};
        window.myValues = {};
        window.myKeys = [];

        function combine() {

            for (var i = 0; i < myParsed.length; i++) {
                for (var key in myParsed[i]) {
                    if (myParsed[i].hasOwnProperty(key) && myParsed[i][key]) {

                        var newValues = myParsed[i][key];
                        newValues = newValues.toString();
                        var newValArray = newValues.split('|');

                        for (var index in newValArray) {

                            if (newValArray.hasOwnProperty(index) && Array.isArray(myValues[key])) {
                                if (! include(myValues[key], newValArray[index]) ) {
                                    myValues[key].push( newValArray[index] );
                                    myValues[key].sort();
                                }
                            } else {
                                myValues[key] = [ newValArray[index] ];
                            }

                        }
                    }
                }
            }

            for (var k in myValues) {
                if (myValues.hasOwnProperty(k)) {
                    myKeys.push(k);
                }
            }
            myKeys.sort();
            for (var j = 0; j < myKeys.length; j++) {
                console.log( myKeys[j] );
                console.dir( myValues[ myKeys[j] ]);
            }

            console.log('------------------');
            console.dir(myValues);
            $('#list').html( JSON.stringify( myValues, null, 4 ) );
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
                        window.myParsed = results.data;
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