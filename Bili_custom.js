let obj = JSON.parse($response.body);

if (obj.data) {
    // 1. 顶部标签：强制只留 直播、推荐、热门
    if (obj.data.top_left) {
        obj.data.top_left = obj.data.top_left.filter(item => 
            ["直播", "推荐", "热门"].includes(item.name)
        );
    }
    
    // 2. 核心修正：强制找回并保护“消息”图标
    // 即使原数据里没有，我们也手动把它插进去，确保它一定显示
    obj.data.top = [
        {
            "id": 176,
            "name": "消息",
            "tab_id": "消息",
            "pos": 1,
            "bubble": null,
            "entrance_id": 102
        }
    ];

    // 3. 彻底清空“更多”按钮和所有活动残留
    obj.data.top_more = [];
    if (obj.data.tab_bak) obj.data.tab_bak = [];
}

$done({body: JSON.stringify(obj)});
