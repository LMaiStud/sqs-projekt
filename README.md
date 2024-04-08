# Einführung und Ziele

In meinem Projekt habe ich das Ziel, die Effizienz der API-Nutzung zu verbessern, indem ich eine Caching-Strategie implementiere. Ich verwende dazu eine Kombination aus Spring Boot für das Backend, React für das Frontend und MySQL für die Datenbank. Mein Projekt bezieht Verkehrsinformationen von der API des Bundes, speziell von der Seite "https://autobahn.api.bund.dev/". Insbesondere interessiere ich mich für die Abrufung der Baustelleninformationen entlang bestimmter Autobahnen, wie beispielsweise der A99.

## Aufgabenstellung

## Qualitätsziele

## Stakeholder

| Rolle        | Kontakt        | Erwartungshaltung |
|--------------|----------------|-------------------|
| Trainer | Beneken, Gerd (gerd.beneken@th-rosenheim.de) | "Will ein tolles Projekt sehen!"  |
| Trainer | Reimer, Mario-Leander (mario-leander.reimer@th-rosenheim.de) | "Will ein noch besseres Prjekt sehen!"  |

# Randbedingungen

# Kontextabgrenzung

## Fachlicher Kontext

### Externe Schnittstelle Autobahn App API
Die Schnittstelle ermöglicht es, eine Liste der aktuellen Baustellen für eine bestimmte Autobahn abzurufen.

* GET /{roadId}/services/roadworks: Dies ist der Endpunkt, um die Liste der aktuellen Baustellen abzurufen. Der Platzhalter {roadId} wird durch die Autobahnkennung ersetzt, für die die Baustellen abgerufen werden sollen.

Parameters:

* roadId*: Die Kennung der Autobahn, für die die Baustellen abgerufen werden sollen. Es handelt sich um einen Pfadparameter vom Typ String. Beispiel: "A1".
Responses:

* 200 Success: Erfolgreiche Antwort, die eine Liste der aktuellen Baustellen im JSON-Format zurückgibt.
* 204 Not found: Es wurden keine Baustellen gefunden.
* 400 Internal server error: Interner Serverfehler.
* 404 Not found: Die angeforderte Ressource wurde nicht gefunden.
* Media type: Die Antwort ist im JSON-Format.

Diese Schnittstelle bietet eine einfache Möglichkeit, die aktuellen Baustellen für eine spezifische Autobahn abzurufen und die Informationen darüber zu erhalten, was die Baustellen einschränken und wie lange sie voraussichtlich dauern werden.

## Technischer Kontext

UML Diagramm des Projekts:
![UML](https://github.com/LMaiStud/sqs/blob/main/doc/images/uml_digram.drawio%20(1).png)

Architektur des Projektes:
![ARK](https://github.com/LMaiStud/sqs/blob/main/doc/images/Architektur.drawio.png)

### Technische Eigenschaften

#### Backend:
* Spring Boot Server (v3.2.3)
* Java 17

#### Frontend:
* VITE (v4.5.3)
* Node (18.05)
* Material UI components

#### Datenbank:
* MySQL (8.3.0)

# Lösungsstrategie

# Bausteinsicht

## Whitebox Gesamtsystem

***\<Übersichtsdiagramm>***

Begründung  
*\<Erläuternder Text>*

Enthaltene Bausteine  
*\<Beschreibung der enthaltenen Bausteine (Blackboxen)>*

Wichtige Schnittstellen  
*\<Beschreibung wichtiger Schnittstellen>*

### \<Name Blackbox 1>

*\<Zweck/Verantwortung>*

*\<Schnittstelle(n)>*

*\<(Optional) Qualitäts-/Leistungsmerkmale>*

*\<(Optional) Ablageort/Datei(en)>*

*\<(Optional) Erfüllte Anforderungen>*

*\<(optional) Offene Punkte/Probleme/Risiken>*

### \<Name Blackbox 2>

*\<Blackbox-Template>*

### \<Name Blackbox n>

*\<Blackbox-Template>*

### \<Name Schnittstelle 1>

…

### \<Name Schnittstelle m>

## Ebene 2

### Whitebox *\<Baustein 1>*

*\<Whitebox-Template>*

### Whitebox *\<Baustein 2>*

*\<Whitebox-Template>*

…

### Whitebox *\<Baustein m>*

*\<Whitebox-Template>*

## Ebene 3

### Whitebox \<\_Baustein x.1\_\>

*\<Whitebox-Template>*

### Whitebox \<\_Baustein x.2\_\>

*\<Whitebox-Template>*

### Whitebox \<\_Baustein y.1\_\>

*\<Whitebox-Template>*

# Laufzeitsicht

## *\<Bezeichnung Laufzeitszenario 1>*

-   \<hier Laufzeitdiagramm oder Ablaufbeschreibung einfügen>

-   \<hier Besonderheiten bei dem Zusammenspiel der Bausteine in diesem
    Szenario erläutern>

## *\<Bezeichnung Laufzeitszenario 2>*

…

## *\<Bezeichnung Laufzeitszenario n>*

…

# Verteilungssicht

## Infrastruktur Ebene 1

***\<Übersichtsdiagramm>***

Begründung  
*\<Erläuternder Text>*

Qualitäts- und/oder Leistungsmerkmale  
*\<Erläuternder Text>*

Zuordnung von Bausteinen zu Infrastruktur  
*\<Beschreibung der Zuordnung>*

## Infrastruktur Ebene 2

### *\<Infrastrukturelement 1>*

*\<Diagramm + Erläuterungen>*

### *\<Infrastrukturelement 2>*

*\<Diagramm + Erläuterungen>*

…

### *\<Infrastrukturelement n>*

*\<Diagramm + Erläuterungen>*

# Querschnittliche Konzepte

## *\<Konzept 1>*

*\<Erklärung>*

## *\<Konzept 2>*

*\<Erklärung>*

…

## *\<Konzept n>*

*\<Erklärung>*

# Architekturentscheidungen

# Qualitätsanforderungen

<div class="formalpara-title">

**Weiterführende Informationen**

</div>

Siehe [Qualitätsanforderungen](https://docs.arc42.org/section-10/) in
der online-Dokumentation (auf Englisch!).

## Qualitätsbaum

## Qualitätsszenarien

# Risiken und technische Schulden

# Glossar

| Begriff        | Definition        |
|----------------|-------------------|
| *\<Begriff-1>* | *\<Definition-1>* |
| *\<Begriff-2*  | *\<Definition-2>* |
