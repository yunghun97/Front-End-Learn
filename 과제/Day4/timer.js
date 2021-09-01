$('#start').click(function(){
    var timer;
    var hour = $('#hourSpan');
    var setHour = $('#hourText');
    var minute = $('#minuteSpan');
    var setMinute = $('#minuteText');
    var second = $('#secondSpan');
    var setSecond = $('#secondText');
    hour.text(setHour.val());
    minute.text(setMinute.val());
    second.text(setSecond.val());
    var counter = (hour.text()*3600)+(minute.text()*60)+(second.text()*1);
    var temp;
        timer = setInterval(function(){
        counter--;
        hour.text(parseInt(counter/3600));
        temp = counter - (parseInt(counter/3600) * 3600);
        minute.text(parseInt(temp/60));
        temp = temp - (parseInt(temp/60)*60);
        second.text(temp);
        console.log(counter);
        if(counter<=0){
            alert("타이머 종료");
            clearInterval(timer);
        }
    },1000);
    }
    )