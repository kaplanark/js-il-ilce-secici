var cityJson = [];
var districtJson = [];

const provinceSelect = document.querySelector("#il");
const districtSelect = document.querySelector("#ilce");

window.addEventListener("DOMContentLoaded", function (event) {
  loadJsonFiles();
});

function loadJsonFiles(callback) {
  readTextFile("front/js/JSON/provinces.json", (data) => {
    cityJson = JSON.parse(data);
    loadProvince();
  });

  readTextFile("front/js/JSON/counties.json", (data) => {
    districtJson = JSON.parse(data);
  });
}
function loadProvince() {
  cityJson.forEach((element) => {
    const option = new Option(element.il, element.il);
    provinceSelect.add(option, null);
  });
}

function changeProvince() {
  districtSelect.innerHTML = "";
  districtJson
    .filter((element) => element.il === provinceSelect.value)
    .sort()
    .forEach((element) => {
      const option = new Option(element.ilce, element.ilce);
      districtSelect.add(option, null);
    });
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
