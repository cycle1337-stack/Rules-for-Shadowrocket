let obj = JSON.parse($response.body);

if ($request.url.includes("resource/show/tab")) {
    // 1. Filter Top Left Tabs
    if (obj.data && obj.data.top_left) {
        obj.data.top_left = obj.data.top_left.filter(item => 
            item.name === "直播" || item.name === "推荐" || item.name === "热门"
        );
    }
    
    // 2. Filter Top Right Icons (Keep Message Icon)
    if (obj.data && obj.data.top) {
        obj.data.top = obj.data.top.filter(item => 
            item.name === "消息" || item.tab_id === "消息"
        );
    }

    // 3. Remove More Button
    if (obj.data) {
        obj.data.top_more = [];
    }
}

$done({body: JSON.stringify(obj)});
