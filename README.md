# GZDeck

A Mod Launcher for GZDoom flatpak version, specifically targeting the Steam Deck

## Usage

---
**Currently in pre-pre-alpha!!**


* Install GZDoom via Discovery Store
* Run GZDoom one time
* Put all IWAD files into `~/.var/app/org.zdoom.GZDoom/.config/gzdoom`
* Put all Mods into `~/.var/app/org.zdoom.GZDoom/.config/gzdoom/mods`
* Download GZDeck's latest release from repository
* Extract ZIP and place extracted folder somewhere safe.
* Open Steam and add non-steam game
* Browse to extracted directory and add the file `gzdeck`
  * If unable to add executable through Steam (it may not see inside the folder) use [this plugin](https://github.com/suchmememanyskill/steam-deck-addons/tree/main/Dolphin-rightclick-addtosteam) by [suchmememanykill](https://github.com/suchmememanyskill)
* In Steam's launch arguments you need to add `--no-sandbox` 

Controller Support is not implemented, you can use touch or mouse/touchpad
