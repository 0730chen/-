let i =0

//添加内容是$('标签'),然后使用append appendTo appendAfter
$('.Add').on('click',(e)=>{
    i = i+1
    console.log('添加')
    $('.item-lists').append(`
    <li>我是第${i}个项目</li>
    `)
    console.log($('.container'))
})
// $('.Add').click(()=>{
//     console.log(`添加`)
// })
//1.使用.on添加相关事件，或者使用事件回调，添加事件