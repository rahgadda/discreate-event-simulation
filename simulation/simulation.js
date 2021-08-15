let pause= true;
const timer = document.getElementsByClassName("timer");
const startStopButton = document.getElementsByClassName("start-stop-button");
let sec = 0;
let min = 0;
let assignmentCounter = 0;
let segmentAssignmentCounter = 1;
let reAssignmentCounter = 0;
let reAssignmentSegmentCounter = 0;
let accountSegmentStartStyle = document.createElement('style');

let simulationDetails = {
  Accounts: 20,
  Segments: 4,
  Agents: 3,
  AvgTaskTime: 1
};

function displaySimulation() {
  simulationDetails=parent.returnSimulationDetails();
  const accountNodes = document.getElementById("account");
  const segmentNodes = document.getElementById("segment");
  const agentNodes = document.getElementById("agent");

  //Create Account <i> tag, Apply CSS, Animation
  for (let i=0,j = 0, k = 0; i< simulationDetails.Accounts; i++,j++){
    let iTag = document.createElement('i');
    iTag.setAttribute("id",i);
    iTag.setAttribute("class","fas fa-file-contract");
    iTag.style.position="absolute";
    iTag.addEventListener('animationend',() =>{
      accountSegmentAnimationEnd(i)
    });

    if (j < 6) {
      iTag.style.top = 20 + k * 10 + "%";
      iTag.style.left = j * 3 + "%";
    } else {
      j = 0;
      k++;
      iTag.style.top = 20 + k * 10 + "%";
      iTag.style.left = j * 3 + "%";
    }
    accountNodes.appendChild(iTag);
  }
  
  //Create Segments <i> tag,Apply CSS, Animation
  for (let i = 0; i < simulationDetails.Segments; i++) {
    let iTag = document.createElement('i');
    iTag.setAttribute("class","fas fa-microchip");
    iTag.style.position="absolute";
    iTag.style.left="50%";
    iTag.style.top = 20 + i * 10 + "%";

    let h1Tag = document.createElement('h1');
    h1Tag.setAttribute("class","segment-counter");
    h1Tag.style.position="absolute";
    h1Tag.style.left="55%";
    h1Tag.innerHTML="0"
    h1Tag.style.top = 16 + i * 10 + "%";

    segmentNodes.appendChild(iTag);
    segmentNodes.appendChild(h1Tag);
  }

  //Create Agents <i> tag, Apply CSS, Animation
  for (let i = 0; i < simulationDetails.Agents; i++) {
    let iTag = document.createElement('i');
    iTag.setAttribute("class","fas fa-users");
    iTag.style.position="absolute";
    iTag.style.left="90%";
    iTag.style.top = 20 + i * 10 + "%";
    agentNodes.appendChild(iTag);
  }

  //Total Time Calculator
  setInterval(function () {
    if(!pause){
      sec++;
      sec > 59 ? (min++, (sec = 0)) : false;
      timer[0].innerHTML = "Total Time " + min + ":" + sec;
    }
  }, 1000);

  //Poller To Move Accounts to Agents
  pollerInterval = setInterval(function () {
    const h1Tag = document.getElementsByClassName("segment-counter");
    count =0;

    for(let i=0; i<h1Tag.length; i++){
      count+= parseInt(h1Tag[i].innerHTML);
    }

    if(count >0 && !pause){
      for(let i=0, k=0; i<simulationDetails.Agents && i<count ; i++,k++,reAssignmentSegmentCounter++){
        if(reAssignmentSegmentCounter==simulationDetails.Segments){
          reAssignmentSegmentCounter=0;
        }
        if(k==simulationDetails.Accounts.Agents){
          k=0;
        }
        
        h1Tag[reAssignmentSegmentCounter].innerHTML=parseInt(h1Tag[reAssignmentSegmentCounter].innerHTML)-1;
        document.getElementById(reAssignmentCounter).style.top=20 + k * 10 + "%";
        document.getElementById(reAssignmentCounter).style.left = "85%";
        reAssignmentCounter++;
      }
    }else if(reAssignmentCounter == simulationDetails.Accounts){
      pause= true;
      startStopButton[0].innerHTML = "Completed";
      clearInterval(pollerInterval);
    }

  },(simulationDetails.AvgTaskTime*1000));
}

// When start button is clicked
function startSimulation() {
  if(startStopButton[0].innerHTML == "Stop"){
    startStopButton[0].innerHTML = "Start";
    pause= true

    accountSegmentStartStyle.innerHTML =	'.account > * {' +
                                            'animation-play-state: paused;' +
                                          '} ';
  }else if(startStopButton[0].innerHTML == "Start"){
    startStopButton[0].innerHTML = "Stop";
    pause= false;
    accountSegmentStartStyle.innerHTML =	'.account > * {' +
                                            'animation-play-state: running;' +
                                          '} '
                                            
  }

  // Get the first script tag
  var ref = document.querySelector('script');

  // Insert our new styles before the first script tag
  ref.parentNode.insertBefore(accountSegmentStartStyle, ref);
}


//IFrame double click
window.addEventListener("dblclick", function () {
  this.parent.chatClick();
});


//Updating Accounts Number at Segments
function accountSegmentAnimationEnd(id){
  const h1Tag = document.getElementsByClassName("segment-counter");
  h1Tag[assignmentCounter].innerHTML=parseInt(h1Tag[assignmentCounter].innerHTML)+1;
  
  document.getElementById(id).style.top=20 + assignmentCounter * 10 + "%";
  document.getElementById(id).style.left="45%"
  
  if(assignmentCounter == simulationDetails.Segments-1){
    assignmentCounter=-1;
  }
  assignmentCounter++;
  segmentAssignmentCounter++;
  
}
