function updateFood(ids) {
    console.log(ids);
    if (ids.length == 0) {
        fill();
        return 0;
    }
    console.log(ids);
    fill_v2(ids);
}


$(document).ready(function () {
  "use strict";
  var pluginName = "selectionator";
  var defaults = {
    propertyName: "selectionator",
    src: null,
    orgElement: null,
    checkedItems: [],
    ids: [],
    // custom callback events
    onError: function(error) {}
  };
  function Plugin(element, options) {
    this.element = element;
    this.selector = null;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  Plugin.prototype = {
    init: function () {
      console.log("options: ", this.options);
      var that = this;
      var self = $(that.element);
      that.options.src = that.element.getAttribute('data-src');
      that.selector = that.createFromJson(that.options.data);
      that.options.orgElement = that.element.parentNode.replaceChild(that.selector, that.element);
      $(that.selector).addClass(that._name);
    },
    createFromJson: function(options) {
      var that = this;
      var select = document.createElement('select');
      var popup = document.createElement('div');
      var header = document.createElement('div');
      var search = document.createElement('span');
      var overlay = document.createElement('span');
      overlay.className = 'overlay';
      var shadow = document.createElement('span');
      shadow.className = 'shadow';
      var placeholder = document.createTextNode('Фильтр');
      search.className = 'search';
      search.appendChild(shadow);
      search.appendChild(overlay);
      search.appendChild(placeholder);
      popup.appendChild(search);
      var menu = document.createElement('ul');
      select.style.display = 'none';
      menu.className = 'list';
      var box = document.createElement('div');
      box.className = 'menu';
      box.appendChild(menu);
      popup.appendChild(box);
      console.log("optgroup", options.optgroups);
      options.optgroups.forEach(function(optgroup, index) {


        var menuItem = document.createElement('li');
        //menuItem.className('header');
        var header = document.createElement('span');
        header.className = 'header';
        var caption = document.createTextNode(optgroup.label);
        header.appendChild(caption);
        menuItem.appendChild(header);
        var menuItems = document.createElement('ul');
        menuItems.className = 'optgroup';
        menuItem.appendChild(menuItems);
        menu.appendChild(menuItem);

        optgroup.options.forEach(function(option, index) {
          var sp = document.createElement('span');
          var opt = new Option(option.text, option.value, option.defaultSelected, option.selected);
          select.options.add(opt);
          var item = document.createElement('li');
          var label = document.createElement('label');
          label.setAttribute("for", option.value);
          var checkbox = document.createElement('input');
          $(checkbox).data(option);
          checkbox.setAttribute('type', 'checkbox');

          checkbox.addEventListener('change', function(event){
            var checkbox = event.target;
            var $el = $(event.srcElement);
            if (checkbox.checked) {
              that.options.checkedItems.push(event.srcElement);


            } else {
              for (var i = 0; i < that.options.checkedItems.length; i++) {
                console.log(i);
                console.log(that.options.checkedItems[i].id);
                console.log($el.data().value);
                if (that.options.checkedItems[i].id == $el.data().value){
                  console.log(that.options.checkedItems[i].id);
                  that.options.checkedItems.splice(i, 1);
                }
              }
              //that.options.checkedItems.pop();
              that.options.checkedItems = that.options.checkedItems.filter(function(items, index){
                return items.value != $el.data().value;
              });


            }

            x = []
            for (var i = 0; i < that.options.checkedItems.length; i++) {
                console.log("data: ", that.options.checkedItems[i]);
                var r = Object.getOwnPropertyNames(that.options.checkedItems[i])[0];
                x.push(that.options.checkedItems[i][r].value);
            }
            updateFood(x);
          });
          checkbox.id = option.value;
          var caption = document.createTextNode(option.text);
          label.appendChild(caption);
          item.appendChild(checkbox);
          item.appendChild(label);
          menuItems.appendChild(item);
        });
      });
      return popup;
    },
    onAddFriend: function(data) {
      var that = this;
      return that.options.onAddFriend(that, data);
    },
    onRemoveFriend: function(data){
      var that = this;
      var self = $(that.element);
      return that.options.onRemoveFriend(data);
    },
    destroy: function() {
      var that = this;
      $(that.element).unbind("destroyed", that.teardown);
      that.teardown();
    },
    teardown: function() {
      var that = this;
      $(that.element).removeClass(that._name);
      $(that.selector).replaceWith(that.options.orgElement);
      $(that.element).removeData(that._name);
      that.unbind();
      that.element = null;
    },
    bind: function() { },
    unbind: function() { }
  };
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      }
    });
  };
});
//Attach plugin to all matching element
$(document).ready(function () {
  $('#select').selectionator({
    data: {
      optgroups: [{
        label: '',
        options: [{
          value: 0,
          text: 'Горячие блюда',
          defaultSelected: true,
          selected: false
        }, {
          value: 1,
          text: 'Десерты',
          defaultSelected: false,
          selected: false
        }, {
          value: 2,
          text: "Фруктовое ассорти на шпашках",
          defaultSelected: false,
          selected: false
        }, {
          value: 3,
          text: "Хлеб",
          defaultSelected: false,
          selected: false
        }, {
          value: 4,
          text: "Пирожки закусочные",
          defaultSelected: false,
          selected: false
        }, {
          value: 5,
          text: "Пицца",
          defaultSelected: false,
          selected: false
        }, {
          value: 6,
          text: "Домашние пироги на заказ",
          defaultSelected: false,
          selected: false
        }, {
          value: 7,
          text: "Пирожные, мини-десерты, торты",
          defaultSelected: false,
          selected: false
        }, {
          value: 8,
          text: "Конфеты",
          defaultSelected: false,
          selected: false
        }, {
          value: 9,
          text: "Одноразовая посуда, упаковка",
          defaultSelected: false,
          selected: false
        }, {
          value: 10,
          text: "Салаты",
          defaultSelected: false,
          selected: false
        }, {
          value: 11,
          text: "Ассорти мясное",
          defaultSelected: false,
          selected: false
        }, {
          value: 12,
          text: "Домашние овощные разносолы",
          defaultSelected: false,
          selected: false
        }, {
          value: 13,
          text: "Ассорти из свежих овощей",
          defaultSelected: false,
          selected: false
        }, {
          value: 14,
          text: "Ассорти рыбное",
          defaultSelected: false,
          selected: false
        }, {
          value: 15,
          text: "Овощная подгарнировка",
          defaultSelected: false,
          selected: false
        }, {
          value: 16,
          text: "Горячие закуски",
          defaultSelected: false,
          selected: false
        }, {
          value: 17,
          text: "Вторые горячие блюда",
          defaultSelected: false,
          selected: false
        }, {
          value: 18,
          text: "Гарниры",
          defaultSelected: false,
          selected: false
        }, {
          value: 19,
          text: "Соусы",
          defaultSelected: false,
          selected: false
        }, {
          value: 20,
          text: "Холодные и горячие напитки",
          defaultSelected: false,
          selected: false
        }]
      }]
    }
  });
  setTimeout(function(){
    $(".selectionator").addClass('opened');
  }, 500);
  setTimeout(function(){
    $(".selectionator").removeClass('opened');
  }, 1250);
});
