/**
 * @license require-has 0.0.1 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/require-has for details
 */

/*jslint strict: false, regexp: false */
/*global define: false */

define(['has'], function (has) {

    var resourceRegExp = /([^\?]+)\?(.*)/;

    function completeLoad(require, load, hasMod, testName, trueName, falseName) {
        if (hasMod(testName)) {
            if (trueName) {
                require([trueName], load);
            } else {
                load();
            }
        } else {
            if (falseName) {
                require([falseName], load);
            } else {
                load();
            }
        }
    }

    return {
        load: function (name, require, load, config) {
            //name is format:
            //module/path!testName?trueModuleName:falseModuleName.

            var match = resourceRegExp.exec(name),

                testParts = match[1].split('!'),
                moduleName = testParts[0],
                testName = testParts[1],

                boolParts = match[2].split(':'),
                trueName = boolParts[0],
                falseName = boolParts[1];

            //If no testName, then it really means no moduleName was passed
            //in so rearrange the values.
            if (!testName) {
                testName = moduleName;
                moduleName = null;
            }

            if (moduleName) {
                require([moduleName], function (hasMod) {
                    completeLoad(require, load, hasMod, testName, trueName, falseName);
                });
            } else {
                completeLoad(require, load, has, testName, trueName, falseName);
            }
        }
    };
});
