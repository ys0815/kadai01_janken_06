const hands = ["gu", "choki", "pa"];
const handImages = {
	gu: "./img/gu.png",
	choki: "./img/choki.png",
	pa: "./img/pa.png",
};

let winCount = 0;
let loseCount = 0;
let gameCount = 0;

const buttons = document.querySelectorAll(".hand-button");
const resultText = document.getElementById("result");
const cpuImage = document.getElementById("cpuImage");
const winCountText = document.getElementById("win-count");
const loseCountText = document.getElementById("lose-count");
const winRateText = document.getElementById("win-rate");
const resetButton = document.getElementById("reset-button");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		if (gameCount >= 5) return;

		const playerHand = button.getAttribute("data-choice");
		const cpuHand = hands[Math.floor(Math.random() * hands.length)];

		cpuImage.src = handImages[cpuHand];

		let result;
		if (playerHand === cpuHand) {
			result = "あいこです";
		} else if ((playerHand === "gu" && cpuHand === "choki") || (playerHand === "choki" && cpuHand === "pa") || (playerHand === "pa" && cpuHand === "gu")) {
			result = "あなたの勝ちです";
			winCount++;
		} else {
			result = "あなたの負けです";
			loseCount++;
		}

		gameCount++;
		resultText.textContent = result;
		winCountText.textContent = winCount;
		loseCountText.textContent = loseCount;
		winRateText.textContent = `${((winCount / gameCount) * 100).toFixed(1)}%`;

		if (gameCount === 5) {
			buttons.forEach((btn) => (btn.disabled = true));
			showFinalResult();
			resetButton.style.display = "inline-block";
		}
	});
});

resetButton.addEventListener("click", () => {
	winCount = 0;
	loseCount = 0;
	gameCount = 0;
	resultText.textContent = "結果がここに表示されます";
	cpuImage.src = "./img/gu.png";
	winCountText.textContent = "0";
	loseCountText.textContent = "0";
	winRateText.textContent = "0%";
	buttons.forEach((btn) => (btn.disabled = false));
	resetButton.style.display = "none";
});

function showFinalResult() {
	if (winCount > loseCount) {
		alert("勝ち越しです！");
	} else if (winCount < loseCount) {
		alert("負け越しです…");
	} else {
		alert("引き分けです！");
	}
}
