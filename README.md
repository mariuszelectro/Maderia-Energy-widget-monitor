# Maderia-Energy-widget-monitor
Save on electricity in Madeira: Live Tariff Tracker &amp; Countdown Widget for iOS
# ⚡ EEM Electricity Tariff Tracker for Madeira (Scriptable iOS Widget)

A beautiful, smart, and production-ready iOS medium-sized widget for **Scriptable** that tracks real-time electricity tariffs for **EEM (Empresa de Electricidade da Madeira)**. 

It automatically adapts to the **Weekly Cycle (Ciclo Semanal)**, handles the seasonal changes between **Summer and Winter schedules**, and includes a live countdown timer to the next tariff change , amd mext tarrif, locked strictly to the **Madeira timezone (`Atlantic/Madeira`)**. 
**It allow plan energy usage and save money.**

---

## 📸 Features

* **Live Countdown Timer:** Uses Apple's native widget framework to show a real-time countdown (`MM:SS` or `HH:MM`) until the next tariff shift.
* **Timezone-Locked:** Hardcoded to Madeira time. No matter where you travel, the widget always shows the correct status on the island.
* **Seasonal Awareness:** Automatically shifts schedules between **Summer** (June – October) and **Winter** (November – May) based on EEM regulations.
* **Visual Distinction:** Dynamic background colors based on the current active tariff:
    * 🔵 **TANIA (Vazio)** - Light Blue
    * 🟢 **ŚREDNIA (Cheias)** - Green
    * 🔴 **DROGA (Ponta)** - Red
* **Boundary Protection:** Built-in safeguards preventing negative timer glitches or UI freezing during sharp tariff transitions.
* **Testing Mode:** Includes an internal variable override to easily simulate any day or time of the week without messing with system clocks.

---

## 🛠️ Installation

1. Download and install the [Scriptable app](https://apps.apple.com/app/scriptable/id1405459188) from the iOS App Store.
2. Open Scriptable, create a new script, and name it (e.g., `EEM Tariff`).
3. Copy the entire JavaScript code provided below and paste it into the editor.
4. Go to your iOS/iPadOS Home Screen, add a **Medium Scriptable Widget**, long-press it to edit, and choose `EEM Tariff` as the source
5. results on screen
<img width="810" height="404" alt="IMG_2432" src="https://github.com/user-attachments/assets/84a165c8-6c81-4809-98a2-f23538cace34" />

enjoy
