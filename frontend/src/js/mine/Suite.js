const server = "http://localhost:9998";
const User = "Trones";
const UserID = "1234";
import {addTestInfo} from './Test.js';
// Writing to DB
export function newSuite(event) {
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
    ClearSuiteUI();

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

export function SaveSuite(SuiteID) {

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
}

function SaveFullSuite(event) {
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
            PopulateSuite(data);
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

export function deleteSuite() {
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

// UI
export function SuitesList() {
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
            console.log(data);
            for (var item in data) {
                var suite = document.createElement("li");
                suite.id = data[item]._id;
                suite.innerText = data[item].name;
                suite.addEventListener('click', SaveFullSuite)
                SuitesDiv.appendChild(suite);

            }

        })

}
function ClearSuiteUI() {

    document.getElementById("baseURI").value = "";
    document.getElementById("SuiteName").innerText = "";

    //Delete all table rows
    var tbody = document.getElementById("tbody");
    var iterations = tbody.childElementCount;
    for (let row = 0; row <= iterations; row++) {
        tbody.deleteRow(-1);
    }

}
function PopulateSuite(data) {
    ClearSuiteUI();
    document.getElementById("baseURI").value = data.baseURI;
    document.getElementById("SuiteName").innerText = data.name;
    var tests = data.tests;
    for (var i in tests) {
        addTestInfo(tests[i]._id, tests[i].expect, tests[i].name, tests[i].method, tests[i].path, tests[i].reqBody)
    }
}

