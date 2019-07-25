//時鐘列表 DOM
const clockTable = document.querySelector('.clockTable');
//toLocaleString 要讀取的時間格式 'numeric'數字格式 'long'英文字
var options = { year: 'numeric', month: 'long', day: 'numeric' ,hour:'numeric',minute:'numeric'};
//建立一個 Class 來渲染 timezone table
class timezone{
    constructor(){
        //新增陣列加入初始顯示的五個國家
        //先建立各國的timeZone在加入options成新的options
        this.TimeZone = [
            {
                city:'New York',
                timeZone: {timeZone: 'America/New_York'},
                date(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[0]
                },
                time(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[1]
                },
                bg:'bg-primary', //背景 CSS class
                text:'text-secondary', //文字 CSS class
                id:this.guidGenerator() //HTML ID
            },
            {
                city:'London',
                timeZone: {timeZone: 'Europe/London'},
                date(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[0]
                },
                time(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[1]
                },
                bg:'bg-secondary', //背景 CSS class
                text:'text-primary', //文字 CSS class
                id:this.guidGenerator() //HTML ID
            },
            {
                city:'BANGKOK',
                timeZone: {timeZone: 'Asia/Bangkok'},
                date(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[0]
                },
                time(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[1]
                },
                bg:'bg-secondary', //背景 CSS class
                text:'text-primary', //文字 CSS class
                id:this.guidGenerator() //HTML ID
            },
            {
                city:'TAIWAN',
                timeZone: {timeZone: 'Asia/Taipei'},
                date(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[0]
                },
                time(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[1]
                },
                bg:'bg-secondary', //背景 CSS class
                text:'text-primary', //文字 CSS class
                id:this.guidGenerator() //HTML ID
            },
            {
                city:'SYDNEY',
                timeZone: {timeZone: 'Australia/Sydney'},
                date(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[0]
                },
                time(){
                    let newOp = {...options,...this.timeZone}
                    let date = d.toLocaleString('de-DE',newOp).split(',')
                    return date[1]
                },
                bg:'bg-primary', //背景 CSS class
                text:'text-secondary', //文字 CSS class
                id:this.guidGenerator() //HTML ID
            }
        ]
    }
    get GetTimeZone() { return this.TimeZone }
    set SetTimeZone(val) { return this.TimeZone.push(val) } //增加國家用
    set DeleteTimeZone(val){ return this.TimeZone.splice(val,1)} //刪除國家用
    //亂數ID產生器
    guidGenerator(){
        var S4 = () => {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    //讀取ID找到引索位置，刪除陣列裡的國家
    delete(ID){
        //MAP先產生所有ID的陣列，在indexOf找出我們所要的ID位置
        const index = this.GetTimeZone.map(e => e.id).indexOf(ID);
        //console.log(index)
        this.DeleteTimeZone = index;
        this.Template();
    }
    //顯示模板
    Template(){
        //因陣列內容固定，每次setInterval都會新增相同的模組，所以先清空在全部渲染一次，就不會一直新增相同國家
        var template = '';
        //取得陣列炫染陣列裡的所有內容
        this.GetTimeZone.forEach(item => {
            template +=`
            <div id="${item.id}" class="${item.bg} ${item.text} d-flex flex-row justify-content-around align-items-center border">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <span class="font-size-2">${item.city}</span>
                    <span class="font-size-1">${item.date()}</span>
                </div>
                <div class="font-size-3">${item.time()}</div>
                <div class="d-flex flex-row justify-content-around align-items-center font-size-1" style="cursor:pointer;" onclick='TZ.delete("${item.id}")'>x</div>
            </div>
            `
        })
        clockTable.innerHTML = template; //加到HTML裡面
    }
}

//宣告 autoComplete 實體
const autoCompletejs = new autoComplete({
    data: {
        src: async () => {
            //placeholder Loading 文字
            document
                .querySelector("#autoComplete")
                .setAttribute("placeholder", "Loading...");
            // Fetch 抓取 JSON
            const source = await fetch(
                "../js-underground-TimeZone/databaseOfTimeZones.json"
            );
            console.log(source);
            //讀取到資料轉成可以讀的陣列格式
            const data = await source.json();
            // 貼上 placeholder 文字
            document
                .querySelector("#autoComplete")
                .setAttribute("placeholder", "Country & City");
            // Returns 資料
            return data;
        },
        //以城市名稱當搜尋關鍵字
        key: ["TZDatabaseName"],
        //true靜態資料，false動態資料
        cache: true
    },
    //排序
    sort: (a, b) => {
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
    },
    //placeHolder預設文字
    placeHolder: "Country & City",
    //預設selector是誰?
    selector: "#autoComplete",
    //讀取資料最短幾秒後呈現結果
    debounce: 300,
    //搜尋模式 'strict'嚴謹 'loose'放鬆
    searchEngine: "strict",
    //突出顯示匹配結果
    highlight: true,
    //最大顯示結果數
    maxResults: 10,
    //顯示搜尋結果列表
    resultsList: {
        render: true,
        container: source => {
             source.setAttribute("id", "autoComplete_results_list");
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "ul"
    },
    //將列表加入搜尋結果項目
    resultItem: {
        content: (data, source) => {
            source.innerHTML = data.match;
        },
        element: "li"
    },
    //無結果時的顯示 "No Results"
    noResults: () => {
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = "No Results";
        document.querySelector("#autoComplete_results_list").appendChild(result);
    },
    //點選選項後的動作
    onSelection: feedback => {
        const selection = feedback.selection.value.TZDatabaseName;
        // 清除 Input 文字
        document.querySelector("#autoComplete").value = '';
        //placeholder 文字變成選取結果
        document
            .querySelector("#autoComplete")
            .setAttribute("placeholder", selection);
        console.log('feedback',selection);
        //將國家新增到TimeZone陣列
        //將國家與城市名稱分開
        let temp = selection.split(/\//g);
        //背景與文字顏色樣式
        let RandomStyle = ['primary','secondary']
        //要加入的陣列
        //判斷搜尋結果，以下兩種狀況 => 1. 國家/城市 長度大於1取後面城市名 2. 城市 長度沒有大於1直接取城市名 
        let tempObj = {
            city: temp.length > 1 ? temp[1] : temp[0],
            timeZone: {timeZone: selection},
            date(){
                let newOp = {...options,...this.timeZone}
                let date = d.toLocaleString('de-DE',newOp).split(',')
                return date[0]
            },
            time(){
                let newOp = {...options,...this.timeZone}
                let date = d.toLocaleString('de-DE',newOp).split(',')
                return date[1]
            },
            //隨機產生背景與文字顏色、ID
            bg:`bg-${RandomStyle[Math.floor(Math.random() * 2)]}`,
            text:`text-${RandomStyle[Math.floor(Math.random() * 2)]}`,
            id:TZ.guidGenerator()
        }
        //加到陣列裡
        TZ.SetTimeZone = tempObj;
        //重新渲染
        TZ.Template();
    }
});

// 初始搜尋列表隱藏
window.addEventListener("load", () => {
    document.querySelector("#autoComplete_results_list").style.display = "none";
});
//當以下動作觸發時顯示搜尋列表
["focus", "blur", "mousedown", "keydown"].forEach(eventType => {

    document.addEventListener(eventType, event => {
        const input = document.querySelector("#autoComplete");
        const resultsList = document.querySelector("#autoComplete_results_list");
        var current = event.target;
        //如果操作對象是input或是resultsList顯示resultsList，否則display:none
        if (
            current === input ||
            current === resultsList ||
            input.contains(current) ||
            resultsList.contains(current)
        ) {
            resultsList.style.display = "block";
        } else {
            resultsList.style.display = "none";
        }
    });
});

//初始宣告timezone實體
var d = new Date();
var TZ = new timezone();
TZ.Template(d);

//每過15秒，更新一次時間
setInterval(()=>{
    d = new Date();
    TZ.Template(); //更新時間後，從新渲染一次
},15000)
