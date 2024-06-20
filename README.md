# Inhaltsverzeichnis
1. [Einführung und Ziele](#einführung-und-ziele)
    1. [Aufgabenstellung](#aufgabenstellung)
    2. [Qualitätsziele](#qualitätsziele)
    3. [Stakeholder](#stakeholder)
5. [Randbedingungen](#randbedingungen)
6. [Kontextabgrenzung](#kontextabgrenzung)
    1. [Fachlicher Kontext](#fachlicher-kontext)
    2. [Technischer Kontext](#technischer-kontext)
7. [Lösungsstrategie](#lösungsstrategie)
8. [Bausteinsicht](#bausteinsicht)
    1. [Whitebox Gesamtsystem](#whitebox-gesamtsystem)
    2. [Spring Boot Backend](#spring-boot-backend)
    3. [React Frontend](#react-frontend)
    4. [MySQL Datenbank](#mysql-datenbank)
    5. [Docker Compose](#docker-compose)
    6. [GitHub Actions](#github-actions)
    7. [Artillery & Playwright Testing Tools](#artillery--playwright-testing-tools)
    8. [SonarCloud Analyse](#sonarcloud-analyse)
    9. [OpenAPI Dokumentation](#openapi-dokumentation)
9. [Laufzeitsicht](#laufzeitsicht)
    1. [Szenario 1: Abruf von Baustelleninformationen für eine spezifische Autobahn](#szenario-1-abruf-von-baustelleninformationen-für-eine-spezifische-autobahn)
    2. [Szenario 2: Fehlgeschlagener Abruf von Baustelleninformationen (falsche Autobahnkennung)](#szenario-2-fehlgeschlagener-abruf-von-baustelleninformationen-falsche-autobahnkennung)
10. [Verteilungssicht](#verteilungssicht)
    1. [Infrastruktur Ebene 1](#infrastruktur-ebene-1)
    2. [Infrastruktur Ebene 2](#infrastruktur-ebene-2)
11. [Querschnittliche Konzepte](#querschnittliche-konzepte)
12. [Architekturentscheidungen](#architekturentscheidungen)
13. [Qualitätsanforderungen](#qualitätsanforderungen)
14. [Risiken und technische Schulden](#risiken-und-technische-schulden)
    1. [Risiken](#risiken)
    2. [Technische Schulden](#technische-schulden)

# Einführung und Ziele

In meinem Projekt habe ich das Ziel, die Effizienz der API-Nutzung zu verbessern, indem ich eine Caching-Strategie implementiere. Ich verwende dazu eine Kombination aus Spring Boot für das Backend, React für das Frontend und MySQL für die Datenbank. Mein Projekt bezieht Verkehrsinformationen von der API des Bundes, speziell von der Seite "https://autobahn.api.bund.dev/". Insbesondere interessiere ich mich für die Abrufung der Baustelleninformationen entlang bestimmter Autobahnen, wie beispielsweise der A99 oder A1.

## Aufgabenstellung

Die Aufgabenstellung wurde durch dieses [Tafelbild](https://github.com/LMaiStud/sqs/blob/main/doc/images/Tafelbild.png) erläutert. Im Grunde handelt es sich um ein Projekt mit Frontend und Backend. Ein Vorschlag des Dozenten war, eine Art Cache zu bauen. Dabei werden Daten von einer externen API abgerufen, zwischengespeichert in einer Datenbank und über eine Schnittstelle am Backend ausgegeben. Das Ergebnis soll im Frontend angezeigt werden. Das Frontend muss nur die grundlegenden Funktionen erfüllen; alle weiteren optischen Erweiterungen sind optional.

## Qualitätsziele

| Qualitätskriterium | Beschreibung | Ziele | Maßnahmen |
|---------------------|---------------|-------|-----------|
| **1. Reliability - Zuverlässigkeit** | Die Fähigkeit der Anwendung, auch bei unerwarteten Eingaben und hoher Belastung stabil und fehlerfrei zu funktionieren. | - Zuverlässige Verarbeitung von Benutzereingaben<br>- Hohe Stabilität bei intensiver Nutzung | - Umfangreiche Testabdeckung mit Unit-Tests<br>- Lasttests mit Artillery<br>- Integrationstest|
| **2. Portability - Übertragbarkeit** | Flexibilität der Anwendung in Bezug auf die Laufzeitumgebung. |- Externe Abhängigkeiten verringern<br>- Ressourcen effizient nutzen<br>-Browserunabhängige Nutzbarkeit | - Containerisierung mithilfe von Docker zur Isolierung der Laufzeitumgebungen sowie Sicherstellung der Plattformunabhängigkeit<br>- Docker-Compose-Datei zum Starten der Services<br>- End-to-End-Tests mit Playwright |
| **3. Usability - Benutzerfreundlichkeit** | Einfache Interaktion mit der Benutzeroberfläche. | - Simple Bedienung<br>- Übersichtliche Weboberfläche | - End-to-End-Tests mit Playwright<br>- UI-Tests |


## Stakeholder

| Rolle        | Kontakt        | Erwartungshaltung |
|--------------|----------------|-------------------|
| Trainer | Beneken, Gerd (gerd.beneken@th-rosenheim.de) | "Will ein tolles Projekt sehen!"  |
| Trainer | Reimer, Mario-Leander (mario-leander.reimer@th-rosenheim.de) | "Will ein noch besseres Prjekt sehen!"  |

# Randbedingungen

## Technische Randbedingungen
Programmiersprachen und Frameworks:

* Backend: Spring Boot (Java 17)
* Frontend: React mit VITE
* Datenbank: MySQL

Festgelegte Regeln:
* Nutzung von GitHub als Code-Repository
* Verwendung von SonarCloud
* 100% Testabdeckung im Backend
* Dokumentation im Format arc4


## Organisatorische Randbedinungen
Das Projekt wurde in Einzelarbeit durchgeführt. Zur Hilfe stand der Dozent bei allen Übungen während des Semesters zur Verfügung. Die Dauer des Projekts betrug ein Semester. Die Abgabe war am 23.06.2024.

Das Projekt muss öffentlich in einem GitHub-Repository bereitgestellt werden. Andere Git-Plattformen waren nicht erlaubt. Daher ergab sich die Notwendigkeit zur Nutzung von GitHub Actions. Zudem war SonarCloud zur Sicherstellung der Codequalität vorgeschrieben. Für die Dokumentation musste das Format arc42 verwendet werden.

## Konventionen

# Kontextabgrenzung

## Fachlicher Kontext
![Fachlicher Kontext](https://github.com/LMaiStud/sqs/blob/main/doc/images/Fachlicher%20Kontext.png)

Der Benutzer ruft über die Autobahnauskunft die Baustelleninformationen ab. Falls die Baustelle bereits in der Datenbank vorhanden ist, wird sie von dort ausgegeben. Ist sie nicht vorhanden, wird sie von der externen API abgerufen.

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

## Technische Eigenschaften

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


Der Benutzer ruft über die Autobahnauskunft die Baustelleninformationen ab. Falls die Baustelle bereits in der Datenbank vorhanden ist, wird sie von dort ausgegeben. Ist sie nicht vorhanden, wird sie von der externen API abgerufen.






# Bausteinsicht

## Whitebox Gesamtsystem

Architektur des Projektes:
![ARK](https://github.com/LMaiStud/sqs/blob/main/doc/images/Architektur.drawio.png)

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

    +-----------------------+
    | SqsMailerApplication  |
    |-----------------------|
    | + main(): void        |
    |-----------------------|
    | - Starts application  |
    | - Initializes         |
    |   ApiController       |
    +----------+------------+
               |
               v
    +-----------------------+     +------------------------+
    |    ApiController      |     |    ExternalApiService  |
    |-----------------------|     |------------------------|
    | - DataService:        |     | - baseURL: String      |
    |   dataService         |     | - fetchDataFrom        |
    | + ApiController(      |     |   ExternalAPI(): String|
    |   dataService)        |     |------------------------|
    | + getData():          |                 ^   
    |   ResponseEntity      |                 |
    |   <String>            |                 |
    +----------+------------+                 |
               |                              |
               v                              |
    +----------+------------+                 |
    |    DataService        |-----------------+
    |-----------------------|
    | - dataRepository:     |
    |   DataRepository      |
    | - externalApiService: |
    |   ExternalApiService  |
    | + createRoad(data):   |
    |   Data                |
    | + getData():          |
    |   ResponseEntity      |
    |   <String>            |
    +----------+------------+
               |
               v
    +-----------------------+
    |     DataRepository    |
    |-----------------------|
    | + existsByHighwayCode |
    |   (String): boolean   |
    | + findFirstBy         |
    |   HighwayCode(String) |
    |   : Data              |
    +----------+------------+
               |
               v
    +-----------------------+
    |         Data          |
    |-----------------------|
    | - id: Long            |
    | - dataField: String   |
    | - makeTime: Time      |
    | - makeDate: Date      |
    | - highwayCode: String |
    |-----------------------|
    | + getHighwayCode():   |
    |   String              |
    | + setHighwayCode():   |
    |   void                |
    | + getMakeTime():      |
    |   Time                |
    | + setMakeTime(Time):  |
    |   void                |
    | + getId(): Long       |
    | + setId(Long): void   |
    | + getDataField():     |
    |   String              |
    | + setDataField        |
    |   (String): void      |
    | + getMakeDate(): Date |
    | + setMakeDate(Date):  |
    |   void                |
    +----------+------------+
               |
               v
    +-----------------------+
    |          DB           |
    |-----------------------|
    |        MySQL          |
    +-----------------------+


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

![image](https://github.com/LMaiStud/sqs/assets/163861902/47fa68ad-f9d9-49be-a75f-61038ac99d1f)

### Docker Compose

[*\<Container-Compose>*](https://github.com/LMaiStud/sqs/blob/main/docker-compose.yml)

    +-----------------+           +-----------------+           +-----------------------------+  
    |                 |           |                 |           |                             |  
    |       db        |---------->|    backend      |---------->|    frontend                 |  
    |  MySQL:latest   |           |  sqs_backend    |           |  sqs_frontend               |  
    |  Port: 3306     |           |  Ports: 8080,   |           |  Port: 80                   |  
    |  Volumes:       |           |         5005    |           |  Build context: ./frontend  |  
    |  mysql_data     |           |  Depends on: db |           |  Dockerfile: Dockerfile     |  
    |                 |           |                 |           |  Depends on: backend        |  
    |                 |           |                 |           |                             |  
    +-----------------+           +-----------------+           +-----------------------------+  

### GitHub Actions

[*\<GitHub-Actions-file>*](https://github.com/LMaiStud/sqs/blob/main/.github/workflows/maven.yml)


    +------------------------------+             +-----------------------------------+
    |                              |             |                                   |
    |       lint-dockerfiles       |------------>| Build-Frontend-and-Backend-and-   |
    |   - Lint Backend Dockerfile  |             | push-imges                        |
    |   - Lint Frontend Dockerfile |             |   - Build backend with Maven      |
    |                              |             |   - Build frontend with npm       |
    |                              |             |   - Push Docker images            |
    +------------------------------+             +-----------------------------------+
                                                        |              |
                                                        V              V
                                             +-------------------+  +-------------------+
                                             |                   |  |                   |
                                             |   Artillery-Test  |  | End-To-End-Test-  |
                                             |   - Run tests     |  | Frontend-Test     |
                                             |                   |  | - Run tests       |
                                             +-------------------+  +-------------------+


### Artillery & Playwright Testing Tools

[*\<Artillery-Template>*](https://github.com/LMaiStud/sqs/blob/main/artillery-tests/artillery.yml)

[*\<Playwright-End-to-End-Test>*](https://github.com/LMaiStud/sqs/blob/main/playwright/tests/landingPage.spec.js)

### SonarCloud Analyse

[*\<SonarCloud-Link>*](https://sonarcloud.io/organizations/sqsprojekt/projects)

### OpenAPI Dokumentation

[*\<OpenAPI-Template>*](http://localhost:8080/swagger-ui)

# Laufzeitsicht

## *\<Bezeichnung Laufzeitszenario 1>*

# Laufzeitsicht

## Szenario 1: Abruf von Baustelleninformationen für eine spezifische Autobahn

### Ablaufbeschreibung

1. **Benutzeranfrage im Frontend**: Ein Benutzer navigiert auf der React-basierten Webanwendung und gibt eine spezifische Autobahnkennung (z.B. "A99") ein, um die aktuellen Baustelleninformationen abzurufen.
2. **Anfrage an das Backend**: Das Frontend sendet eine HTTP GET-Anfrage an das Spring Boot Backend. Der Endpunkt ist `/A99/services/roadworks`.
3. **Überprüfung des Caches im Backend**: Das Backend prüft, ob die Baustelleninformationen für die angefragte Autobahn bereits im Cache vorhanden sind.
   - **Cache-Hit**: Wenn die Informationen im Cache vorhanden sind, werden diese direkt aus dem Cache an das Frontend zurückgesendet.
   - **Cache-Miss**: Wenn die Informationen nicht im Cache vorhanden sind, wird eine Anfrage an die API des Bundes gesendet.
4. **Anfrage an die API des Bundes**: Das Backend sendet eine HTTP GET-Anfrage an den Endpunkt der API des Bundes, um die Baustelleninformationen für die angefragte Autobahn abzurufen.
5. **Empfang und Speicherung der Daten**: Die API des Bundes liefert die Daten im JSON-Format zurück. Das Backend speichert diese Daten im Cache und in der MySQL-Datenbank.
6. **Antwort an das Frontend**: Das Backend sendet die Baustelleninformationen zurück an das Frontend.
7. **Anzeige der Daten**: Das Frontend zeigt die erhaltenen Baustelleninformationen dem Benutzer an.

### Laufzeitdiagramm


    Benutzer            Frontend             Backend            Cache             API des Bundes          Datenbank
       |                   |                    |                  |                     |                                    |
       |---Autobahnkennung eingeben------------>|                  |                     |                                    |
       |                   |---HTTP GET /A99/services/roadworks--->|                     |                                    |
       |                   |                    |---Überprüfung des Caches-------------->|                                    |
       |                   |                    |                  |<---Cache-Hit---     |                                    |
       |                   |                    |                  |       oder          |                                    |
       |                   |                    |                  |---Cache-Miss----    |                                    |
       |                   |                    |---HTTP GET /A99/services/roadworks---->|                                    |             
       |                   |                    |                  |                     |---Baustelleninformationen (JSON)-->|
       |                   |                    |                  |<-----------------Baustelleninformationen-----------------|
       |                   |                    |<---Speichern der Daten im Cache------->|                                    |
       |                   |                    |<---Speichern der Daten in MySQL------->|                                    |
       |                   |                    |<---Baustelleninformationen-------------|                                    |
       |                   |<---Anzeige der Baustelleninformationen----------------------|                                    |
       |                   |                    |                  |                     |                                    | 




### Szenario 2: Fehlgeschlagener Abruf von Baustelleninformationen (falsche Autobahnkennung)

#### Ablaufbeschreibung

1. **Benutzeranfrage im Frontend**: Ein Benutzer navigiert auf der React-basierten Webanwendung und gibt eine falsche oder nicht existierende Autobahnkennung (z.B. "A999") ein, um die aktuellen Baustelleninformationen abzurufen.
2. **Anfrage an das Backend**: Das Frontend sendet eine HTTP GET-Anfrage an das Spring Boot Backend. Der Endpunkt ist `/A999/services/roadworks`.
3. **Überprüfung des Caches im Backend**: Das Backend prüft, ob die Baustelleninformationen für die angefragte Autobahn im Cache vorhanden sind.
   - **Cache-Miss**: Da die Autobahnkennung nicht existiert, wird keine Information im Cache gefunden.
4. **Anfrage an die API des Bundes**: Das Backend sendet eine HTTP GET-Anfrage an den entsprechenden Endpunkt der API des Bundes, um die Baustelleninformationen für die angefragte Autobahn abzurufen.
5. **Fehlerantwort von der API des Bundes**: Die API des Bundes liefert eine Fehlerantwort zurück:
   - **404 Not Found**: Die angeforderte Ressource (Baustelleninformationen für "A999") wurde nicht gefunden.
6. **Antwort an das Frontend**: Das Backend sendet eine Fehlerantwort an das Frontend, um den Benutzer über den Fehler zu informieren.
7. **Anzeige der Fehlermeldung**: Das Frontend zeigt eine entsprechende Fehlermeldung dem Benutzer an, z.B. "Die angegebene Autobahnkennung wurde nicht gefunden."

#### Laufzeitdiagramm

    Benutzer            Frontend             Backend            Cache             API des Bundes
       |                   |                    |                  |                     |
       |---Autobahnkennung eingeben------------>|                  |                     |
       |                   |---HTTP GET /A999/services/roadworks-->|                     |
       |                   |                    |---Überprüfung des Caches-------------->|
       |                   |                    |                  |<---Cache-Miss-------|
       |                   |                    |---HTTP GET /A999/services/roadworks--->|
       |                   |                    |                  |                     |
       |                   |                    |<-----------------Fehlerantwort---------|
       |                   |<---Fehlerantwort----------------------|                     |
       |<---Anzeige der Fehlermeldung------------------------------|                     |
       |                   |                    |                  |                     |


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

## Risiken

1. **Skalierbarkeit**  
   **Beschreibung:** Die Anwendung muss in der Lage sein, mit einer steigenden Anzahl von Anfragen umzugehen. Bei unzureichender Skalierung kann die Performance leiden, was zu längeren Antwortzeiten oder sogar Ausfällen führen kann.  
   **Maßnahmen:**
   - **Lasttests:** Regelmäßige Durchführung von Lasttests mit Artillery, um die Belastungsgrenzen zu identifizieren und zu beheben.
   - **Monitoring:** Implementierung eines Monitoring-Systems, um die Performance und Auslastung der Anwendung kontinuierlich zu überwachen.

2. **Cache-Konsistenz**  
   **Beschreibung:** Der Cache muss stets aktuelle und konsistente Daten bereitstellen. Ungenauigkeiten im Cache können zu veralteten oder falschen Informationen führen.  
   **Maßnahmen:**
   - **Cache-Invalidierung:** Implementierung einer effizienten Cache-Invalidierungsstrategie, um sicherzustellen, dass der Cache regelmäßig aktualisiert wird.
   - **Überwachung und Protokollierung:** Einführung von Protokollierungsmechanismen, um die Konsistenz des Caches zu überwachen und Abweichungen frühzeitig zu erkennen.

3. **Abhängigkeit von der API des Bundes**  
   **Beschreibung:** Die Anwendung ist stark auf die Verfügbarkeit und Zuverlässigkeit der API des Bundes angewiesen. Ausfälle oder Änderungen an der API können die Funktionalität der Anwendung beeinträchtigen.  
   **Maßnahmen:**
   - **Fallback-Strategien:** Implementierung von Fallback-Strategien, wie z.B. die Nutzung einer lokalen Datenkopie oder alternative Datenquellen, um die Funktionalität bei einem API-Ausfall aufrechtzuerhalten.
   - **API-Überwachung:** Kontinuierliche Überwachung der API des Bundes, um Ausfälle oder Änderungen frühzeitig zu erkennen und entsprechende Maßnahmen zu ergreifen.

4. **Sicherheitsrisiken**  
   **Beschreibung:** Die Anwendung muss vor potenziellen Sicherheitsbedrohungen geschützt werden, einschließlich SQL-Injection, Cross-Site Scripting (XSS) und unberechtigtem Datenzugriff.  
   **Maßnahmen:**
   - **Sicherheitsprüfungen:** Regelmäßige Durchführung von Sicherheitsprüfungen und Penetrationstests.
   - **Sicherheitsupdates:** Kontinuierliche Aktualisierung aller verwendeten Bibliotheken und Frameworks, um bekannte Sicherheitslücken zu schließen.

## Technische Schulden

1. **Unvollständige Tests**  
   **Beschreibung:** Einige Teile der Anwendung sind möglicherweise nicht vollständig durch Tests abgedeckt, was das Risiko von unentdeckten Fehlern erhöht.  
   **Maßnahmen:**
   - **Testabdeckung erhöhen:** Erweiterung der Testabdeckung durch Hinzufügen von mehr Unit-Tests, Integrationstests und End-to-End-Tests.
   - **Testautomatisierung:** Nutzung von CI/CD-Pipelines, um Tests bei jedem Commit automatisch auszuführen und sicherzustellen, dass keine neuen Fehler eingeführt werden.

2. **Veraltete Technologien**  
   **Beschreibung:** Die Verwendung von veralteten Versionen von Bibliotheken oder Frameworks kann zu Sicherheitslücken und Inkompatibilitäten führen.  
   **Maßnahmen:**
   - **Regelmäßige Aktualisierungen:** Planmäßige Aktualisierung aller Bibliotheken und Frameworks auf ihre neuesten stabilen Versionen.
   - **Kompatibilitätstests:** Durchführung von Kompatibilitätstests nach jeder Aktualisierung, um sicherzustellen, dass die Anwendung weiterhin einwandfrei funktioniert.

3. **Unzureichende Dokumentation**  
   **Beschreibung:** Eine unzureichende Dokumentation kann die Wartbarkeit der Anwendung erschweren und die Einarbeitung neuer Entwickler behindern.  
   **Maßnahmen:**
   - **Dokumentation erweitern:** Erstellung und Pflege einer umfassenden Dokumentation für alle Komponenten der Anwendung.
   - **Onboarding-Prozess:** Entwicklung eines strukturierten Onboarding-Prozesses für neue Entwickler, der eine schnelle Einarbeitung ermöglicht.


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
