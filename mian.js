let m = {
    i: 0,
    x: JSON.parse(localStorage.getItem('x')),
    $last: $('.last')


}
let v = {
    html: ``,
    render: (hasMap) => {
        $('.itemList').find('.item').remove()
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
                v.render()
            })
        })

    }
}
let c = {
    init: () => {
        let hasMap = m.x === null ? [
                {logo: 'A', url: 'https://www.acfun.cn/', imgUrl: `https://cdn.aixifan.com/ico/favicon.ico`},
                {logo: 'B', url: 'https://www.baidu.com/', imgUrl: `https://www.baidu.com//favicon.ico`},
            ] : m.x
        v.render(hasMap)

    },
    simpliUrl: (url) => {
        return url.replace(/((http:\/\/)|(https:\/\/))(www\.)?/, '').replace('/', '')
    }
}