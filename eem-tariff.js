// ==================================================
// 🧪 TRYB TESTOWY 
// Jeśli chcesz testować, odkomentuj poniższą linię (usuń //):
// let now = new Date(2026, 5, 6, 22, 45, 0) // Sobota, 6 czerwca, 22:45

// Flaga sprawdzająca, czy używamy trybu testowego
let isTesting = (typeof now !== 'undefined');

// Jeśli powyższa linia jest zakomentowana (ma //), bierzemy normalny czas:
if (!isTesting) {
  now = new Date()
}
// ==================================================

let year, month, day, hour, minute
let realNow = new Date() // Prawdziwy czas urządzenia dla stopera Apple

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

// ---------- FUNKCJA ZWRACAJĄCA TARYFĘ DLA DOWOLNEJ MINUTY TYGODNIA ----------
function getTariffForMinutes(totalMinutes) {
  let minOfWeek = totalMinutes % 10080
  if (minOfWeek < 0) minOfWeek += 10080

  let d = Math.floor(minOfWeek / 1440)
  let minOfDay = minOfWeek % 1440

  if (isSummer) {
    if (d >= 1 && d <= 5) { // Poniedziałek - Piątek
      if (minOfDay >= 0 && minOfDay < 420) return "tania"       
      if (minOfDay >= 420 && minOfDay < 660) return "średnia"   
      if (minOfDay >= 660 && minOfDay < 840) return "droga"     
      if (minOfDay >= 840 && minOfDay < 1200) return "średnia"  
      if (minOfDay >= 1200 && minOfDay < 1320) return "droga"   
      return "średnia"                                          
    } else if (d === 6) { // Sobota
      if (minOfDay >= 0 && minOfDay < 660) return "tania"       
      if (minOfDay >= 660 && minOfDay < 870) return "średnia"   
      if (minOfDay >= 870 && minOfDay < 1170) return "tania"    
      if (minOfDay >= 1170 && minOfDay < 1380) return "średnia" 
      return "tania"                                            
    } else { // Niedziela
      return "tania"                                            
    }
  } else { // ZIMA
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

// ---------- LOGIKA SZUKANIA NAJBLIŻSZEJ ZMIANY ----------
let currentTariff = getTariffForMinutes(currentMinOfWeek)
let targetMinutes = 0
let nextTariff = currentTariff

while (nextTariff === currentTariff && targetMinutes < 20000) {
  targetMinutes++
  nextTariff = getTariffForMinutes(currentMinOfWeek + targetMinutes)
}

// Obliczamy cel odliczania dla systemu iOS
let targetDate = new Date(realNow.getTime())
targetDate.setMinutes(targetDate.getMinutes() + targetMinutes)
targetDate.setSeconds(0)

// BEZPIECZNE WYPOWADZENIE GODZINY ZMIANY
let totalNextMinutes = hour * 60 + minute + targetMinutes
let nextHour = Math.floor(totalNextMinutes / 60) % 24
let nextMin = totalNextMinutes % 60
let nextTariffTimeText = (nextHour < 10 ? "0" + nextHour : nextHour) + ":" + (nextMin < 10 ? "0" + nextMin : nextMin)

// ---------- ORYGINALNA PALETA KOLORÓW WIDŻETU ----------
function getColor(tariffName) {
  if (tariffName === "tania") return new Color("#0288D1")   
  if (tariffName === "średnia") return new Color("#2E7D32") 
  if (tariffName === "droga") return new Color("#C62828")   
  return new Color("#222222")
}

// ---------- BUDOWA UKŁADU GRAFICZNEGO WIDŻETU ----------
let widget = new ListWidget()
widget.setPadding(0, 0, 0, 0) 

let mainStack = widget.addStack()
mainStack.layoutHorizontally()

let leftStack = mainStack.addStack()
leftStack.layoutVertically()
leftStack.backgroundColor = getColor(currentTariff)
leftStack.setPadding(14, 14, 14, 14)

leftStack.addSpacer()

let tariffMap = { "tania": "TANIA", "średnia": "ŚREDNIA", "droga": "DROGA" }
let title = leftStack.addText(tariffMap[currentTariff] || "NIEZNANA")
title.font = Font.boldSystemFont(20)
title.textColor = Color.white()
title.centerAlignText()

leftStack.addSpacer(8)

// OCHRONA PRZED UJEMNYM STOPEREM: Jeśli czas minął, a system nie odświeżył – sztywno pokazujemy zero
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

let small = leftStack.addText("do zmiany taryfy")
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

// ==================================================
// 🔄 DYNAMICZNY SYSTEM ODŚWIEŻANIA (ZABEZPIECZENIE)
// Nakazujemy systemowi iOS przeładowanie dokładnie w minucie zmiany taryfy!
let refreshDate = new Date(realNow.getTime())
refreshDate.setMinutes(refreshDate.getMinutes() + targetMinutes)
refreshDate.setSeconds(1) // Dodajemy 1 sekundę marginesu
widget.refreshAfterDate = refreshDate
// ==================================================

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  await widget.presentMedium()
}

Script.complete()
