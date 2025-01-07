console.log("FOUND");


function signin(){
    document.querySelector("h1").innerHTML="Sign In";
    document.querySelector("h4").innerHTML="";
    console.log("IN");
    const bt=document.getElementById("signup");
    bt.innerHTML="Sign In";
    bt.setAttribute("id","signinbt");
    bt.setAttribute("onclick","signinbt()");
}

function signup(){
    const uname=document.querySelector("#username").value;
    const pw=document.querySelector("#password").value;
    axios.post("http://localhost:2500",
        {
            username:uname,
            password:pw
        }
    )
}

async function signinbt(){
    console.log("INSIDE");
    const username=document.querySelector("#username").value;
    const password=document.querySelector("#password").value;
    signedindisp(username);
}

async function signedindisp(id){
    document.querySelector("body").innerHTML="";
    let data=await axios.get(`http://localhost:3000`);
    console.log(data);
    data=data.data;
    console.log("BACK IN SIGNED IN");
    render(data,id);
    
}

function render(data, id) {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "todoinp");

    const btn = document.createElement("button");
    btn.innerHTML = "Add ToDo";
    btn.setAttribute("id", "submit-btn");
    btn.setAttribute("type","button");


    btn.setAttribute("onclick",`addtodo(${id})`)

    document.querySelector("body").appendChild(input);
    document.querySelector("body").appendChild(btn);

    console.log(data);
    if (data[id] != undefined) {
        for (let i = 0; i < data[id].length; i++) {
            tododispl(data[id][i]);
        }
    }
}

async function addtodo(id) {
    let ts = document.getElementById("todoinp").value;
    console.log("INSIDE");
    await axios.post("http://localhost:3000/add", {
        id: id,
        task: ts
    });
    console.log("DONE");
    signedindisp(id);
}


function tododispl(todo){
    console.log(todo);
    const h6=document.createElement("h6");
    h6.innerHTML=todo.task;
    document.querySelector("body").appendChild(h6);
}