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