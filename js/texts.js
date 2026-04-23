function Pic(s){
    return `<img src="sprites/${s}.png" style="height: 1.5rem;">`;
}
function MVPic(s){
    return `<img src="sprites/${s}.png" style="height: 7.5rem; margin: 0.25rem;">`;
}
const allchars = `${Pic("rock")}${Pic("rabbit")}${Pic("cat")}${Pic("frog")}${Pic("horse")}${Pic("elephant")}${Pic("dog")}${Pic("camel")}${Pic("zebra")}${Pic("giraffe")}${Pic("monster")}`;
const allanimals = `${Pic("rabbit")}${Pic("cat")}${Pic("frog")}${Pic("horse")}${Pic("elephant")}${Pic("dog")}${Pic("camel")}${Pic("zebra")}${Pic("giraffe")}`;
const helpTitles = ["How to Play","遊戲規則","游戏规则","遊び方"];
const helpContents = [
    `Find the 2 ${Pic("carrot")} in 10 guesses!<br>
    When you click a square, if a ${Pic("carrot")} is on it, that ${Pic("carrot")} will be revealed!<br>
    If not, there's a 10% chance that one of these will be revealed: ${allchars}.<br>
    If that's also not the case, then one of the animals (${allanimals}) that can reach either ${Pic("carrot")} in one move from the clicked square will be revealed. If none of them can reach either ${Pic("carrot")} in one move from the clicked square, ${Pic("monster")} will be revealed.<br>
    How the animals move:<br>
    ${MVPic("01")} Rabbit: (0,1)<br>
    ${MVPic("11")} Cat: (1,1)<br>
    ${MVPic("02")} Frog: (0,2)<br>
    ${MVPic("12")} Horse: (1,2)<br>
    ${MVPic("22")} Elephant: (2,2)<br>
    ${MVPic("03")} Dog: (0,3)<br>
    ${MVPic("13")} Camel: (1,3)<br>
    ${MVPic("23")} Zebra: (2,3)<br>
    ${MVPic("14")} Giraffe: (1,4)`,
    `在10次以內猜到2根${Pic("carrot")}的位置！<br>
    當你點擊某個格子時，若其中一根${Pic("carrot")}就在那格，則該${Pic("carrot")}會被顯示出來！<br>
    否則，有10%的機率會顯示以下其中之一：${allchars}<br>
    如果此機率事件沒有發生，則其中一種可以從被點擊的那格一步走到任一${Pic("carrot")}的位置的動物（${allanimals}）會被顯示出來。若那些動物都無法從那格一步走到${Pic("carrot")}，則會顯示${Pic("monster")}。<br>
    動物的移動方式：<br>
    ${MVPic("01")} 兔：(0,1)<br>
    ${MVPic("11")} 貓：(1,1)<br>
    ${MVPic("02")} 蛙：(0,2)<br>
    ${MVPic("12")} 馬：(1,2)<br>
    ${MVPic("22")} 象：(2,2)<br>
    ${MVPic("03")} 狗：(0,3)<br>
    ${MVPic("13")} 駱駝：(1,3)<br>
    ${MVPic("23")} 斑馬：(2,3)<br>
    ${MVPic("14")} 長頸鹿：(1,4)`,
    `在10次以内猜到2根${Pic("carrot")}的位置！<br>
    当你点击某个格子时，若其中一根${Pic("carrot")}就在那格，则该${Pic("carrot")}会被显示出来！<br>
    否则，有10%的机率会显示以下其中之一：${allchars}<br>
    如果此机率事件没有发生，则其中一种可以从被点击的那格一步走到任一${Pic("carrot")}的位置的动物（${allanimals}）会被显示出来。若那些动物都无法从那格一步走到${Pic("carrot")}，则会显示${Pic("monster")}。<br>
    动物的移动方式：<br>
    ${MVPic("01")} 兔：(0,1)<br>
    ${MVPic("11")} 猫：(1,1)<br>
    ${MVPic("02")} 蛙：(0,2)<br>
    ${MVPic("12")} 马：(1,2)<br>
    ${MVPic("22")} 象：(2,2)<br>
    ${MVPic("03")} 狗：(0,3)<br>
    ${MVPic("13")} 骆驼：(1,3)<br>
    ${MVPic("23")} 斑马：(2,3)<br>
    ${MVPic("14")} 长颈鹿：(1,4)`,
    `10回以内に2本の${Pic("carrot")}の位置を当てよう！<br>
    マスをクリックすると、そこに${Pic("carrot")}があればその${Pic("carrot")}が表示されます。<br>
    もしなければ、10%の確率で次のいずれかが表示されます：${allchars}。<br>
    それも起こらなかった場合、クリックしたマスから1手でどちらかの${Pic("carrot")}に到達できる動きを持つ動物（${allanimals}）のうち、いずれかが表示されます。もしそのマスから1手でどちらの${Pic("carrot")}にも到達できる動物がいない場合は、${Pic("monster")}が表示されます。<br>
    動物の動き方：<br>
    ${MVPic("01")} ウサギ：(0,1)<br>
    ${MVPic("11")} ネコ：(1,1)<br>
    ${MVPic("02")} カエル：(0,2)<br>
    ${MVPic("12")} ウマ：(1,2)<br>
    ${MVPic("22")} ゾウ：(2,2)<br>
    ${MVPic("03")} イヌ：(0,3)<br>
    ${MVPic("13")} ラクダ：(1,3)<br>
    ${MVPic("23")} シマウマ：(2,3)<br>
    ${MVPic("14")} キリン：(1,4)`,
];
const helpTitle = document.getElementById("helpTitle");
const helpContent = document.getElementById("helpContent");
helpTitle.innerHTML = helpTitles[language];
helpContent.innerHTML = helpContents[language];

const statsTitle = document.getElementById("statsTitle");
const statsContent = document.getElementById("statsContent");
const statsTitles = ["Statistics", "遊玩紀錄", "游玩纪录", "統計情報"];
const winSentences = ["You've won today! ⭐⭐⭐", "今日你已獲勝！⭐⭐⭐", "今日你已获胜！⭐⭐⭐", "今日は勝利！⭐⭐⭐"];
const playSentences = ["You've played today!", "今日已遊玩！", "今日已游玩！", "今日はプレイ済み！"];
let s_winStreak = 0;
let s_playStreak = 0;
let s_daysPlayed = 0;
let s_wins = 0;
let s_winRate = 0;
let currentChart = null;
Chart.register(ChartDataLabels);
function UpdateStats(){
    s_winStreak = parseInt(localStorage.getItem("ctgwinstreak")??"0");
    s_playStreak = parseInt(localStorage.getItem("ctgplaystreak")??"0");
    let guessDist = [0,0,0,0,0,0,0,0,0,0,0];
    for(let i=2;i<=10;i++)guessDist[i] = parseInt(localStorage.getItem(`ctgguesses${i}`)??"0");
    guessDist[0] = parseInt(localStorage.getItem("ctgguessesX")??"0");
    for(let i=0;i<=10;i++)if(guessDist[i]!==guessDist[i])guessDist[i]=0;
    let tmpwins = 0;
    for(let i=2;i<=10;i++)tmpwins += guessDist[i];
    s_wins = tmpwins;
    s_daysPlayed = tmpwins + guessDist[0];
    s_winRate = s_daysPlayed==0 ? "0%" : `${Math.round(s_wins/s_daysPlayed*1000)/10}%`;

    statsTitle.innerHTML = statsTitles[language];
    let tmptoday = "";
    if(todaysResult=="won")tmptoday = `<b>${winSentences[language]}</b><br>`;
    else if(todaysResult=="played")tmptoday = `<b>${playSentences[language]}</b><br>`;
    let statsByLanguage = [
        `${tmptoday}Win Streak: ${s_winStreak}<br>
        Play Streak: ${s_playStreak}<br>
        Total Days Played: ${s_daysPlayed}<br>
        Wins: ${s_wins}<br>
        Win Rate: ${s_winRate}<br>
        Results Breakdown:`,
        `${tmptoday}連勝數：${s_winStreak}<br>
        連續遊玩天數：${s_playStreak}<br>
        總遊玩天數：${s_daysPlayed}<br>
        勝利數：${s_wins}<br>
        勝率：${s_winRate}<br>
        成績分析：`,
        `${tmptoday}连胜数：${s_winStreak}<br>
        连续游玩天数：${s_playStreak}<br>
        总游玩天数：${s_daysPlayed}<br>
        胜利数：${s_wins}<br>
        胜率：${s_winRate}<br>
        成绩分析：`,
        `${tmptoday}連勝日数：${s_winStreak}<br>
        連続プレイ日数：${s_playStreak}<br>
        プレイ日数合計：${s_daysPlayed}<br>
        勝利数：${s_wins}<br>
        勝率：${s_winRate}<br>
        結果分析：`
    ]
    statsContent.innerHTML = statsByLanguage[language];
    let categories = ["2","3","4","5","6","7","8","9","10","X"];
    let values = [guessDist[2],guessDist[3],guessDist[4],guessDist[5],guessDist[6],guessDist[7],guessDist[8],guessDist[9],guessDist[10],guessDist[0]];
    if(currentChart!==null)currentChart.destroy();
    currentChart = new Chart(
        document.getElementById("BDChart"),
        {
            type: "bar",
            data: {
                labels: categories,
                datasets: [{
                    label: '',
                    data: values,
                    backgroundColor: '#EEA44F'
                }]
            },
            options: {
                plugins: {
                    legend: {display: false},
                    datalabels: {
                        anchor: 'end',
                        align: 'right',
                        offset: '2'
                    }
                },
                indexAxis: 'y',
                maintainAspectRatio: false
            }
        }
    );
}

const settingsTitle = document.getElementById("settingsTitle");
const settingsLink = document.getElementById("settingsLink");
const honestLabel = document.getElementById("honestLabel");
const honestDesc = document.getElementById("honestDesc");
const settingsTitles = ["Settings", "設定", "设置", "設定"];
const honestTexts = ["Honest Mode", "誠實模式", "诚实模式", "正直モード"];
const honestDescs = [
    `Cannot be toggled during a game. If enabled, the following will not happen:<br>
    - ${Pic("rock")} shows up.<br>
    - An animal shows up, but it cannot reach either ${Pic("carrot")} in one move.<br>
    - ${Pic("monster")} shows up, but an animal can reach either ${Pic("carrot")} from the square in one move.
    `,
    `在遊戲進行中不可開關。若開啟，以下情況將不會發生：<br>
    - ${Pic("rock")}出現。<br>
    - 某動物出現，但其無法一步走到任一${Pic("carrot")}。<br>
    - ${Pic("monster")}出現，但有動物可從該格一步走到某${Pic("carrot")}。
    `,
    `在游戏进行中不可开关。若开启，以下情况将不会发生：<br>
    - ${Pic("rock")}出现。<br>
    - 某动物出现，但其无法一步走到任一${Pic("carrot")}。<br>
    - ${Pic("monster")}出现，但有动物可从该格一步走到某${Pic("carrot")}。
    `,
    `ゲームの途中で切り替えることはできません。有効にした場合、以下は発生しません：<br>
    - ${Pic("rock")}が出現する。<br>
    - 動物が出現するが、その動物は1手でどちらの${Pic("carrot")}にも到達できない。<br>
    - ${Pic("monster")}が出現するが、ある動物がそのマスから1手でどちらの${Pic("carrot")}に到達できる。
    `
]
const dailyLink = "https://yowwowwow.github.io/Carrotour/Guide";
const infiniteLink = "https://yowwowwow.github.io/Carrotour/Guide?Infinite";
const dailyTexts = ["Classic Mode (Daily Puzzles)", "Classic Mode（每日謎題）", "Classic Mode（每日谜题）", "Classic Mode（デイリーパズル）"];
const infiniteTexts = ["Infinite Mode", "Infinite Mode（無限模式）", "Infinite Mode（无限模式）", "Infinite Mode（無限モード）"];
function UpdateSettings(){
    settingsTitle.innerHTML = settingsTitles[language];
    settingsLink.href = isInfinite ? dailyLink : infiniteLink;
    settingsLink.innerHTML = isInfinite ? dailyTexts[language] : infiniteTexts[language];
    honestLabel.innerHTML = honestTexts[language];
    honestDesc.innerHTML = honestDescs[language];
}
UpdateSettings();
UpdateStats();
document.getElementById("statsModal").addEventListener("show.bs.modal",()=>{UpdateStats();});