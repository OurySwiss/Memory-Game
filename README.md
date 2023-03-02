# Vue Memory App Template

Dieses Repository beinhaltet ein Template für deine Vue Memory App. Bitte verwende dieses Template, 
sofern dein Tutor dir nichts anderes vorgegeben hat.

## Setup

Um das Projekt aufzusetzen installiere als erstes die Packages mit dem Package-Manager deines Vertrauens 
und überprüfe, ob du die App lokal starten kannst.

### npm
#### install
`npm install`

Falls es beim `npm install` zu einem 403 Error kommt, dann kontaktiere bitte deinen Tutor und frag ihn, 
ob du die nötigen Berechtigungen für `apps-team-npm-virtual` auf https://bin.swisscom.com hast.

#### start
`npm run serve`

### yarn
Yarn kann natürlich auch verwendet werden, aber dafür haben wir keine eigene Anleitung. \
Wenn du dich noch nicht auskennst damit, dann verwende bitte npm.

## Ordnerstruktur

Die Ordnerstruktur ist bereits vorgegeben. Wenn du daran Änderungen machen möchtest besprich es bitte mit deinem Tutor. \
Damit du die Ordnerstruktur verstehst und anfangen kannst, existiert in jedem Ordner ein README.md File, welches die 
Beschreibung des Ordners beinhaltet.

## Vorgehen

Damit wir deinen Fortschritt sehen können, commite pro Tag mindestens ein Mal deinen aktuellen Code! Wenn du mit einem 
Feature fertig bist, kannst du einen Pull-Request erstellen. Gib als Prüfer deinen Tutor an. 
Falls du nicht weisst, wie das funktioniert, dann wende dich an deinen Tutor.

## Aufgabe / Auftrag

Folgende Funktionalität muss von der App gewährleistet werden, bevor du deinen Tutor informierst, dass du fertig bist.

### Navigation

- Es soll eine Navigation mit mindestens zwei Routen geben
- Die erste Route `/` ist für das Spiel selber
- Die zweite Route `/scoreboard` ist für die Rangliste

### Rangliste

- Es soll die Rangliste, nach Punkten sortiert (tiefste Punktzahl zuerst) auf der Webapp angezeigt werden
- Darzustellen ist der Rang, Benutzername und die Anzahl Versuche

### Memory Game

- Es soll eine Liste von insgesamt 16 Karten in einem quadratischen Muster dargestellt werden.
- Es gibt 8 einzelne Karten, die dupliziert und in zufälliger Reihenfolge angezeigt werden müssen.
  Jedes Kärtchen hat eine Vorder- und eine Rückseite. Die Vorderseite besteht aus einer Hintergrundfarbe, die Rückseite 
  aus dem Bild. Standardmässig wird die Vorderseite angezeigt.
- Wenn eine Karte angeklickt wird, wird sie umgedreht.
- Es können maximal zwei Karten zur gleichen Zeit umgedreht werden. Wenn die Karten das gleiche Bild beinhalten, bleiben
 sie offen. Wenn die Karten ein unterschiedliches Bild beinhalten, werden sie nach einer Sekunde wieder zugedeckt. 
 Während dieser Sekunde können keine weiteren Karten angeklickt werden.
- Wenn alle Karten aufgedeckt sind, wird der Benutzer entweder auf eine neue Seite weitergeleitet oder es öffnet sich
 ein Popup bzw. Modal. In diesem neuen Screen sieht der Benutzer seine Punktzahl bzw. Anzahl Versuche 
 (Anzahl Klicks auf eine Karte) und er kann seinen Namen eingeben und an die Rangliste abschicken.

### Swagger

- Hier findest du alle nötigen Backend-API-Endpoints: https://memory-api.dev-scapp.swisscom.com/swagger/

### Rahmenbedingungen

- Vue router (vue-router) wird verwendet
- Aufteilung in Komponenten (Grosse Komponenten vermeiden, Logik grösstmöglich auslagern, Unterteilung in 3 Dateien (.vue, .ts, .css))
- Dynamische CSS Klassen werden verwendet (z.B. für die Karten Vorderseite und Rückseite)
- Services zum Implementieren von Backend Endpoints werden geschrieben
- Optional: Es kann [SDX](https://sdx.swisscom.ch) verwendet werden 
