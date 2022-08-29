# GZDeck

A Mod Launcher for GZDoom flatpak version, specifically targeting the Steam Deck

![gzdeck-capture](https://user-images.githubusercontent.com/14855999/182043123-313d2a04-ef9a-4e8b-9d0b-5b468d915cd3.png)

## Features

* Specifically targets flatpak version of GZDoom.
* Controller support
* Keeps track of last ran suite of mods

## Usage

* **Important** To launch this application through Steam as a non-steam game you have to set `--no-sandbox` as a launch argument.*
---

* Install GZDoom via Discovery Store
* [Download GZDeck's latest AppImage release from repository](https://github.com/flegald/GZDeck/releases)
    * (You may need to run the AppImage once in desktop mode to give permission)
* Put all IWAD files into `~/.var/app/org.zdoom.GZDoom/.config/gzdoom`
* Put all Mods into `~/.var/app/org.zdoom.GZDoom/.config/gzdoom/mods`
* Open Steam and add non-steam game
* Browse to extracted directory and add the AppImage
* **In Steam's launch arguments you need to add `--no-sandbox`**

![gzdeckgrab](https://user-images.githubusercontent.com/14855999/187118777-dc091264-37aa-44c6-8541-2202a965e83a.png)


[BUG REPORTING](https://github.com/flegald/GZDeck/issues)

Notes:
---
I recommend setting up GZDoom first with a mouse and keyboard for first time launch.

*A note or two on `--no-sandbox`.
* Failure to set this flag may cause steam to hang.
* This application does not and will not have any network functionality due to this limitation.
