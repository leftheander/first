function Container( className, hrefLink)
{
    this.className= className;
    this.hrefLink = hrefLink;
}

Container.prototype.remove = function() {
    if (!this.hrefLink){
        var elem = document.querySelectorAll("ul." + this.className);
    if (elem == undefined) {
        return console.log("Не удалось найти элемент");
    }
    return elem[0].remove(elem[0]);
}
else{
    var elem = document.querySelectorAll('a[href="' + this.hrefLink + '"]') ;
    if (elem == undefined) {
        return console.log("Не удалось найти елемент");
    }
    return elem[0].parentNode.remove(elem[0]);
}
}

function Menu(className, itemsMenu){
    Container.call(this, className);
        this.itemsMenu = itemsMenu;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {


    var result = '<ul class="' + this.className + '">';
    for (var item in this.items) {
        if (this.items[item] instanceof MenuItem) {
            result += this.items[item].render();
        }
    }
    result += "</ul>";
    return result;
}

function MenuItem(className, hrefLink, contentItem, subMenu) {
    Container.call(this, className, hrefLink);
    this.contentItem = contentItem;
    this.subMenu = subMenu;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
var result = '<li class" '+ this.className +' "><a href="'+ this.hrefLink +'">' + this.contentItem + '</a>';
if(this.subMenu instanceof Menu) {
    result += this.subMenu.render();
}
result += '</li>';
return result;
}




//Меню
var m_item1 = new MenuItem( "menu-item","/", "Главная");
var m_item2 = new MenuItem("menu-item","/catalogue/", "Каталог", subm_1);
var m_item3 = new MenuItem("menu-item","/gallery/", "Галерея");
var m_item4 = new MenuItem("menu-item","/sale/", "Акции");
var menu =new Menu("menu",{0: m_item1, 1: m_item2, 2: m_item3, 3: m_item4});
//подменю
var subm_item1 = new MenuItem("subm_item", "/catalogue/phone.html", "Сотовые телефоны");
var subm_item2 = new MenuItem("subm_item", "/catalogue/tablet.html", "Планшеты");
var subm_item3 = new MenuItem("subm_item", "/catalogue/access.html", "Аксессуары", subsubm_1);
var subm_1 = new Menu("submenu", {0: subm_item1, 1: subm_item2, 2: subm_item3});

var subsubm_item1 = new MenuItem("subm_item", "/catalogue/access/case.html", "Чехлы");
var subsubm_item2 = new MenuItem("subm_item", "/catalogue/access/glass.html", "Защитные стекла");
var subsubm_item3 = new MenuItem("subm_item", "/catalogue/access/flash.html", "Карты памяти");
var subsubm_1 = new Menu("submenu", {0: subsubm_item1, 1: subsubm_item2, 2: subsubm_item3});

var createMenu = menu.render();

document.write(createMenu);


m_item4.remove();

