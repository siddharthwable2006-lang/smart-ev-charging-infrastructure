/*====================================================
 SMART ENERGY DASHBOARD
 script.js (Part 1)
====================================================*/

// ----------------------------
// Live Date and Time
// ----------------------------

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

    document.getElementById("date").innerHTML =
        now.toDateString();

}

setInterval(updateClock,1000);
updateClock();


// ----------------------------
// Dashboard Variables
// ----------------------------

let batteryHealth = 98;
let batterySOC = 82;
let batteryTemp = 32;

let chargingPower = 5.8;

let solarPower = 3.5;
let solarEnergy = 15.8;

let gridVoltage = 230;
let gridCurrent = 18;

let energy = 25.8;

let tariff = 8.10;

let savings = 64;

let co2 = 18.4;

let gridImport = 2.4;

let gridExport = 1.3;


// ----------------------------
// Random Number Generator
// ----------------------------

function random(min,max){

    return Math.random()*(max-min)+min;

}


// ----------------------------
// Update Dashboard
// ----------------------------

function updateDashboard(){

    batterySOC += random(-0.5,0.3);

    batteryTemp += random(-0.2,0.2);

    chargingPower += random(-0.2,0.2);

    solarPower += random(-0.5,0.5);

    solarEnergy += random(0.02,0.08);

    gridVoltage += random(-1,1);

    gridCurrent += random(-0.5,0.5);

    gridImport += random(-0.2,0.2);

    gridExport += random(-0.2,0.2);


    // Limits

    batterySOC=Math.min(100,Math.max(15,batterySOC));

    batteryTemp=Math.min(50,Math.max(25,batteryTemp));

    chargingPower=Math.max(0,chargingPower);

    solarPower=Math.max(0,solarPower);

    gridVoltage=Math.max(210,Math.min(250,gridVoltage));

    gridCurrent=Math.max(5,gridCurrent);


    // Power

    let gridPower=(gridVoltage*gridCurrent)/1000;


    // Energy

    energy += gridPower/3600;


    // Cost

    let cost = energy*tariff;


    // CO2

    co2 = solarEnergy*1.17;


    // Savings

    savings = solarEnergy*4;


    // Update HTML

    document.getElementById("batteryHealth").innerHTML =
    batteryHealth.toFixed(0)+"%";

    document.getElementById("batterySOC").innerHTML =
    batterySOC.toFixed(1)+"%";

    document.getElementById("batteryTemp").innerHTML =
    batteryTemp.toFixed(1)+"°C";

    document.getElementById("chargingPower").innerHTML =
    chargingPower.toFixed(2)+" kW";

    document.getElementById("solarPower").innerHTML =
    solarPower.toFixed(2)+" kW";

    document.getElementById("solarEnergy").innerHTML =
    solarEnergy.toFixed(2)+" kWh";

    document.getElementById("gridVoltage").innerHTML =
    gridVoltage.toFixed(0)+" V";

    document.getElementById("gridCurrent").innerHTML =
    gridCurrent.toFixed(1)+" A";

    document.getElementById("gridPower").innerHTML =
    gridPower.toFixed(2)+" kW";

    document.getElementById("energy").innerHTML =
    energy.toFixed(2)+" kWh";

    document.getElementById("cost").innerHTML =
    "₹ "+cost.toFixed(2);

    document.getElementById("tariff").innerHTML =
    "₹ "+tariff.toFixed(2);

    document.getElementById("saving").innerHTML =
    "₹ "+savings.toFixed(2);

    document.getElementById("co2").innerHTML =
    co2.toFixed(2)+" kg";

    document.getElementById("gridImport").innerHTML =
    gridImport.toFixed(2)+" kW";

    document.getElementById("gridExport").innerHTML =
    gridExport.toFixed(2)+" kW";

}


// Refresh every second

setInterval(updateDashboard,1000);

updateDashboard();


// ----------------------------------
// G2V ↔ V2G Button
// ----------------------------------

let mode="G2V";

const btn=document.getElementById("modeBtn");

btn.onclick=function(){

    if(mode=="G2V"){

        mode="V2G";

        btn.innerHTML="V2G";

        btn.style.background="#22C55E";

        btn.style.color="white";

    }

    else{

        mode="G2V";

        btn.innerHTML="G2V";

        btn.style.background="#00E5FF";

        btn.style.color="black";

    }

}
/*====================================================
    SCRIPT.JS - PART 2
    Live Charts (Chart.js)
====================================================*/

// ================================
// ARRAYS FOR LIVE DATA
// ================================

const labels = [];

const powerData = [];
const solarData = [];
const energyData = [];
const costData = [];

// ================================
// POWER CHART
// ================================

const powerChart = new Chart(

document.getElementById("powerChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Grid Power (kW)",

data:powerData,

borderColor:"#00E5FF",

backgroundColor:"rgba(0,229,255,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

animation:false,

plugins:{

legend:{

labels:{color:"white"}

}

},

scales:{

x:{

ticks:{color:"white"}

},

y:{

ticks:{color:"white"}

}

}

}

}

);

// ================================
// SOLAR CHART
// ================================

const solarChart = new Chart(

document.getElementById("solarChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Solar Power",

data:solarData,

borderColor:"#FACC15",

backgroundColor:"rgba(250,204,21,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

animation:false,

plugins:{

legend:{

labels:{color:"white"}

}

},

scales:{

x:{

ticks:{color:"white"}

},

y:{

ticks:{color:"white"}

}

}

}

}

);

// ================================
// ENERGY CHART
// ================================

const energyChart = new Chart(

document.getElementById("energyChart"),

{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"Energy (kWh)",

data:energyData,

backgroundColor:"#22C55E"

}]

},

options:{

responsive:true,

animation:false,

plugins:{

legend:{

labels:{color:"white"}

}

},

scales:{

x:{

ticks:{color:"white"}

},

y:{

ticks:{color:"white"}

}

}

}

}

);

// ================================
// COST CHART
// ================================

const costChart = new Chart(

document.getElementById("costChart"),

{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Electricity Cost",

data:costData,

borderColor:"#FB923C",

backgroundColor:"rgba(251,146,60,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

animation:false,

plugins:{

legend:{

labels:{color:"white"}

}

},

scales:{

x:{

ticks:{color:"white"}

},

y:{

ticks:{color:"white"}

}

}

}

}

);

// ================================
// UPDATE CHARTS
// ================================

function updateCharts(){

const time=new Date().toLocaleTimeString();

labels.push(time);

powerData.push((gridVoltage*gridCurrent)/1000);

solarData.push(solarPower);

energyData.push(energy);

costData.push(energy*tariff);

// Keep only last 20 readings

if(labels.length>20){

labels.shift();

powerData.shift();

solarData.shift();

energyData.shift();

costData.shift();

}

powerChart.update();

solarChart.update();

energyChart.update();

costChart.update();

}

// Update graphs every second

setInterval(updateCharts,1000);

updateCharts();
/*=====================================================
    SCRIPT.JS PART 3
    Smart Energy Features
======================================================*/

// ---------------------------
// Extra Parameters
// ---------------------------

let frequency = 50.0;
let powerFactor = 0.98;

let chargerStatus = "Charging";

let tariffMode = "Normal";

let totalCO2 = 0;

let todayEnergy = 0;

let alertMessage = "";

// ---------------------------
// Create Alert Box
// ---------------------------

const alertBox = document.createElement("div");

alertBox.id = "alertBox";

alertBox.style.position = "fixed";
alertBox.style.top = "100px";
alertBox.style.right = "20px";
alertBox.style.width = "320px";
alertBox.style.padding = "15px";
alertBox.style.borderRadius = "10px";
alertBox.style.background = "#EF4444";
alertBox.style.color = "white";
alertBox.style.fontWeight = "bold";
alertBox.style.display = "none";
alertBox.style.zIndex = "999";

document.body.appendChild(alertBox);

// ---------------------------
// Alert Function
// ---------------------------

function showAlert(msg,color="#EF4444"){

alertBox.innerHTML=msg;

alertBox.style.background=color;

alertBox.style.display="block";

setTimeout(()=>{

alertBox.style.display="none";

},4000);

}

// ---------------------------
// Dynamic Tariff
// ---------------------------

function updateTariff(){

const hour=new Date().getHours();

if(hour>=18 && hour<=22){

tariff=10.5;

tariffMode="Peak";

}

else if(hour>=0 && hour<=6){

tariff=4.5;

tariffMode="Off Peak";

}

else{

tariff=8.1;

tariffMode="Normal";

}

document.getElementById("tariff").innerHTML="₹ "+tariff.toFixed(2);

}

// ---------------------------
// Battery Health Prediction
// ---------------------------

function batteryHealthPrediction(){

batteryHealth -= 0.0002;

if(batteryHealth<80){

showAlert("Battery Health Below 80%","#F97316");

}

}

// ---------------------------
// Frequency
// ---------------------------

function updateFrequency(){

frequency += random(-0.03,0.03);

frequency=Math.min(50.2,Math.max(49.7,frequency));

}

// ---------------------------
// Power Factor
// ---------------------------

function updatePF(){

powerFactor += random(-0.01,0.01);

powerFactor=Math.min(.99,Math.max(.90,powerFactor));

}

// ---------------------------
// Charging Status
// ---------------------------

function updateCharging(){

if(mode=="G2V"){

chargerStatus="Charging";

}

else{

chargerStatus="Discharging";

}

}

// ---------------------------
// Daily Statistics
// ---------------------------

function statistics(){

todayEnergy += chargingPower/3600;

totalCO2 += solarPower*0.0003;

}

// ---------------------------
// Safety Alerts
// ---------------------------

function safetyCheck(){

if(batteryTemp>42){

showAlert("Battery Temperature High!");

}

if(gridVoltage>245){

showAlert("Grid Over Voltage!");

}

if(gridVoltage<215){

showAlert("Low Grid Voltage!");

}

if(batterySOC<20){

showAlert("Battery SOC Critical");

}

}

// ---------------------------
// Smart Meter Update
// ---------------------------

function smartMeter(){

updateTariff();

updateFrequency();

updatePF();

updateCharging();

batteryHealthPrediction();

statistics();

safetyCheck();

}

// Run Every Second

setInterval(smartMeter,1000);

smartMeter();
const themeBtn=document.getElementById("themeBtn");

let dark=true;

themeBtn.onclick=function(){

if(dark){

document.body.style.background="#F4F4F4";

document.body.style.color="black";

dark=false;

}

else{

document.body.style.background="#0B1120";

document.body.style.color="white";

dark=true;

}

}
document.getElementById("downloadCSV").onclick=function(){

let csv=

`Battery Health,${batteryHealth}
Battery SOC,${batterySOC}
Battery Temperature,${batteryTemp}
Solar Power,${solarPower}
Grid Voltage,${gridVoltage}
Grid Current,${gridCurrent}
Power,${((gridVoltage*gridCurrent)/1000).toFixed(2)}
Energy,${energy}
Cost,${(energy*tariff).toFixed(2)}
`;

const blob=new Blob([csv],{type:'text/csv'});

const url=window.URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="SmartEnergyReport.csv";

a.click();

}
document.getElementById("printReport").onclick=function(){

window.print();

}
database.ref("SmartEnergy").on("value",(snapshot)=>{

const data=snapshot.val();

batterySOC=data.SOC;

batteryHealth=data.SOH;

batteryTemp=data.temperature;

solarPower=data.solarPower;

gridVoltage=data.gridVoltage;

gridCurrent=data.gridCurrent;

});
const g2vBtn = document.getElementById("g2vBtn");
const v2gBtn = document.getElementById("v2gBtn");
const modeStatus = document.getElementById("modeStatus");

g2vBtn.onclick = function(){

    g2vBtn.classList.add("active");
    v2gBtn.classList.remove("active");

    modeStatus.innerHTML = "Grid → Vehicle Charging";

    document.getElementById("gridImport").innerHTML="2.54 kW";
    document.getElementById("gridExport").innerHTML="0.00 kW";

}

v2gBtn.onclick = function(){

    v2gBtn.classList.add("active");
    g2vBtn.classList.remove("active");

    modeStatus.innerHTML = "Vehicle → Grid Power Supply";

    document.getElementById("gridImport").innerHTML="0.00 kW";
    document.getElementById("gridExport").innerHTML="3.42 kW";

}
