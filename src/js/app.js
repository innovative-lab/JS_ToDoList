'use strict'
import '../css/app.css';
import listTemp from '../template/list.template.js';
import modalTemp from '../template/modal.template.js';
var _ = require('lodash');

var _this = window;
window.onload = function () {
    _this.list_Id = 0;
    _this.dataSet = [{
        title: 'Pick up laundry',
        timeStamp: getTIme(),
        checked: false,
        id: ++_this.list_Id
    }, {
        title: 'Read book',
        timeStamp: getTIme(),
        checked: true,
        id: ++_this.list_Id
    }, {
        title: 'Finish Assignment',
        timeStamp: getTIme(),
        checked: false,
        id: ++_this.list_Id
    }];
    init();
}
function init() {
    render();
    _this.timeStamp = new Date().getTime();
    selectingDOMElements();
    _this.backdrop_El.classList.add('hide');
    bindingListerner();
    addAnimation();
}



function selectingDOMElements(){
    _this.main_container = document.getElementsByClassName('container')[0];
    _this.list_items = document.getElementsByClassName('list_item');
    _this.list_container = document.getElementById('list_container');
    _this.input_btn_El = document.getElementById('add-btn_container');
    _this.add_icon_El = document.getElementById('add-icon');
    _this.input_El = document.getElementById('add-to-list_input');
    _this.delete_icon_El = document.getElementById('delete-icon');
    _this.backdrop_parent = document.getElementById('backdrop_container');
    _this.backdrop_parent.innerHTML += modalTemp();
    _this.backdrop_El = document.getElementsByClassName('backdrop')[0];
    _this.done_El = document.getElementById('done');
    _this.cancel_El = document.getElementById('cancel');
}



function bindingListerner(){
    addEventListener(done_El, 'click', (ev) => {
        deleteConfirm(_this.seleted_El);
    });
    addEventListener(cancel_El, 'click', (ev) => {
        deleteCancel();
    });
    addEventListener(_this.input_btn_El, 'click', addToList);
    addEventListener(_this.list_container, 'click', function (event) {
        if (event.target.name == 'checked') {
            markItemAsChecked(event);
        } else if (event.target.name == 'delete') {
            deleteItemFromList(event);
        }
    });
}


function getTIme() {
    return (new Date(new Date().getTime())).toString().substr(4, 17)
}


function addEventListener(el, event_type, callback) {
    el.addEventListener(event_type, callback)
}

function markItemAsChecked(event) {
    event ? event.target.classList.add('checked-icon_animate') : null;

    _this.dataSet.forEach((item) => {
        if (event.target.parentElement.parentElement.id == item.id) {
            item.checked = item.checked ? false : true;
        }
    });
    setTimeout(function () {
        render();
    }, 500)

}


function deleteItemFromList(event_el) {
    _this.seleted_El = event_el;
    showModal();
}

function deleteConfirm(event) {
    _this.dataSet = _this.dataSet.filter((item)=>{
        if (event.target.parentElement.parentElement.id != item.id) {
            return true;
        }
    });
    hideModal();
    render();
}

function deleteCancel(){
    hideModal();
}

function hideModal(){
    _this.backdrop_parent.classList.remove('cover_screen');
    _this.backdrop_El.classList.remove('show');
    _this.backdrop_El.classList.remove('cover_screen');
    _this.backdrop_El.classList.add('hide');
}

function showModal(){
    _this.backdrop_parent.classList.add('cover_screen');
    _this.backdrop_El.classList.remove('hide');
    _this.backdrop_El.classList.add('cover_screen');
    _this.backdrop_El.classList.add('show');
}


function addToList() {
    _this.add_icon_El.classList.add('checked-icon_animate');
    setTimeout(function () {
        _this.add_icon_El.className = '';
    }, 1000)
    if (_this.input_El.value) {
        _this.dataSet.unshift({
            title: _this.input_El.value,
            timeStamp: getTIme(),
            checked: false,
            id: ++_this.list_Id
        })
        render();
    }
}

function render() {    
    _this.list_container.innerHTML = '';
    _this.dataSet.forEach((item) => {
        _this.list_container.innerHTML += listTemp(item);
    });
}

function addAnimation() {
    for (let i = 0; i < list_items.length; i++) {
        setTimeout(function () {
            list_items[i].classList.add('slideIn-left');
        }, i * 100)
    }
}