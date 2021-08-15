let totalAccounts = 40;
let totalSegments = 3;
let totalAgents = 5;
let averageTaskTime = 2;
let rest=true;
let gitLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const inputTextArea = document.getElementById("textarea");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.toLowerCase();
      rest ? (inputTextArea.innerHTML= "" , rest= false) : false
      switch (input.split(':')[0]){
        case "hi":
            inputTextArea.innerHTML += "<p class='user'> User: " + input + "</p>";
            inputTextArea.innerHTML += "<p class='bot'> Bot: Enter Total Accounts </p>";
            inputField.placeholder="account:";
            break;
        case "account":
            inputTextArea.innerHTML += "<p class='user'> User: " + input + "</p>";
            inputTextArea.innerHTML += "<p class='bot'> Bot: Enter Total Segments </p>";
            inputField.placeholder= "segment:";
            totalAccounts = input.split(':')[1];
            break;
        case "segment":
            inputTextArea.innerHTML += "<p class='user'> User: " + input + "</p>";
            inputTextArea.innerHTML += "<p class='bot'> Bot: Enter Total Agents </p>";
            inputField.placeholder= "agent:";
            totalSegments = input.split(':')[1];
            break;
        case "agent":
            inputTextArea.innerHTML += "<p class='user'> User: " + input + "</p>";
            inputTextArea.innerHTML += "<p class='bot'> Bot: Enter Average Time per Agents </p>";
            inputField.placeholder = "avgtime:";
            totalAgents = input.split(':')[1];
            break;
        case "avgtime":
            averageTaskTime = input.split(':')[1];
            inputTextArea.innerHTML += "<p class='user'> User: " + input + "</p>";
            inputTextArea.innerHTML  = "<p class='bot'> Bot: Generating simulation for below </p>";
            inputTextArea.innerHTML += "<p class='bot'> Accounts "+totalAccounts+" </p>";
            inputTextArea.innerHTML += "<p class='bot'> Segments "+totalSegments+" </p>";
            inputTextArea.innerHTML += "<p class='bot'> Agents "+totalAgents+" </p>";
            inputTextArea.innerHTML += "<p class='bot'> Average Task Time "+averageTaskTime+" </p></br>";
            
            let calc1 = parseInt(totalAccounts/totalAgents)*averageTaskTime;
            let calc2 = parseInt(totalAccounts%totalAgents)*averageTaskTime;
            let total_time = calc1 + calc2 +5 
            
            inputTextArea.innerHTML += "<p class='bot'> *** Total Time "+total_time+" Sec*** </p></br>";
            inputField.placeholder = "visualize:";
            break;
        case "visualize":
            if(input.split(':')[1] == 'y'){
              parent.updateSimulationDetails(totalAccounts,totalSegments,totalAgents,averageTaskTime)
              parent.runSimulation();
            }
            inputField.placeholder = "Enter Next Simulation Details..."; 
            rest = true;
            break;
        default:
            inputTextArea.innerHTML += "<p class='user'> User: " + input + "</p>";
            inputTextArea.innerHTML += "<p class='bot'> Bot: Invalid Input </p>";
            rest = true;
      }
      inputField.value = "";
    }
  });
});
