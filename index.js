var isEvenHour;
var logoElement = document.getElementById("logo");
var dateTimeElement = document.getElementById("datetimeholder");
var titleElement = document.getElementById("title");

var specialBackground = document.getElementById("specialBackground")
var specialVideo = document.getElementById("specialVideo");


function init()
{
    loadSpecial();
    startTime();
}

function loadSpecial()
{
    let todayMS = (new Date()).valueOf();
    let hasSpecial = false;

    specials.forEach(special =>
    {
        let startMS = Date.parse(special.start);
        let endMS = Date.parse(special.end) + 86400000 - 1; // 1ms before midnight
        

        if(todayMS >= startMS && todayMS <= endMS)
        {
            hasSpecial = true;
            console.log(`Found Special : ${special.title}`)
            // if special background set
            if(special.background)
            {
                specialBackground.style.background = `url('backgrounds/${special.background}')`;
                specialBackground.style.backgroundSize = "cover";
            }
            
            // if special video set
            if(special.video)
            {
                specialVideo.setAttribute("src", `videos/${special.video}`)
            }

        }
    });
    if(!hasSpecial) console.log("No Special Found")
}

function startTime() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const today = new Date();
    
    // clock
    let h = today.getHours();
    if (h>12) h-=12;
    let m = formatTime(today.getMinutes());
    let s = formatTime(today.getSeconds());
    document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
    
    let d = weekday[today.getDay()];
    let mo = months[today.getMonth()];
    let day = today.getDate();
    let y = today.getFullYear();


    document.getElementById('date').innerHTML =  d + ", " + mo + " " + day + ", " + y;

    var isEvenHourNow = h % 2 == 0;
    if(isEvenHourNow != isEvenHour)
    {
        isEvenHour = isEvenHourNow;
        hourlyFormat();
    }
    
    // date 
    setTimeout(startTime, 1000);
}

function formatTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function hourlyFormat()
{
    console.log("== HOURLY FORMAT ==");
    var RorL = isEvenHour == 0 ? "right" : "left";

    // default BG
    document.body.style.background = `url('backgrounds/default-${RorL}.png')`;
    document.body.style.backgroundSize = "cover";

    // logo position
    logoElement.style.left = isEvenHour ? "1320px": "30px";
    logoElement.style.top = isEvenHour ? "400px": "100px";

    // Date / time position
    dateTimeElement.style.left = isEvenHour ? "0px": "580px";
    dateTimeElement.style.top = isEvenHour ? "300px": "20px";

    titleElement.style.top = isEvenHour ? "50px" : "700px";
}

init();