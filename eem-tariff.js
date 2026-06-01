// ==================================================
// 🌍 DYNAMIC CONFIGURATION (iOS PARAMETER & AUTO-TEST)
// Default language if the language parameter is omitted: "pl", "pt", or "en"
let defaultLang = "pl"; 

let LANG = defaultLang;
let isTesting = false;
let now;

// Parse the iOS Widget parameter (supports separation by semicolon, e.g., "pt; 12-05-2026 17:23")
if (args.widgetParameter) {
  let params = args.widgetParameter.split(";");
  
  // 1. Extract and clean the language token
  let langInput = params[0].trim().toLowerCase();
  if (["pl", "pt", "en"].includes(langInput)) {
    LANG = langInput;
  }
  
  // 2. Check for a secondary test date parameter (Format: DD-MM-YYYY HH:MM)
  if (params.length > 1 && params[1].trim().length > 0) {
    let dateStr = params[1].trim(); // e.g., "12-05-2026 17:23"
    
    // Regex matching DD-MM-YYYY HH:MM
    let dateReg = /^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})$/;
    let match = dateStr.match(dateReg);
    
    if (match) {
      let targetDay = parseInt(match[1], 10);
      let targetMonth = parseInt(match[2], 10) - 1; // JS months are 0-11
      let targetYear = parseInt(match[3], 10);
      let targetHour = parseInt(match[4], 10);
      let targetMinute = parseInt(match[5], 10);
      
      now = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute, 0);
      isTesting = true;
    }
  }
}

// Fallback to current hardware time if testing mode wasn't triggered via parameter
if (!isTesting) {
  now = new Date();
}
// ==================================================

// ---------- LOCALIZATION TABLE (DICTIONARY) ----------
const TRANSLATIONS = {
  pl: {
    tania: "TANIA",
    srednia: "ŚREDNIA",
    droga: "DROGA",
    unknown: "NIEZNANA",
    footer: "do zmiany taryfy"
  },
  pt: {
    tania: "VAZIO",
    srednia: "CHEIAS",
    droga: "PONTA",
    unknown: "DESCONHECIDO",
    footer: "para mudar tarifa"
  },
  en: {
    tania: "OFF-PEAK",
    srednia: "MID-PEAK",
    droga: "PEAK",
    unknown: "UNKNOWN",
    footer: "until tariff change"
  }
};

let i18n = TRANSLATIONS[LANG] || TRANSLATIONS["en"];

let year, month, day, hour, minute
let realNow = new Date() // Real device time strictly reserved for the native Apple timer component

if (isTesting) {
  year = now.getFullYear()
  month = now.getMonth() + 1 
  day = now.getDate()
  hour = now.getHours()
  minute = now.getMinutes()
} else {
  let targetTimezone = "Atlantic/Madeira"
  let formatter = new DateFormatter()
  formatter.timeZone = targetTimezone

  formatter.dateFormat = "yyyy"
  year = parseInt(formatter.string(now))
  formatter.dateFormat = "M"
  month = parseInt(formatter.string(now))
  formatter.dateFormat = "d"
  day = parseInt(formatter.string(now))
  formatter.dateFormat = "H"
  hour = parseInt(formatter.string(now))
  formatter.dateFormat = "m"
  minute = parseInt(formatter.string(now))
}

let checkDate = new Date(year, month - 1, day, hour, minute, 0)
let weekday = checkDate.getDay() 

let currentMinOfWeek = (weekday * 1440) + (hour * 60 + minute)
let isSummer = (month >= 6 && month <= 10)

// ---------- TARIFF LOOKUP FUNCTION FOR ANY GIVEN MINUTE OF THE WEEK ----------
function getTariffForMinutes(totalMinutes) {
  let minOfWeek = totalMinutes % 10080
  if (minOfWeek < 0) minOfWeek += 10080

  let d = Math.floor(minOfWeek / 1440)
  let minOfDay = minOfWeek % 1440

  if (isSummer) {
    if (d >= 1 && d <= 5) { // Monday - Friday
      if (minOfDay >= 0 && minOfDay < 420) return "tania"       
      if (minOfDay >= 420 && minOfDay < 660) return "średnia"   
      if (minOfDay >= 660 && minOfDay < 840) return "droga"     
      if (minOfDay >= 840 && minOfDay < 1200) return "średnia"  
      if (minOfDay >= 1200 && minOfDay < 1320) return "droga"   
      return "średnia"                                          
    } else if (d === 6) { // Saturday
      if (minOfDay >= 0 && minOfDay < 660) return "tania"       
      if (minOfDay >= 660 && minOfDay < 870) return "średnia"   
      if (minOfDay >= 870 && minOfDay < 1170) return "tania"    
      if (minOfDay >= 1170 && minOfDay < 1380) return "średnia" 
      return "tania"                                            
    } else { // Sunday
      return "tania"                                            
    }
  } else { // WINTER
    if (d >= 1 && d <= 5) { 
      if (minOfDay >= 0 && minOfDay < 420) return "tania"
      if (minOfDay >= 420 && minOfDay < 1140) return "średnia"
      if (minOfDay >= 1140 && minOfDay < 1320) return "droga"
      return "średnia"
    } else if (d === 6) { 
      if (minOfDay >= 0 && minOfDay < 690) return "tania"
      if (minOfDay >= 690 && minOfDay < 840) return "średnia"
      if (minOfDay >= 840 && minOfDay < 1080) return "tania"
      if (minOfDay >= 1080 && minOfDay < 1350) return "średnia"
      return "tania"
    } else { 
      return "tania"
    }
  }
}

// ---------- SEARCH LOGIC FOR THE CLOSING TARIFF BOUNDARY ----------
let currentTariff = getTariffForMinutes(currentMinOfWeek)
let targetMinutes = 0
let nextTariff = currentTariff

while (nextTariff === currentTariff && targetMinutes < 20000) {
  targetMinutes++
  nextTariff = getTariffForMinutes(currentMinOfWeek + targetMinutes)
}

// APPLE TIMER FIX: Syncing accurate target runtime relative to system clock
let targetDate = new Date(realNow.getTime())
targetDate.setMinutes(targetDate.getMinutes() + targetMinutes)
targetDate.setSeconds(0)

// Safe display logic mapping the exact hour/minute for the preview panel
let totalNextMinutes = hour * 60 + minute + targetMinutes
let nextHour = Math.floor(totalNextMinutes / 60) % 24
let nextMin = totalNextMinutes % 60
let nextTariffTimeText = (nextHour < 10 ? "0" + nextHour : nextHour) + ":" + (nextMin < 10 ? "0" + nextMin : nextMin)

// ---------- WIDGET COLOR PALETTES ----------
function getColor(tariffName) {
  if (tariffName === "tania") return new Color("#0288D1")   
  if (tariffName === "średnia") return new Color("#2E7D32") 
  if (tariffName === "droga") return new Color("#C62828")   
  return new Color("#222222")
}

function getTariffLabel(tariffName) {
  if (tariffName === "tania") return i18n.tania;
  if (tariffName === "snia" || tariffName === "średnia") return i18n.srednia;
  if (tariffName === "droga") return i18n.droga;
  return i18n.unknown;
}

// ---------- UI LAYOUT ASSEMBLY ----------
let widget = new ListWidget()
widget.setPadding(0, 0, 0, 0) 

let mainStack = widget.addStack()
mainStack.layoutHorizontally()

let leftStack = mainStack.addStack()
leftStack.layoutVertically()
leftStack.backgroundColor = getColor(currentTariff)
leftStack.setPadding(14, 14, 14, 14)

leftStack.addSpacer()

let title = leftStack.addText(getTariffLabel(currentTariff))
title.font = Font.boldSystemFont(20)
title.textColor = Color.white()
title.centerAlignText()

leftStack.addSpacer(8)

// ANTI-NEGATIVE TIMER SAFEGUARD: Freezes UI at zero if iOS background engine lags
if (targetMinutes <= 0) {
  let fallbackText = leftStack.addText("00:00")
  fallbackText.font = Font.boldSystemFont(32)
  fallbackText.textColor = Color.white()
  fallbackText.centerAlignText()
} else {
  let mainText = leftStack.addDate(targetDate)
  mainText.applyTimerStyle()
  mainText.font = Font.boldSystemFont(32)
  mainText.textColor = Color.white()
  mainText.centerAlignText()
}

leftStack.addSpacer(4)

let small = leftStack.addText(i18n.footer)
small.font = Font.systemFont(11)
small.textColor = new Color("#E0E0E0")
small.centerAlignText()

leftStack.addSpacer()

let separator = mainStack.addStack()
separator.backgroundColor = Color.white()
separator.size = new Size(3, 0)

let rightStack = mainStack.addStack()
rightStack.layoutVertically()
rightStack.backgroundColor = getColor(nextTariff)
rightStack.size = new Size(80, 0) 
rightStack.setPadding(0, 4, 0, 4)

rightStack.addSpacer()

let timeTitle = rightStack.addText(nextTariffTimeText)
timeTitle.font = Font.boldSystemFont(16) 
timeTitle.textColor = Color.white()
timeTitle.centerAlignText()

rightStack.addSpacer()

// ---------- DYNAMIC REFRESH MONITORING ----------
let refreshDate = new Date(realNow.getTime())
refreshDate.setMinutes(refreshDate.getMinutes() + targetMinutes)
refreshDate.setSeconds(1) 
widget.refreshAfterDate = refreshDate

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  await widget.presentMedium()
}

Script.complete()

