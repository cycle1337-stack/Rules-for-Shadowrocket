let obj = JSON.parse($response.body);

if (obj.data) {
    // 1. 强制重组顶部文字标签 (解决春节、追番等残留问题)
    if (obj.data.top_left) {
        let savedTabs = obj.data.top_left.filter(item => 
            item.name === "直播" || item.name === "推荐" || item.name === "热门"
        );
        obj.data.top_left = savedTabs;
    }

    // 2. 强制重组右侧图标 (找回并保留消息图标)
    if (obj.data.top) {
        let savedIcons = obj.data.top.filter(item => 
            item.name === "消息" || item.tab_id === "消息" || item.name === "ic_messages"
        );
        obj.data.top = savedIcons;
    }

    // 3. 彻底清空“更多”按钮和潜在的活动入口
    obj.data.top_more = [];
}

$done({body: JSON.stringify(obj)});
