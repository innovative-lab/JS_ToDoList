'use strict';

var _listTemplate = require('../template/list.template.js');

var _listTemplate2 = _interopRequireDefault(_listTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
    this.init();
};
function init() {
    var _this = this;

    var timeStamp = new Date().getTime();
    var list_items = document.getElementsByClassName('list_item');
    var list_container = document.getElementById('list_container');

    var _loop = function _loop(i) {
        _this.setTimeout(function () {
            list_items[i].classList.add('slideIn-left');
        }, i * 100);
    };

    for (var i = 0; i < list_items.length; i++) {
        _loop(i);
    }
}