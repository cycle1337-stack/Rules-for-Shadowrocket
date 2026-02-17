// 针对 Bilibili Tab 接口的定制化脚本
let obj = JSON.parse($response.body);

if ($request.url.includes("resource/show/tab")) {
    // 1. 顶部 Tab 过滤：强制只保留 直播、推荐、热门
    if (obj.data && obj.data.top_left) {
        obj.data.top_left = obj.data.top_left.filter(item => 
            ["直播", "推荐", "热门"].includes(item.name)
        );
    }
    // 2. 顶部图标过滤：只保留右上角 消息
    if (obj.data && obj.data.top) {
        obj.data.top = obj.data.top.filter(item => item.name === "消息");
    }
    // 3. 去除右上角“更多”按钮
    if (obj.data) obj.data.top_more = [];
}

$done({body: JSON.stringify(obj)});
