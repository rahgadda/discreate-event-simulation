let simulationDetails = {
  Accounts: 0,
  Segments: 0,
  Agents: 0,
  AvgTaskTime: 0,
};

// Enable & disable chat
function chatClick() {
  const chatWindow = document.getElementById("iframe_chat_window");
  const simulationFrame = document.getElementById("simulation-frame");

  if (chatWindow.style.display === "none") {
    chatWindow.style.display = "inline";
    simulationFrame.style.display = "none";
  } else {
    chatWindow.style.display = "none";
    simulationFrame.style.display = "none";
  }
}

// Run simulation IFrame
function runSimulation() {
  const chatWindow = document.getElementById("iframe_chat_window");
  const simulationFrame = document.getElementById("simulation-frame");

  refreshId = setInterval(function () {
    chatWindow.style.display = "none";
    simulationFrame.src = "simulation/simulation.html";
    simulationFrame.style.display = "inline";
    clearInterval(refreshId);
  }, 4000);
}

function updateSimulationDetails(totalAccounts, totalSegments, totalAgents, averageTaskTime) {
  simulationDetails.Accounts = totalAccounts;
  simulationDetails.Segments = totalSegments;
  simulationDetails.Agents = totalAgents;
  simulationDetails.AvgTaskTime = averageTaskTime;
}

function returnSimulationDetails(){
  return simulationDetails;
}
