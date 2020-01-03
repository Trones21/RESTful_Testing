//ToDo 
//Code to Run all Tests

//Later
//Add code to re-order rows

// const runGetReg = function () {runTest("getRegistrars_status", baseURI + "/")};
// document.getElementById("getRegistrars").addEventListener("onClick", runGetReg);
const server = "http://localhost:9998";
const User = "Trones";
const UserID = "1234";


/****** Dev Buttons *****/

var btndevTest = document.getElementById("test");
btndevTest.addEventListener("click", devTests);

var btn_SuitesInfo = document.getElementById("SuitesInfo");
btn_SuitesInfo.addEventListener("click", SuitesInfo);


/*********** Actual  ******************/
const btnAll = document.getElementById("All");
btnAll.addEventListener("click", runTests);

var btnAddTest = document.getElementById("AddTest");
btnAddTest.addEventListener("click", AddTest);

var ev_baseUriReset = document.getElementById("baseURI");
ev_baseUriReset.addEventListener("click", () => { var el = document.getElementById("baseURI"); el.classList.remove("is-invalid") });

var save = document.getElementById("Save");
save.addEventListener("click", SaveSuite);

var btn_addSuite = document.getElementById("sidebar-addSuite-btn");
btn_addSuite.addEventListener("click", newSuite)

var btn_deleteSuite = document.getElementById("DeleteSuite");
btn_deleteSuite.addEventListener("click", deleteSuite);

function deleteSuite() {
    //Popup
    //Delete 
    var SuiteID = document.querySelector(".active").getAttribute("id");
    fetch(server + "/DeleteSuite/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"suiteID": "${SuiteID}"}`
    }).then(res => {
        return res.json();
    })
        .then(data => { console.log(data) });

}


function newSuite(event) {
    console.log("newSuite begin")
    var name = event.currentTarget.parentElement.firstElementChild.innerText.trim();
    if (name.length < 1) {
        console.log("PK add a pop-up here later");
        return;
    }

    //Save Open Test Suite
    try {
        //SaveSuite()
    }
    catch{
        console.log("Unable to contact server");
        return;
    }
    ClearSuiteInfo();

    console.log(name);
    var suite = {};
    suite.name = name;
    suite.UserName = User;
    suite.UserID = UserID;
    suite.baseURI = "PK_FixLater"

    fetch(server + "/SaveSuite/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(suite)

    });

}
    //Option 2 don't add to backend yet
    // var suites = document.getElementById("Suites");
    // var newSuite = document.createElement
    // suites.appendChild();

function ClearSuiteInfo() {

    document.getElementById("baseURI").value = "";
    document.getElementById("SuiteName").innerText = "";

    //Delete all table rows
    var tbody = document.getElementById("tbody");
    var iterations = tbody.childElementCount;
    for (let row = 0; row <= iterations; row++) {
        tbody.deleteRow(-1);
    }

}

function addTestInfo(testID, expect, name, method, path, reqBody) {
    AddTest(testID);
    var emptyRow = document.getElementById(testID);
    emptyRow.id = testID;
    emptyRow.querySelector("#expect").innerText = expect;
    emptyRow.querySelector("#name").innerText = name;
    emptyRow.querySelector("#method").innerText = method;
    emptyRow.querySelector("#path").innerText = path;
    if (method != "GET") { emptyRow.querySelector("#reqBody").innerText = reqBody };
}

function devTests() {
    document.getElementById("baseURI").value = "http://localhost:8099";
    addTestInfo("2", "200", "Test 1", "GET", "/");
    addTestInfo("3", "404", "Another", "GET", "/erer");
    addTestInfo("4", "200", "Third", "POST", "/DoStuff", "Pass ReqBody");
    addTestInfo("5", "404", "4th", "POST", "/DoStuff", "Fail ReqBody");
}

function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

function SaveSuite(SuiteID) {

    //if SuiteID is undef then

    var suite = {};
    //Temp dev vals

    suite.userID = UserID;
    suite.userName = User;
    //
    suite.name = document.getElementById("SuiteName").innerText;
    suite.baseURI = document.getElementById("baseURI").value;

    var tests = [];

    var testsTable = document.getElementById("tbody");
    var testCount = testsTable.childElementCount;
    for (let testNum = 0; testNum < testCount; testNum++) {
        var test = {};
        var row = testsTable.children[testNum];
        test.expect = row.cells[2].innerText;
        test.name = row.cells[4].innerText;
        test.method = row.cells[5].innerText;
        test.path = row.cells[6].innerText;
        test.reqBody = row.cells[7].innerText;
        tests.push(test);
    }

    suite.tests = tests;
    fetch(server + "/SaveSuite/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(suite)
    }).then(res => {
        if (res.status == 200) {
            console.log("Added to DB")
        } else { console.log(res.status) }
    });

    //else

    // fetch(server + "/SaveSuite",{ method: 'PUT', 
    // headers: {
    //     'Content-Type': 'application/json'},
    // body: JSON.stringify(suite) }).then(res => { console.log("Server Response: " + res.body)})


}

function SuitesInfo() {
    //Just get the Name and IDs of the Suites for a specific User
    //Eventually I will have a JWT, but for now lets leave authentication out of this.    
    fetch(server + "/SuitesInfo/", { method: 'GET', headers: { 'userID': UserID } })
        .then(res => {
            return res.json();
        })
        .then(data => {
            var SuitesDiv = document.getElementById("Suites");
            while (SuitesDiv.firstChild) {
                SuitesDiv.removeChild(SuitesDiv.firstChild);
            }



            for (item in data) {
                var suite = document.createElement("li");
                suite.id = data[item]._id;
                suite.innerText = data[item].name;
                suite.addEventListener('click', FullSuite)
                SuitesDiv.appendChild(suite);

            }

        })

}

function FullSuite(event) {
    //POST
    var suiteID = event.currentTarget.id;
    fetch(server + "/FullSuite/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"suiteID": "${suiteID}"}`
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            PopulateSuiteInfo(data);
        })

    var children = event.currentTarget.parentElement.children;
    for (var i = 0; i < children.length; i++) {
        var cl = children[i].classList;
        if (cl.contains("active")) {
            cl.remove("active");
        }
    }

    var classes = event.currentTarget.classList;
    classes.add("active");
}

function PopulateSuiteInfo(data) {
    ClearSuiteInfo();
    document.getElementById("baseURI").value = data.baseURI;
    document.getElementById("SuiteName").innerText = data.name;
    var tests = data.tests;
    for (var i in tests) {
        addTestInfo(tests[i]._id, tests[i].expect, tests[i].name, tests[i].method, tests[i].path, tests[i].reqBody)
    }
}

function runTests() {

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

function runTest(row, endpoint, method, reqBody) {

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

function AddTest(testID) {

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
    document.getElementById(event.currentTarget.myParam).remove();
}

