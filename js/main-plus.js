// クイズの内容（問題、選択肢、正解）を配列でまとめている
const quiz = [
	{
		question: "Q.01 Webページの骨組みを作るために使用する主要な言語はどれ？",
		answers: ["1.JavaScript", "2.CSS", "3.HTML", "4.職人の技"],
		correct: "3.HTML", // この問題の正解
	},
	{
		question: "Q.02 Webページの見た目やスタイルを指定するために使用する主要な言語はどれ？",
		answers: ["1.センス", "2.CSS", "3.JavaScript", "4.Python"],
		correct: "2.CSS",
	},
	{
		question: "Q.03 Webページ上で動きのある表現やインタラクティブな機能を実現するために使用する主要な言語はどれ？",
		answers: ["1.HTML", "2.気合", "3.CSS", "4.JavaScript"],
		correct: "4.JavaScript",
	},
	{
		question: "Q.04 Webページが様々な画面サイズで適切に表示されるように設計する考え方を何と呼ぶ？",
		answers: ["1.レスポンシブデザイン", "2.リキッドレイアウト", "3.豊かな想像力", "4.フレキシブルデザイン"],
		correct: "1.レスポンシブデザイン",
	},
	{
		question: "Q.05 Webページ内で、画像を表示するために使用するHTMLの要素はどれ？",
		answers: ["1.img", "2.:D", "3.p", "4.h1"],
		correct: "1.img",
	},
];

let quizIndex = 0; // 今表示しているクイズの番号
let score = 0; // 正解数をカウント

const $buttons = $("button").not("#next-button"); // 選択肢のボタンだけ取得
const $question = $("#js-question"); // 問題文を表示する場所
const $answerArea = $("#answer-area"); // 正誤メッセージ表示エリア
const $answerMessage = $("#answer-message"); // 正誤のメッセージテキスト
const $nextButton = $("#next-button"); // 次の問題へ進むボタン

// クイズの内容を画面に表示する関数
const setupQuiz = () => {
	$question.text(quiz[quizIndex].question); // 問題文を表示
	$buttons.each(function (index) {
		$(this).text(quiz[quizIndex].answers[index]); // 各ボタンに選択肢を表示
	});
	$answerArea.hide(); // メッセージエリアを非表示に
	$buttons.prop("disabled", false); // ボタンを再度有効に
};

setupQuiz(); // 最初の問題を表示

// 選択肢ボタンがクリックされた時の処理
$buttons.on("click", function () {
	const selectedAnswer = $(this).text(); // 押したボタンのテキスト（＝選択した答え）
	$buttons.prop("disabled", true); // 一度押したらボタンを無効化（連打防止）

	if (selectedAnswer === quiz[quizIndex].correct) {
		$answerMessage.text("⭕️正解！").css({ color: "red", fontWeight: "bold", fontSize: "30px", textAlign: "center" }); // 正解メッセージ
		score++; // 正解数カウント
	} else {
		$answerMessage.html(`✖️不正解...<br>正解は「<span style='color: #0b5ed7;'>${quiz[quizIndex].correct}</span>」です。`).css({
			color: "#333",
			fontWeight: "bold",
			fontSize: "20px",
			textAlign: "center",
		});
	}

	$answerArea.show(); // メッセージと「→」ボタンを表示
});

// 「→」ボタンがクリックされた時の処理
$nextButton.on("click", function () {
	quizIndex++; // 次の問題へ

	if (quizIndex < quiz.length) {
		setupQuiz(); // 次の問題を表示
	} else {
		// 最後の問題まで終わったら最終スコア表示
		$question.text("終了！あなたの正解数は… " + score + " / " + quiz.length + " です！");
		$(".choices").hide(); // 選択肢を非表示に
		$answerArea.hide(); // メッセージも非表示に
	}
});
