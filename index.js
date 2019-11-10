let i = 0
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)//字符串转化成对象
//logo有图片和文本
let $last = $('.last')
let hasMap = xObject === [] || [
    { logo: 'A', url: 'https://www.bilibili.com/' },
    { logo: 'B', url: 'https://www.bilibili.com/' },
    { logo: 'C', url: 'https://www.bilibili.com/' },
]
//添加内容是$('标签'),然后使用append appendTo appendAfter
//定义一个函数

const render = () => {
    $('.itemList').find('.item').remove()
    hasMap.forEach((node, index) => {
        let $li = $(`
        <li class="item">
        <div class="logo">${node.logo}</div>
        <div class="content">${node.logo}站</div>
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
    if (url === '' || url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hasMap.push({ logo: url[0], url: url })
    render()

    //在使用localstrage中储存数据
    // console.log($('.container'))
})

//监听页面离开
window.onbeforeunload = () => {
    //将数据储存在localstrage中，只能存字符串
    const string = JSON.stringify(hasMap)//序列化
    localStorage.setItem('x', string)


}
// $('.Add').click(()=>{
//     console.log(`添加`)
// })
//1.使用.on添加相关事件，或者使用事件回调，添加事件