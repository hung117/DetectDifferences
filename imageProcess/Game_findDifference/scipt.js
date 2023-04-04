
var score = 0.0
var score_interpolation = 0.0
document.querySelector(".grid-item h4").innerHTML = "Find the differences minigame";
// document.querySelector("#score").innerHTML = score + "/100";
const SndImage = document.querySelector("#SndImage");

if(SndImage==undefined){
    console.log('cannot get SndImage')
}
fetch('../output/coor.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        mydata = json
        var len = mydata['differences'].length
        console.log(len)
        score_interpolation = 100/len
        mydata['differences'].forEach(data => {
            console.log(data['coor'][0]['x'])
            console.log(data['coor'][0]['y'])

            cx = data['coor'][0]['x']
            cy = data['coor'][0]['y']
            radius =  data['radius']
            createSpot(cx,cy,radius)
        });
    })


// # click handling
function handleClick(event,spotDOM) {
    if(score < 100){
        score += score_interpolation
        document.querySelector("#score").innerHTML ="Score: "+ score + "/100";
        // ## draw Circle -- more like make it visible
        spotDOM.style.opacity = '100%'
    console.log('element clicked 🎉🎉🎉', event);
    }
}

// # manipulate html DOM
function createSpot(cx,cy,radius){
    const spot = document.createElement('div');
    spot.classList.add('spot');
    
    // config spot
    spot.style.top = cy
    spot.style.left =  cx
    spot.style.width = radius+'px'
    spot.style.height =  radius+'px'
    const spotContent = document.createElement('p');
    spotContent.textContent ="clickme";
    // spot.addEventListener('click',()=>{ handleClick(event,spot)}, {once : true});
    spot.addEventListener('click',()=>{ handleClick(event,spot)});
    // ## Add to the img
    SndImage.appendChild(spot);
    spot.appendChild(spotContent);
}


// Game Logic
// Assign differences spot

// Game Loop
function GameCallback() {
    if(score == 100){
        document.querySelector("#score").innerHTML = "Congratulation!! you WON !"
    }
}

setInterval( GameCallback, 900);