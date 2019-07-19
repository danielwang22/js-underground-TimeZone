const clockTable = document.querySelector('.clockTable');
var options = { year: 'numeric', month: 'long', day: 'numeric' ,hour:'numeric',minute:'numeric'};
setInterval(() => {
    var d = new Date();
    var TimeZone = [
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
            bg:'bg-primary',
            text:'text-secondary'
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
            bg:'bg-secondary',
            text:'text-primary'
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
            bg:'bg-secondary',
            text:'text-primary'
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
            bg:'bg-secondary',
            text:'text-primary'
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
            bg:'bg-primary',
            text:'text-secondary'
        },
    ]


    var template = '';
    TimeZone.forEach(function(item){
         template +=`
        <div class="${item.bg} ${item.text} d-flex flex-row justify-content-around align-items-center border">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <span class="font-size-2">${item.city}</span>
                <span class="font-size-1">${item.date()}</span>
            </div>
            <div class="font-size-3">${item.time()}</div>
        </div>
        `
    })
    clockTable.innerHTML = template;
},1000)
