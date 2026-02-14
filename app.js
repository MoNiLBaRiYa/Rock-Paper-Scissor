let userscore = 0;
let computerscore = 0;
let isPlaying = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreElement = document.querySelector("#userscore");
const computerScoreElement = document.querySelector("#computerscore");
const loadingContainer = document.querySelector("#loadingContainer");
const choicesContainer = document.querySelector("#choices");

// Generate computer's random choice
const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

// Update score display with animation
const updateScore = (winner) => {
    if (winner === "user") {
        userscore++;
        userScoreElement.innerText = userscore;
        userScoreElement.style.transform = "scale(1.3)";
        setTimeout(() => {
            userScoreElement.style.transform = "scale(1)";
        }, 300);
    } else if (winner === "computer") {
        computerscore++;
        computerScoreElement.innerText = computerscore;
        computerScoreElement.style.transform = "scale(1.3)";
        setTimeout(() => {
            computerScoreElement.style.transform = "scale(1)";
        }, 300);
    }
};

// Show result with styling
const showResult = (userwin, isDraw, userChoice, computerChoice) => {
    msg.classList.remove("win", "lose", "draw");
    
    if (isDraw) {
        msg.innerText = `Draw! Both chose ${userChoice}`;
        msg.classList.add("draw");
    } else if (userwin) {
        msg.innerText = `You Win! ${userChoice} beats ${computerChoice}`;
        msg.classList.add("win");
        updateScore("user");
    } else {
        msg.innerText = `You Lose! ${computerChoice} beats ${userChoice}`;
        msg.classList.add("lose");
        updateScore("computer");
    }
};

// Show loading animation
const showLoading = () => {
    loadingContainer.classList.add("active");
    choicesContainer.classList.add("disabled");
};

// Hide loading animation
const hideLoading = () => {
    loadingContainer.classList.remove("active");
    choicesContainer.classList.remove("disabled");
};

// Main game logic
const playGame = (userChoice) => {
    if (isPlaying) return;
    
    isPlaying = true;
    console.log("User choice:", userChoice);
    
    // Add selection animation
    const selectedChoice = document.querySelector(`[data-choice="${userChoice}"]`);
    selectedChoice.classList.add("selected");
    
    // Show loading animation
    showLoading();
    
    // Generate computer choice
    const computerChoice = genComputerChoice();
    console.log("Computer choice:", computerChoice);
    
    // Wait 5 seconds before showing result
    setTimeout(() => {
        if (userChoice === computerChoice) {
            console.log("Game Draw");
            showResult(false, true, userChoice, computerChoice);
        } else {
            let userwin = false;
            
            if (userChoice === "rock") {
                userwin = computerChoice === "scissors";
            } else if (userChoice === "paper") {
                userwin = computerChoice === "rock";
            } else if (userChoice === "scissors") {
                userwin = computerChoice === "paper";
            }
            
            console.log(userwin ? "You Win!" : "You Lose!");
            showResult(userwin, false, userChoice, computerChoice);
        }
        
        // Hide loading and reset
        hideLoading();
        selectedChoice.classList.remove("selected");
        isPlaying = false;
    }, 3000);
};


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("data-choice");
        console.log(`${userChoice} was clicked`);
        playGame(userChoice);
    });
});

// Add smooth transitions to score numbers
userScoreElement.style.transition = "transform 0.3s ease";
computerScoreElement.style.transition = "transform 0.3s ease";

