# Einführung und Ziele

In meinem Projekt habe ich das Ziel, die Effizienz der API-Nutzung zu verbessern, indem ich eine Caching-Strategie implementiere. Ich verwende dazu eine Kombination aus Spring Boot für das Backend, React für das Frontend und MySQL für die Datenbank. Mein Projekt bezieht Verkehrsinformationen von der API des Bundes, speziell von der Seite "https://autobahn.api.bund.dev/". Insbesondere interessiere ich mich für die Abrufung der Baustelleninformationen entlang bestimmter Autobahnen, wie beispielsweise der A99 oder A1.

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

Die API wird mittels Swagger UI dokumentiert: http://localhost:8080/swagger-ui

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

#### Testing:
* Artillery (latest)
* Playwright (latest)

# Lösungsstrategie
Das Projekt wurde gestartet, um einen Cache für Autobahnbaustellen zu bauen. Es bezieht seine Informationen von der Bund.api.

Zunächst musste eine geeignete Technologie gewählt werden. In diesem Fall boten sich Spring Boot und React an. Dabei wurde die neueste Version von Spring Boot gewählt, um von den neuesten Features und Sicherheitsupdates zu profitieren. Es wurde ein Schichtenmodell genutzt, das eine klare Trennung von Geschäftslogik, Datenzugriff und Präsentation ermöglicht. Als Datenbank wurde MySQL gewählt, da die Technologie bereits bekannt und bewährt war.

Der Entwicklungsprozess begann mit der Fertigstellung des Backends. Nachdem das Backend vollständig implementiert war, wurde es gründlich getestet, unter anderem mit Postman, um die API-Endpunkte zu prüfen. Nach erfolgreichem Test des Backends wurde das Frontend entwickelt. Dieses wurde anschließend mit dem Backend integriert und gemeinsam getestet.

Im Anschluss wurde das Frontend visuell verbessert und optimiert. Für die Sicherstellung der Funktionalität wurden JUnit-Tests geschrieben. Der gesamte Code wurde in einem GitHub-Repository verwaltet.

Um die Anwendung unabhängig von der Umgebung laufen zu lassen, wurde sie dockerisiert. Eine Docker Compose-Datei wurde erstellt und die Anwendung lokal getestet. Nach erfolgreichem lokalen Test wurde eine GitHub Action eingerichtet, um die Anwendung kontinuierlich zu integrieren und zu deployen. Die Docker-Container wurden in GitHub abgelegt und dadurch jederzeit erreichbar gemacht.

Zur Qualitätssicherung wurde Artillery für Lasttests und Playwright für End-to-End-Tests zunächst lokal eingebaut. Nach erfolgreichen lokalen Tests wurden diese auch in die GitHub Actions integriert, um automatisierte Tests bei jedem Commit durchzuführen.

Zusätzlich wurde SonarCloud für die Analyse der Codequalität integriert. Alle von SonarCloud gemeldeten Probleme wurden behoben, um die Codequalität weiter zu verbessern. Am Ende wurde OpenAPI genutzt, um die API zu dokumentieren und zu beschreiben.

Durch diesen strukturierten Ansatz konnte ein robuster und wartbarer Cache für Autobahnbaustellen realisiert werden, der zuverlässig Informationen von der Bund.api bezieht und für verschiedene Anwendungen bereitstellt.


# Bausteinsicht

## Whitebox Gesamtsystem

***\<Übersichtsdiagramm>***

Begründung  
*Das Gesamtsystem besteht aus mehreren miteinander verbundenen Komponenten, die gemeinsam den Cache für Autobahnbaustellen bilden. Dieses Übersichtsdiagramm bietet einen Überblick über die Interaktionen und Abhängigkeiten zwischen den einzelnen Bausteinen.*

Enthaltene Bausteine  
- Spring Boot Backend
- React Frontend
- MySQL Datenbank
- Docker Container
- GitHub Actions
- Artillery & Playwright Testing Tools
- SonarCloud Analyse
- OpenAPI Dokumentation

Wichtige Schnittstellen  
- RESTful API-Schnittstellen zwischen Backend und Frontend
- Schnittstellen zwischen Docker Containern
- GitHub Actions für CI/CD-Pipelines
- Schnittstellen zu den Testing Tools Artillery und Playwright
- Schnittstellen zu SonarCloud für die Codeanalyse
- OpenAPI-Schnittstelle für die API-Dokumentation

### Spring Boot Backend

**Zweck/Verantwortung**
Das Spring Boot Backend ist verantwortlich für die Geschäftslogik und den Datenzugriff der Anwendung. Es stellt die RESTful API-Schnittstellen bereit, über die das Frontend auf die Daten zugreifen kann.

**Schnittstelle(n)**
- RESTful API-Endpunkte für die Kommunikation mit dem Frontend
- Datenbankzugriffsschnittstelle für die Interaktion mit der MySQL-Datenbank

**Erfüllte Anforderungen**
- Implementierung der Geschäftslogik gemäß den Anforderungen
- Bereitstellung von stabile und performante API-Endpunkte

**Offene Punkte/Probleme/Risiken**
- Skalierbarkeit bei steigender Last muss überwacht werden

### React Frontend

*\<Frontend-Template>*

### MySQL Datenbank

*\<Datenbank-Template>*

### Docker Container

*\<Container-Template>*

### GitHub Actions

*\<GitHub-Actions-Template>*

### Artillery & Playwright Testing Tools

*\<Testing-Tools-Template>*

### SonarCloud Analyse

*\<SonarCloud-Template>*

### OpenAPI Dokumentation

*\<OpenAPI-Template>*

### RESTful API-Schnittstellen

…

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

Architekturentscheidungen
Die Architekturentscheidungen für das Projekt wurden sorgfältig getroffen, um eine robuste und wartbare Anwendung zu gewährleisten.

Technologiewahl:

* Spring Boot: Es wurde die neueste Version von Spring Boot gewählt, um von den aktuellen Features und Sicherheitsupdates zu profitieren. Spring Boot ist bekannt für seine einfache Konfiguration und starke Unterstützung für die Entwicklung von Microservices.
* React: Für das Frontend wurde React gewählt, da es eine flexible und leistungsfähige Bibliothek für die Erstellung von Benutzeroberflächen ist.

Schichtenmodell:

* Ein Schichtenmodell wurde genutzt, das eine klare Trennung von Präsentation, Geschäftslogik und Datenzugriff ermöglicht. Dies erhöht die Wartbarkeit und Skalierbarkeit der Anwendung.

Datenbank:

* MySQL: Als Datenbank wurde MySQL gewählt, da es eine bewährte Technologie ist, die bereits bekannt und zuverlässig ist.

Entwicklungsprozess:

* Backend-First Ansatz: Der Entwicklungsprozess begann mit der Fertigstellung des Backends, um eine stabile Basis für das gesamte System zu schaffen. Nach der Implementierung wurde das Backend gründlich getestet.
* Frontend-Entwicklung: Nach erfolgreicher Backend-Entwicklung wurde das Frontend erstellt und anschließend integriert.
* Testing: Um sicherzustellen, dass alle Komponenten reibungslos zusammenarbeiten, wurden umfangreiche Tests durchgeführt. Hierfür wurde unter anderem Postman für die API-Tests und JUnit für die automatisierten Tests verwendet.

Deployment und Containerisierung:

* Docker: Die Anwendung wurde dockerisiert, um eine konsistente Umgebung für Entwicklung, Test und Produktion zu gewährleisten.
* Docker Compose: Zur Orchestrierung der Container wurde eine Docker Compose-Datei erstellt, die lokal getestet und anschließend in GitHub Actions integriert wurde.
* GitHub Actions: Automatisierte CI/CD-Pipelines wurden eingerichtet, um die Anwendung kontinuierlich zu integrieren und zu deployen.

# Qualitätsanforderungen

* Artillery und Playwright: Für Lasttests und End-to-End-Tests wurden Artillery und Playwright verwendet, zunächst lokal und dann in die GitHub Actions integriert.
* SonarCloud: Zur Überprüfung der Codequalität wurde SonarCloud integriert. Alle von SonarCloud gemeldeten Probleme wurden behoben, um eine hohe Codequalität sicherzustellen.
* OpenAPI: Am Ende wurde OpenAPI genutzt, um die API umfassend zu dokumentieren und zu beschreiben, was die Verständlichkeit und Benutzbarkeit der API erhöht.

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
| *Spring Boot*  | *Eine Java-basierte Open-Source-Framework, das die schnelle Entwicklung von Produktions- bereiten Anwendungen ermöglicht. Die neueste Version wurde für dieses Projekt verwendet.* |
| *React*        | *Eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen, die für das Frontend dieses Projekts ausgewählt wurde.* |
| *Schichtenmodell* | *Ein Architekturmuster, das eine klare Trennung von Präsentation, Geschäftslogik und Datenzugriff ermöglicht, um die Wartbarkeit und Skalierbarkeit der Anwendung zu verbessern.* |
| *MySQL*        | *Ein relationales Datenbankmanagementsystem, das für dieses Projekt als Datenbank ausgewählt wurde, aufgrund seiner Bekanntheit und Zuverlässigkeit.* |
| *Backend-First Ansatz* | *Ein Entwicklungsansatz, bei dem zuerst das Backend einer Anwendung entwickelt wird, um eine stabile Basis für das gesamte System zu schaffen.* |
| *Testing*      | *Der Prozess des Überprüfens der Funktionalität und Qualität der Anwendung, der unter anderem mit Postman für API-Tests und JUnit für automatisierte Tests durchgeführt wurde.* |
| *Docker*       | *Eine Plattform zur Containerisierung von Anwendungen, die für dieses Projekt genutzt wurde, um eine konsistente Umgebung für Entwicklung, Test und Produktion zu gewährleisten.* |
| *Docker Compose* | *Ein Tool zur Definition und Ausführung von Docker-Anwendungen, das für die Orchestrierung der Container in diesem Projekt verwendet wurde.* |
| *GitHub Actions* | *Ein Feature von GitHub, das automatisierte Workflows ermöglicht, die für dieses Projekt für Continuous Integration und Deployment verwendet wurden.* |
| *Qualitätssicherung* | *Der Prozess der Sicherstellung, dass die Anwendung den Anforderungen entspricht und von hoher Qualität ist, der unter anderem mit Artillery und Playwright für Lasttests und End-to-End-Tests durchgeführt wurde.* |
| *SonarCloud*   | *Ein Tool zur Analyse der Codequalität, das in dieses Projekt integriert wurde, um die Codequalität kontinuierlich zu überwachen und zu verbessern.* |
| *OpenAPI*      | *Eine Spezifikation zur Beschreibung von RESTful APIs, die für dieses Projekt genutzt wurde, um die API umfassend zu dokumentieren und zu beschreiben.* |

