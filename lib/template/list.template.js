"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var listTemplate = function listTemplate(scope) {
    return "<div class='list_item'>\n                <div id='list_title'>\n                <div>To Do List</div>  \n                <div id='timestamp'>15 Aug 2018</div> \n                </div>\n                <div class='list_opt'>\n                    <img src=\"./images/done.svg\" alt=\"\">\n                </div>\n                <div class='list_opt'>\n                    <img src=\"./images/delete2.svg\" alt=\"\">\n                </div>\n            </div>";
};
exports.default = listTemplate;