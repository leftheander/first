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
    for (var item in this.itemsMenu) {
        if (this.itemsMenu[item] instanceof MenuItem) {
            result += this.itemsMenu[item].render();
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


//подподменю
var subsubmenuItem1 = new MenuItem("submenu-item", "/catalogue/access/case.html", "Чехлы");
var subsubmenuItem2 = new MenuItem("submenu-item", "/catalogue/access/glass.html", "Защитные стекла");
var subsubmenuItem3 = new MenuItem("submenu-item", "/catalogue/access/flash.html", "Карты памяти");
var subsubmenu1 = new Menu("submenu", {0: subsubmenuItem1, 1: subsubmenuItem2, 2: subsubmenuItem3});



//подменю
var submenuItem1 = new MenuItem("submenu-item", "/catalogue/phone.html", "Сотовые телефоны");
var submenuItem2 = new MenuItem("submenu-item", "/catalogue/tablet.html", "Планшеты");
var submenuItem3 = new MenuItem("submenu-item", "/catalogue/access.html", "Аксессуары", subsubmenu1);
var submenu1 = new Menu("submenu", {0: submenuItem1, 1: submenuItem2, 2: submenuItem3});

//Меню
var menuItem1 = new MenuItem("menu-item","/catalogue", "Каталог", submenu1);
var menuItem2 = new MenuItem("menu-item","/gallery", "Галерея");
var menuItem3 = new MenuItem("menu-item","/sale", "Акции");
var menuItem4 = new MenuItem('menu-item', "/cabinet", 'Личный кабинет');
var menu =new Menu("menu",{0: menuItem1, 1: menuItem2, 2: menuItem3, 3: menuItem4});
var createMenu = menu.render();

document.write(createMenu);


menuItem4.remove();

