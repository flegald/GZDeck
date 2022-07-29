# GZDeck

A Mod Launcher for GZDoom flatpak version, specifically targeting the Steam Deck

## Usage

---

* Install GZDoom via Discovery Store
* Run GZDoom one time
* Put all IWAD files into `~/.var/app/org.zdoom.GZDoom/.config/gzdoom`
* Put all Mods into `~/.var/app/org.zdoom.GZDoom/.config/gzdoom/mods`
* [Download GZDeck's latest AppImage release from repository](https://github.com/flegald/GZDeck/releases)
* Extract ZIP and place extracted folder somewhere safe.
* Open Steam and add non-steam game
* Browse to extracted directory and add the AppImage
  * If unable to add executable through Steam (it may not see inside the folder) use [this plugin](https://github.com/suchmememanyskill/steam-deck-addons/tree/main/Dolphin-rightclick-addtosteam) by [suchmememanykill](https://github.com/suchmememanyskill)
* In Steam's launch arguments you need to add `--no-sandbox` 

Notes:
---
I recommend setting up GZDoom first with a mouse and keyboard for first time launch.

A modified GZDoom config is planned for be included in this application.
