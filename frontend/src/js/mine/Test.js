export function runTests() {

    const testEls = []
    for (var test of testEls) {

    }
    runTest
}

function prepareCall(event) {
    console.log("Prepare Call Called")

    if (document.getElementById("baseURI").value) {

        var row = event.currentTarget.parentElement.parentElement;
        var endpoint = document.getElementById("baseURI").value.trim() + row.querySelector("#path").innerText;
        var method = row.querySelector("#method").innerText.toUpperCase();
        var body = row.querySelector("#reqBody").innerText;
        runTest(row, endpoint, method, body);
    } else {
        var ServerEl = document.getElementById("baseURI");
        ServerEl.className = "form-control form-control-lg is-invalid";
    }
}

export function runTest(row, endpoint, method, reqBody) {

    var expect = row.querySelector("#expect");
    var actual = row.querySelector("#actual");
    var testStatus = row.querySelector("#testStatus");
    var passFailIcon = testStatus.lastElementChild;
    console.log(passFailIcon);
    actual.innerText = "Fetching";
    //if GET then do not send body
    if (method === "GET") {
        fetch(endpoint, { method: method }).then(res => {
            console.log(res.status);
            actual.innerText = res.status;
            if (res.status === Number(expect.innerText.trim())) {
                passFailIcon.className = "good fas fa-check";
            }
            else {
                passFailIcon.className = "bad fas fa-times";
            }
        })
            .catch(err => {
                console.log(err);
                passFailIcon.className = "bad fas fa-times";

                actual.innerText = "";
                var tooltip = document.createElement("button");
                tooltip.className = "btn btn-outline-danger noClick";
                tooltip.setAttribute("data-toggle", "tooltip");
                tooltip.setAttribute("data-placement", "top");
                tooltip.setAttribute("title", err);
                tooltip.innerText = "Error";
                actual.appendChild(tooltip);

            })
    } else {
        fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(res => {
            console.log(res.status);
            actual.innerText = res.status;
            if (res.status === Number(expect.innerText.trim())) {
                passFailIcon.className = "good fas fa-check";
            }
            else {
                passFailIcon.className = "bad fas fa-times";
            }
        })
            .catch(err => {
                console.log(err);
                passFailIcon.className = "bad fas fa-times";

                actual.innerText = "";
                var tooltip = document.createElement("button");
                tooltip.className = "btn btn-outline-danger noClick";
                tooltip.setAttribute("data-toggle", "tooltip");
                tooltip.setAttribute("data-placement", "top");
                tooltip.setAttribute("title", err);
                tooltip.innerText = "Error";
                actual.appendChild(tooltip);
            })
    }

}

export function AddTest(testID) {

    var tbody = document.getElementById("tbody");
    var lastRow = Number;
    tbody.childElementCount == 0 ? lastRow = 0 : lastRow = tbody.childElementCount;

    var newRow = tbody.insertRow(-1);
    if (testID) { newRow.id = testID } else { newRow.id = lastRow + 1 };

    var pass = newRow.insertCell(0);
    var actual = newRow.insertCell(1);
    var expect = newRow.insertCell(2);
    var run = newRow.insertCell(3);
    run.className = "text-center border-left border-right border-secondary";

    var name = newRow.insertCell(4);
    var method = newRow.insertCell(5);
    var path = newRow.insertCell(6);
    var reqBody = newRow.insertCell(7);
    var btnDelete = newRow.insertCell(8);

    var btnRun = document.createElement("button");
    btnRun.className = "btn-primary";
    btnRun.innerText = "Run";

    btnRun.addEventListener("click", prepareCall);
    run.appendChild(btnRun);

    pass.id = "testStatus";
    pass.className = "text-center";
    var pfIcon = document.createElement("i");
    pass.appendChild(pfIcon);

    actual.id = "actual";

    expect.setAttribute("contenteditable", "true");
    expect.setAttribute("spellcheck", "false");
    expect.id = "expect";

    name.setAttribute("contenteditable", "true");
    name.setAttribute("spellcheck", "false");
    name.id = "name";

    method.setAttribute("contenteditable", "true");
    method.setAttribute("spellcheck", "false");
    method.id = "method";

    path.setAttribute("contenteditable", "true");
    path.setAttribute("spellcheck", "false");
    path.id = "path";

    reqBody.setAttribute("contenteditable", "true");
    reqBody.setAttribute("spellcheck", "false");
    reqBody.id = "reqBody";


    var iconDeleteRow = document.createElement("i");
    iconDeleteRow.className = "fas fa-minus-circle isClickable";
    iconDeleteRow.addEventListener("click", removeTest);
    iconDeleteRow.myParam = newRow.id;
    btnDelete.className = "text-center";
    btnDelete.appendChild(iconDeleteRow);

}

function removeTest(event) {
    //Update UI
    document.getElementById(event.currentTarget.myParam).remove();

    //Update DB
}

export function addTestInfo(testID, expect, name, method, path, reqBody) {
    AddTest(testID);
    var emptyRow = document.getElementById(testID);
    emptyRow.id = testID;
    emptyRow.querySelector("#expect").innerText = expect;
    emptyRow.querySelector("#name").innerText = name;
    emptyRow.querySelector("#method").innerText = method;
    emptyRow.querySelector("#path").innerText = path;
    if (method != "GET") { emptyRow.querySelector("#reqBody").innerText = reqBody };
}
