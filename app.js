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
        [Q_T,I_T] = ["終わり",""];

        input.value = "";

        Q_index++;
        dk.textContent = Q_T;

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

        input.style.display = "none"

        let textes = document.getElementsByClassName("key");
        for(let i = 0; i < textes.length; i++)
        {
            textes[i].style.backgroundColor = "#494b4f";
            textes[i].style.color = "#fff";
            textes[i].style.fontWeight = "normal";
        }
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