document.location.href = "https://yuta-hp.github.io/Typing-hiroba/"

function GetShuffleArray(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }

	return arr;
}

function GetQPair(index) {
    return Q_strs[index];
}

Q_strs = GetShuffleArray(Q_strs);

Q_strs.length = 8;

Q_strs[Q_strs.length] = ["終わり","owari"];

let Q_index = 0;

let Q_T;
let I_T;

let input = document.getElementById("type-input");

let dk = document.getElementById("kangi");
let dr = document.getElementById("ro-mazi");

function Next() {
    if(Q_index !== Q_strs.length)
    {
        [Q_T,I_T] = GetQPair(Q_index);

        input.value = "";

        Q_index++;
        dk.textContent = Q_T+"("+Q_strs.length+"中"+Q_index+"番目)";

        // for(let i = 0; i < dr.children.length; i++){
        //     dr.children[i].remove();
        // }

        while(dr.lastChild){
            dr.removeChild(dr.lastChild);
        }

        let text = I_T.split("");

        text.forEach((c) => {
            let cs = document.createElement("span");

            cs.innerText = c;

            dr.appendChild(cs);
        })
    }
    else
    {
        // [Q_T,I_T] = ["終わり",""];

        input.value = "";

        // Q_index++;
        dk.textContent = Q_T;

        while(dr.lastChild){
            dr.removeChild(dr.lastChild);
        }

        let text = I_T.split("");

        // text.forEach((c) => {
        //     let cs = document.createElement("span");

        //     cs.innerText = c;

        //     dr.appendChild(cs);
        // })

        input.style.display = "none"

        let textes = document.getElementsByClassName("key");
        for(let i = 0; i < textes.length; i++)
        {
            textes[i].style.backgroundColor = "#494b4f";
            textes[i].style.color = "#fff";
            textes[i].style.fontWeight = "normal";
        }

        let container = document.getElementById("container");

        let rb = document.createElement("button");

        rb.innerText = "もう一度やる";
        rb.style.fontSize = "30px"

        rb.onclick = () => {
            document.location.reload();
        }

        container.appendChild(rb);
    }
}

function Init() {
    Next();
    key();
}


const isUpperCase = c => {
    return /^[A-Z]+$/g.test(c)
}

function key() {
    if(Q_index-1 === Q_strs.length)
    {
        return;
    }

    let nexttexte;

    let textes = document.getElementsByClassName("key");
    for(let i = 0; i < textes.length; i++)
    {
        textes[i].style.backgroundColor = "#494b4f";
        textes[i].style.color = "#fff";
        textes[i].style.fontWeight = "normal";
    }

    switch (dr.children[input.value.length]) {
        case " ":
            nexttexte = document.getElementById("sp-key");
            break;
        case "":
        default:
            if(isUpperCase(dr.children[input.value.length]))
            {
                nexttexte = document.getElementById(dr.children[input.value.length].innerText.toLowerCase()+"-key");
            }
            else
            {
                nexttexte = document.getElementById(dr.children[input.value.length].innerText+"-key");
            }
            break;
    }

    // let yubi = document.getElementsByClassName("yubi");

    // yubi[0].style.backgroundColor = "#a11";
    // yubi[1].style.backgroundColor = "#fa1";
    // yubi[2].style.backgroundColor = "#ff1";
    // yubi[3].style.backgroundColor = "#af1";
    // yubi[4].style.backgroundColor = "#af1";
    // yubi[5].style.backgroundColor = "#ff1";
    // yubi[6].style.backgroundColor = "#fa1";
    // yubi[7].style.backgroundColor = "#a11";

    // switch (dr.children[input.value.length].innerHTML.toLowerCase()) {
    //     case "1":
    //     case "q":
    //     case "a":
    //     case "z":
    //         yubi[0].style.backgroundColor = "#aaa";
    //         break;
    //     case "2":
    //     case "w":
    //     case "s":
    //     case "x":
    //         yubi[1].style.backgroundColor = "#aaa";
    //         break;
    //     case "3":
    //     case "e":
    //     case "d":
    //     case "x":
    //         yubi[2].style.backgroundColor = "#aaa";
    //         break;
    //     case "4":
    //     case "r":
    //     case "f":
    //     case "c":
    //     case "5":
    //     case "t":
    //     case "g":
    //     case "v":
    //         yubi[3].style.backgroundColor = "#aaa";
    //         break;
    //     case "6":
    //     case "y":
    //     case "h":
    //     case "n":
    //     case "7":
    //     case "u":
    //     case "j":
    //     case "m":
    //         yubi[4].style.backgroundColor = "#aaa";
    //         break;
    //     case "8":
    //     case "i":
    //     case "k":
    //         yubi[5].style.backgroundColor = "#aaa";
    //         break;
    //     case "9":
    //     case "o":
    //     case "l":
    //         yubi[6].style.backgroundColor = "#aaa";
    //         break;
    //     case "0":
    //     case "p":
    //         yubi[7].style.backgroundColor = "#aaa";
    //         break;
    // }

    nexttexte.style.backgroundColor = "#fee082";
    nexttexte.style.color = "black";
    nexttexte.style.fontWeight = "bold";
}
input.oninput = (e) => {
    let sa = dr.querySelectorAll("span");

    let av = input.value.split("");

    if(I_T == input.value)
    {
        Next();
        key();
        return;
    }

    key();


    sa.forEach((c,i) => {
        if(input.value.length > i){
            if(c.innerText == av[i])
            {
                c.classList.add("c");
                c.classList.remove("inc");
            }
            else
            {
                c.classList.add("inc");
                c.classList.remove("c");
            }
        }
        else{
            c.classList.remove("c");
            c.classList.remove("inc");
        }
    });
}

Init();
