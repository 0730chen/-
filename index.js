//字符串转化成对象
//logo有图片和文本
import Web from './web.js'
import picUrl from "./pic.js";
let i = 0
const xObject = Web
let $last = $('.last')

let hasMap = xObject === null ? [
    {logo: 'A', url: 'https://www.acfun.cn/', imgUrl: `https://cdn.aixifan.com/ico/favicon.ico`},
    {logo: 'B', url: 'https://www.baidu.com/', imgUrl: `https://www.baidu.com//favicon.ico`},
]:xObject
//添加内容是$('标签'),然后使用append appendTo appendAfter
//定义一个函数
const simpliUrl = (url) => {
    return url.replace(/((http:\/\/)|(https:\/\/))(www\.)?/, '').replace('/', '')
}

{/*<div className="logo">${node.logo[0]}</div>*/
}
const imgUrl = (picUrl)=>{
    let i = 0
    return picUrl[i]
}
let src = imgUrl(picUrl)
console.log(src);
const render = () => {
    $('.itemList').find('.item').remove()
    console.log('渲染时候的hasMap')
    console.log(hasMap);
    $('.bg').attr('src',src)
    hasMap.forEach((node, index) => {
        let $li = $(`
        <li class="item">
        <img src="${node.imgUrl}" alt="" class="logoImg">
        <div class="content">${simpliUrl(node.url)}</div>
        <div class="delete">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shanchu"></use>
        </svg>
        </div>
      </li>`).insertBefore($last)
        $li.on('click', () => {
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
    console.log(url)
    let imgUrl = url + `/favicon.ico`
    console.log(imgUrl);

    if (url === '' || url.indexOf('http') !== 0) {
        url = simpliUrl('https://' + url)

    }
    url = simpliUrl(url)
    hasMap.push({logo: url[0], url: url, imgUrl: imgUrl})
    console.log(`hasMap`);
    console.log(hasMap);
    const string = JSON.stringify(hasMap)//序列化
    localStorage.setItem('x', string)
    render()

    //在使用localstrage中储存数据
    // console.log($('.container'))
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
