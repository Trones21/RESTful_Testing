import * as Suite from './Suite.js';
import * as Test from './Test.js';

/****** Dev Buttons *****/

var btndevTest = document.getElementById("test");
btndevTest.addEventListener("click", Test.devTests);

var btn_SuitesInfo = document.getElementById("SuitesInfo");
btn_SuitesInfo.addEventListener("click", Suite.SuitesList);


/*********** Actual  ******************/
const btnAll = document.getElementById("All");
btnAll.addEventListener("click", Test.runTests);

var btnAddTest = document.getElementById("AddTest");
btnAddTest.addEventListener("click", Test.AddTest);

var ev_baseUriReset = document.getElementById("baseURI");
ev_baseUriReset.addEventListener("click", () => { var el = document.getElementById("baseURI"); el.classList.remove("is-invalid") });

var save = document.getElementById("Save");
save.addEventListener("click", Suite.SaveSuite);

var btn_addSuite = document.getElementById("sidebar-addSuite-btn");
btn_addSuite.addEventListener("click", Suite.newSuite)

var btn_deleteSuite = document.getElementById("DeleteSuite");
btn_deleteSuite.addEventListener("click", Suite.deleteSuite);


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






