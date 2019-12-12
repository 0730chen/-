//字符串转化成对象
//logo有图片和文本
import Web from './web.js'
import picUrl from "./pic.js";

let i = 0
let x = localStorage.getItem('x')
const xObject = Web
console.log(x)
let $last = $('.last')
console.log()
let hasMap = x === null ? [
    {logo: 'A', url: 'https://www.acfun.cn/', imgUrl: `https://cdn.aixifan.com/ico/favicon.ico`},
    {logo: 'B', url: 'https://www.baidu.com/', imgUrl: `https://www.baidu.com//favicon.ico`},
] : JSON.parse(x)
//添加内容是$('标签'),然后使用append appendTo appendAfter
//定义一个函数
const simpliUrl = (url) => {
    return url.replace(/((http:\/\/)|(https:\/\/))(www\.)?/, '').replace('/', '')
}

{/*<div className="logo">${node.logo[0]}</div>*/
}
const imgUrl = (picUrl) => {
    let i = 1
    return picUrl[i]
}
let src = imgUrl(picUrl)
console.log(src);
const render = () => {
    $('.itemList').find('.item').remove()
    console.log('渲染时候的hasMap')
    console.log(hasMap);
    // $('.bg').attr('src',src)
    hasMap.forEach((node, index) => {
        let $li = $(`
        <li class="item">
        <div class="item-container">
        <img src="${node.imgUrl}" alt="" class="logoImg">
        <div class="delete">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shanchu"></use>
        </svg>
        </div>
        </div>
        <div class="content">${simpliUrl(node.url)}</div>
      </li>`).insertBefore($last)
        $li.on('click', () => {
            console.log(node)
            window.open(node.url)
        })
        $('.item').on('click', '.delete', e => {
            e.stopPropagation()//阻止冒泡
            hasMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.last').on('click', () => {
    let url = window.prompt('你要添加的网站')
    let imgUrl = url + `/favicon.ico`
    console.log(url);
    // if (url === '' || url.indexOf('http') !== 0) {
    //     url = simpliUrl('https://' + url)
    // }
    // url = simpliUrl(url)
    if (url === '') {
        alert('不能为空')
    } else if (url === null) {
        alert('取消了！！！')
    } else {
        hasMap.push({logo: url[0], url: url, imgUrl: imgUrl})
        console.log(`hasMap`);
        console.log(hasMap);
        const string = JSON.stringify(hasMap)//序列化
        localStorage.setItem('x', string)
        render()
    }
})

//监听页面离开
window.onbeforeunload = () => {
    //将数据储存在localstrage中，只能存字符串
    const string = JSON.stringify(hasMap)//序列化
    console.log(`离开时的hasMap`)
    console.log(hasMap);
    console.log(`string`)
    console.log(string)
    localStorage.setItem('x', string)


}
$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key) {
            window.open(hasMap[i].url)
        }
    }
})
