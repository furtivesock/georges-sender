# georges-sender
Website for an artist with a pastel gallery which he can customize himself. Will be done in AngularJS and PHP

Link : http://georges-sender.fr/

## Requirements

- PHP 7.2+
- WampServer (or uWamp)

## Installation

Clone the repository into `wamp64\www` :
```sh
git clone "https://github.com/furtivesock/georges-sender.git"
cd georges-sender 
```

Or you can also simply download it as zip and dezip it into `wamp64\www`.

#### Database 
In progress...

#### Finally...

Launch `wamp64\wampmanager.exe` and go to `http://localhost:8000/georges-sender` in your browser (Chrome for now).

## File tree
```sh
georges-sender
├──controller
├──model
├──public # Public ressources for views
│   ├───css
│   └───images
│        └───artworks # Artworks albums vignettes
│        └───collections # Collections albums vignettes
│        └───locations # Locations images used in the Point and Click
│        └───pastels # Pastels, can be changed in the dashboard
│   └───js
├──view
├──admin.php
├──index.php
```

## TODO List

### Back-end

#### Dashboard

- [X] Front-end elements
  - [X] Pastels
  - [X] Collections
  - [X] Artworks
- [ ] User
  - [ ] Password change
  - [ ] E-mail change
  - [ ] Forgot password

### Front-end

- [ ] Point and click
  - [X] Responsive map areas
  - [X] Stylizing areas (texts)
  - [X] Show/hide areas
    - [X] Button
  - [ ] Mouse moving on the panorama (home)
  - [ ] Memorize the position of the scroll on the panorama
  - [X] Fix location image cover all the window
  - [ ] Optimize in Firefox (areas texts not showing)
  - [ ] Fix location images loading at first time
  - [ ] Keypress events
    - [ ] Echap for going back
- [ ] Gallery
  - [X] Pastels
    - [X] Responsive pastels gallery
  - [ ] Travels
    - [ ] Photographs of the world map in detail
    - [ ] Coords of all travels (100+)
    - [ ] Show all travels window
  - [ ] Collections & Artworks
    - [ ] Stylizing gallery
    - [X] Keypress events (Close)
    - [ ] Google Photos API
      - [ ] Show all images of Google Photos albums directly on the website
- [X] Infobox
  - [X] Stylizing infobox
  - [X] Keypress events (close...)

## Preview (V1 2018)

#### Dashboard :
![dashboard](https://nsa39.casimages.com/img/2018/08/13/18081306072280291.gif)
