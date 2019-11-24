// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Focm":[function(require,module,exports) {
var i = 0;
var x = localStorage.getItem('x');
var xObject = JSON.parse(x); //字符串转化成对象
//logo有图片和文本

console.log("xObject\u6253\u5370");
console.log(xObject);
var $last = $('.last'); // if(xObject ===[]){
//     hasMap = [
//         {logo: 'A', url: 'https://www.acfun.cn/', imgUrl: `https://cdn.aixifan.com/ico/favicon.ico`},
//         {logo: 'B', url: 'https://www.baidu.com/', imgUrl: `https://www.baidu.com//favicon.ico`},
//     ]
// }else{
//     hasMap = xObject
// }

var hasMap = xObject === [] ? [{
  logo: 'A',
  url: 'https://www.acfun.cn/',
  imgUrl: "https://cdn.aixifan.com/ico/favicon.ico"
}, {
  logo: 'B',
  url: 'https://www.baidu.com/',
  imgUrl: "https://www.baidu.com//favicon.ico"
}] : xObject; //添加内容是$('标签'),然后使用append appendTo appendAfter
//定义一个函数

var simpliUrl = function simpliUrl(url) {
  return url.replace(/((http:\/\/)|(https:\/\/))(www\.)?/, '').replace('/', '');
};

{
  /*<div className="logo">${node.logo[0]}</div>*/
}

var render = function render() {
  $('.itemList').find('.item').remove();
  console.log('渲染时候的hasMap');
  console.log(hasMap);
  hasMap.forEach(function (node, index) {
    var $li = $("\n        <li class=\"item\">\n        <img src=\"".concat(node.imgUrl, "\" alt=\"\" class=\"logoImg\">\n        <div class=\"content\">").concat(simpliUrl(node.url), "</div>\n        <div class=\"delete\">\n        <svg class=\"icon\" aria-hidden=\"true\">\n        <use xlink:href=\"#icon-shanchu\"></use>\n        </svg>\n        </div>\n      </li>")).insertBefore($last);
    $li.on('click', function () {
      window.open(node.url);
    });
    $('.item').on('click', '.delete', function (e) {
      e.stopPropagation(); //阻止冒泡

      hasMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.last').on('click', function () {
  var url = window.prompt('你要添加的网站');
  console.log(url);
  var imgUrl = url + "/favicon.ico";
  console.log(imgUrl);

  if (url === '' || url.indexOf('http') !== 0) {
    url = simpliUrl('https://' + url);
  }

  url = simpliUrl(url);
  hasMap.push({
    logo: url[0],
    url: url,
    imgUrl: imgUrl
  });
  console.log("hasMap");
  console.log(hasMap);
  var string = JSON.stringify(hasMap); //序列化

  localStorage.setItem('x', string);
  render(); //在使用localstrage中储存数据
  // console.log($('.container'))
}); //监听页面离开

window.onbeforeunload = function () {
  //将数据储存在localstrage中，只能存字符串
  var string = JSON.stringify(hasMap); //序列化

  console.log("\u79BB\u5F00\u65F6\u7684hasMap");
  console.log(hasMap);
  console.log("string");
  console.log(string);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var _i = 0; _i < hasMap.length; _i++) {
    if (hasMap[_i].logo.toLowerCase() === key) {
      window.open(hasMap[_i].url);
    }
  }
}); // $('.Add').click(()=>{
//     console.log(`添加`)
// })
//1.使用.on添加相关事件，或者使用事件回调，添加事件
},{}]},{},["Focm"], null)
//# sourceMappingURL=navigation.c66ac3e6.js.map