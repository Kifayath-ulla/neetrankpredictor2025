const scoreRanges = [
  { min: 675, max: 720, rankMin: 1, rankMax: 10 },
  { min: 658, max: 674, rankMin: 11, rankMax: 100 },
  { min: 638, max: 657, rankMin: 101, rankMax: 500 },
  { min: 622, max: 637, rankMin: 501, rankMax: 1000 },
  { min: 575, max: 621, rankMin: 1001, rankMax: 5000 },
  { min: 546, max: 574, rankMin: 5001, rankMax: 10000 },
  { min: 530, max: 545, rankMin: 10001, rankMax: 20000 },
  { min: 518, max: 529, rankMin: 20001, rankMax: 30000 },
  { min: 500, max: 517, rankMin: 30001, rankMax: 50000 },
  { min: 470, max: 499, rankMin: 50001, rankMax: 100000 },
  { min: 440, max: 469, rankMin: 100001, rankMax: 200000 },
  { min: 0, max: 439, rankMin: 200001, rankMax: 250000 }
];

function interpolateRank(marks, range) {
  const { min, max, rankMin, rankMax } = range;
  const percent = (max - marks) / (max - min);
  return Math.round(rankMin + percent * (rankMax - rankMin));
}

function predictRank() {
  const marks = parseInt(document.getElementById("marks").value);
  const resultEl = document.getElementById("result");
  const loadingEl = document.getElementById("loading");
  const popupEl = document.getElementById("popup");

  resultEl.innerHTML = "";
  loadingEl.classList.remove("hidden");

  setTimeout(() => {
    if (isNaN(marks) || marks < 0 || marks > 720) {
      loadingEl.classList.add("hidden");
      resultEl.textContent = "❌ Please enter a valid mark between 0 and 720.";
      return;
    }

    const range = scoreRanges.find(r => marks >= r.min && marks <= r.max);
    if (!range) {
      loadingEl.classList.add("hidden");
      resultEl.textContent = "❓ Rank not found for this score.";
      return;
    }

    const estimated = interpolateRank(marks, range);
    loadingEl.classList.add("hidden");
    resultEl.innerHTML = `
      <div>📊 Estimated Rank: <span class="text-blue-300 font-bold">${estimated.toLocaleString()}</span></div>
      <div class="mt-1 text-sm text-blue-200">Predicted Range: ${range.rankMin.toLocaleString()} – ${range.rankMax.toLocaleString()}</div>
    `;

    popupEl.style.display = "block";
  }, 800);
}
