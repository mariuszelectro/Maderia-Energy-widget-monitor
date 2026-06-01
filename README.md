# Maderia-Energy-widget-monitor
Save on electricity in Madeira: Live Tariff Tracker & Countdown Widget for iOS

# ⚡ EEM Electricity Tariff Tracker for Madeira (Scriptable iOS Widget)

A beautiful, smart, and production-ready iOS medium-sized widget for **Scriptable** that tracks real-time electricity tariffs for **EEM (Empresa de Electricidade da Madeira)**. 

It automatically adapts to the **Weekly Cycle (Ciclo Semanal)**, handles the seasonal changes between **Summer and Winter schedules**, and includes a live countdown timer to the next tariff change and shows the next incoming tariff, locked strictly to the **Madeira timezone (`Atlantic/Madeira`)**. 
**It allows you to plan energy usage and save money.**

[![Kup mi kawę](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=mariuszelectro&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/mariuszelectro)

---

## 📱 Compatibility

This widget is fully optimized, tested, and **100% compatible** with both Apple devices:
* 🍏 **iPhone** (iOS 14+)
* 🍏 **iPad** (iPadOS 14+)

The interface automatically scales and adjusts its layout perfectly whether it is placed on a smaller mobile screen or a larger tablet grid.

---

## 📸 Features

* **Live Countdown Timer:** Uses Apple's native widget framework to show a real-time countdown (`MM:SS` or `HH:MM`) until the next tariff shift.
* **Timezone-Locked:** Hardcoded to Madeira time. No matter where you travel, the widget always shows the correct status on the island.
* **Seasonal Awareness:** Automatically shifts schedules between **Summer** (June – October) and **Winter** (November – May) based on EEM regulations.
* **Visual Distinction:** Dynamic background colors based on the current active tariff:
    * 🔵 **TANIA (Vazio) / Cheap** - Light Blue
    * 🟢 **ŚREDNIA (Cheias) / Medium** - Green
    * 🔴 **DROGA (Ponta) / Expensive** - Red
* **Boundary Protection:** Built-in safeguards preventing negative timer glitches or UI freezing during sharp tariff transitions.
* **Multi-Language Support:** Easily switch between languages directly via native iOS Widget configurations without modifying the script.

---

## 🌐 Localization & Language Setup

The widget natively supports 3 languages. You can switch between them instantly using the native **Parameter** field on your iOS Home Screen:

| Parameter Input | Active Language | Display Labels |
| :--- | :--- | :--- |
| *Leave Blank* or `pl` | **Polish** (Default) | TANIA / ŚREDNIA / DROGA |
| `pt` | **Portuguese** | VAZIO / CHEIAS / PONTA |
| `en` | **English** | OFF-PEAK / MID-PEAK / PEAK |

### How to set your language:
1. Long-press the widget on your iOS Home Screen.
2. Select **"Edit Widget"** from the context menu.
3. Locate the **Parameter** input field.
4. Type `en` for English, `pt` for Portuguese, or leave it blank (or type `pl`) for Polish.
5. Tap anywhere outside to close. The widget updates immediately!

---

## 🛠️ Installation & Setup Guide

### Phase 1: Adding the Code to Scriptable
1. Download and install the [Scriptable app](https://apps.apple.com/app/scriptable/id1405459188) from the iOS App Store.
2. Open the Scriptable app on your iPhone or iPad.
3. Click the plus icon (**+**) in the top right corner to create a new script.
4. Tap the title at the top (e.g., *Untitled Script*) and rename it to `EEM Tariff`.
5. Copy the entire JavaScript code provided in `eem-tariff.js`, paste it into the editor, and tap **Done** (top left).

### Phase 2: Launching the Widget on your Home Screen (iPhone & iPad)
1. Go to your device's **Home Screen**.
2. **Long-press (press and hold)** any empty space or an icon until all the apps start to jiggle.
3. Tap the plus icon (**+**) that appears in the **top-left corner** of the screen.
4. Scroll down the list or use the search bar to find and select **Scriptable**.
5. Swipe to find the **Medium-sized widget layout** (rectangular layout) and tap **Add Widget**.
6. While the apps are still jiggling (or by long-pressing the newly added widget), tap directly on the widget to open its iOS settings block.
7. Configure the options as follows:
   * **Script:** Select `EEM Tariff`.
   * **When Interacting:** Open App (or choose *Run Script* / *Do Nothing* based on your preference).
   * **Parameter:** Type your language code here (`pl`, `pt`, `en`) or leave it blank for default Polish.
8. Tap anywhere on the empty screen to exit edit mode. Your live tracking monitor is now active!

### Results on screen:

<img width="810" height="404" alt="IMG_2432" src="https://github.com/user-attachments/assets/84a165c8-6c81-4809-98a2-f23538cace34" />
<img width="860" height="417" alt="image" src="https://github.com/user-attachments/assets/6238bc32-c66b-41a7-a621-b58fc5cd43fe" />
<img width="2367" height="849" alt="image" src="https://github.com/user-attachments/assets/447bc8ed-711f-4984-a6b0-a2fc421c0b1d" />

---
enjoy
