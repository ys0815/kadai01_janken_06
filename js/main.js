// 出せる手を配列で定義（グー・チョキ・パー）
const hands = ["gu", "choki", "pa"];

// 各手に対応する画像のパスをオブジェクトで定義
const handImages = {
	gu: "./img/gu-1.png",
	choki: "./img/choki-1.png",
	pa: "./img/pa-1.png",
};

// CPUの現在の手（初期値はグー）
// let cpuHand = "gu";
// CPUの手をランダムに切り替えるためのタイマーID
// let intervalId = null;

// HTMLから必要な要素を取得（画像、結果表示、選択ボタン、リセットボタン、勝利音）
const cpuImage = document.getElementById("cpuImage");
const resultText = document.getElementById("result");
const buttons = document.querySelectorAll("button[data-choice]");
const resetButton = document.getElementById("reset-button");
const winSound = document.getElementById("win-sound");

// CPUの手を素早くランダムに切り替える関数（30ミリ秒ごとに実行）
function startShuffling() {
	intervalId = setInterval(() => {
		const randomIndex = Math.floor(Math.random() * hands.length);
		// ランダムな手を選ぶ
		cpuHand = hands[randomIndex];
		// 対応する画像を表示
		$("#cpuImage").attr("src", handImages[cpuHand]);
	}, 30);
}

// 勝敗を判定する関数
function judge(player, cpu) {
	// あいこの場合
	if (player === cpu) {
		return "あいこだよ(^O^)もう一回！";
	}
	// 勝ちパターンの判定（プレイヤーが勝つ条件）
	if ((player === "gu" && cpu === "choki") || (player === "choki" && cpu === "pa") || (player === "pa" && cpu === "gu")) {
		playSound($("#win-sound")[0]); // 勝利時の音楽を再生
		return "きみの勝ち～～(*^_^*)やったね！";
	} else {
		// それ以外は負け
		return "きみの負け…(;_;)また遊ぼ！";
	}
}

// 音を再生する関数（勝ったときに使う）
function playSound(audioElement) {
	if (audioElement) {
		// 毎回最初から再生するために巻き戻す
		audioElement.currentTime = 0;
		// 音を再生
		audioElement.play();
	}
}

// プレイヤーが手を選んだときの処理
$(".buttons button").on("click", function () {
	// CPUのランダム動作を止める
	clearInterval(intervalId);
	// プレイヤーの手を取得
	const playerHand = $(this).data("choice");
	// 勝敗を判定
	const result = judge(playerHand, cpuHand);
	// 結果を画面に表示
	$("#result").text(result);
	// 勝負が終わったので、「もう一回勝負！」リセットボタンを表示
	$("#reset-button").show();
});

// リセットボタンが押されたときの処理
$("#reset-button").on("click", function () {
	// 勝敗結果表示を消す
	$("#result").text("");
	// CPUの手を再びランダムで動かす
	startShuffling();
	// 「もう一回勝負！」リセットボタンを非表示にする
	$("#reset-button").hide();
});

// 初回実行時にCPUの手をランダムに動かす
startShuffling();

// 「もう一回勝負！」リセットボタンは最初は非表示
$("#reset-button").hide();
