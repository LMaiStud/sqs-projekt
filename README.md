# Autobahnbaustellenauskunft

**Software-Qualitätssicherung SoSe 2024**

## Setup

### Voraussetzungen
* [Git](https://git-scm.com/downloads)
* [Docker](https://www.docker.com/products/docker-desktop/)

### Anwendung klonen
Das Repository von folgendem Link klonen:
```
git clone https://github.com/LMaiStud/sqs-projekt.git
cd sqs
```

### Projekt mit Docker Compose starten
```
docker-compose up
```


### Anwendung aufrufen
Sobald Backend und Frontend gestartet sind, ist die Oberfläche unter `http://localhost:80` verfügbar.

---

Die Backend API-Dokumentation kann über folgenden Link aufgerufen werden: http://localhost:8080/swagger-ui/index.html

## SonarCloud
[SonarCloud-Analyse](https://sonarcloud.io/organizations/sqsprojekt/projects)

### Backend-Analyse
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_backend&metric=alert_status)](https://sonarcloud.io/dashboard?id=sqsprojekt_backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_backend&metric=bugs)](https://sonarcloud.io/project/issues?id=sqsprojekt_backend&resolved=false&types=BUG)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_backend&metric=vulnerabilities)](https://sonarcloud.io/project/issues?id=sqsprojekt_backend&resolved=false&types=VULNERABILITY)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_backend&metric=code_smells)](https://sonarcloud.io/project/issues?id=sqsprojekt_backend&resolved=false&types=CODE_SMELL)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_backend&metric=coverage)](https://sonarcloud.io/component_measures?id=sqsprojekt_backend&metric=coverage&view=list)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_backend&metric=duplicated_lines_density)](https://sonarcloud.io/project/issues?id=sqsprojekt_backend&resolved=false&types=DUPLICATED_LINES)

### Frontend-Analyse
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=sqsprojekt_frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_frontend&metric=bugs)](https://sonarcloud.io/project/issues?id=sqsprojekt_frontend&resolved=false&types=BUG)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_frontend&metric=vulnerabilities)](https://sonarcloud.io/project/issues?id=sqsprojekt_frontend&resolved=false&types=VULNERABILITY)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_frontend&metric=code_smells)](https://sonarcloud.io/project/issues?id=sqsprojekt_frontend&resolved=false&types=CODE_SMELL)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_frontend&metric=coverage)](https://sonarcloud.io/component_measures?id=sqsprojekt_frontend&metric=coverage&view=list)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=sqsprojekt_frontend&metric=duplicated_lines_density)](https://sonarcloud.io/project/issues?id=sqsprojekt_frontend&resolved=false&types=DUPLICATED_LINES)


# Inhaltsverzeichnis
1. [Einführung und Ziele](#einführung-und-ziele)
    1. [Aufgabenstellung](#aufgabenstellung)
    2. [Qualitätsziele](#qualitätsziele)
    3. [Stakeholder](#stakeholder)
2. [Randbedingungen](#randbedingungen)
    1. [Technische Randbedingungen](#technische-randbedingungen)
    2. [Organisatorische Randbedingungen](#organisatorische-randbedingungen)
    3. [Konventionen](#konventionen)
3. [Kontextabgrenzung](#kontextabgrenzung)
    1. [Fachlicher Kontext](#fachlicher-kontext)
        1. [Externe Schnittstelle Autobahn App API](#externe-schnittstelle-autobahn-app-api)
    2. [Technischer Kontext](#technischer-kontext)
        1. [Architektur des Projektes](#architektur-des-projektes)
    3. [Technische Eigenschaften](#technische-eigenschaften)
        1. [Backend](#backend)
        2. [Frontend](#frontend)
        3. [Datenbank](#datenbank)
        4. [Testing](#testing)
4. [Lösungsstrategie](#lösungsstrategie)
5. [Bausteinsicht](#bausteinsicht)
    1. [Whitebox Gesamtsystem](#whitebox-gesamtsystem)
        1. [Spring Boot Backend](#spring-boot-backend)
        2. [React Frontend](#react-frontend)
6. [Laufzeitsicht](#laufzeitsicht)
    1. [Szenario 1: Abruf von Baustelleninformationen für eine spezifische Autobahn](#szenario-1-abruf-von-baustelleninformationen-für-eine-spezifische-autobahn)
        1. [Ablaufbeschreibung](#ablaufbeschreibung)
        2. [Laufzeitdiagramm](#laufzeitdiagramm)
    2. [Szenario 2: Fehlgeschlagener Abruf von Baustelleninformationen (falsche Autobahnkennung)](#szenario-2-fehlgeschlagener-abruf-von-baustelleninformationen-falsche-autobahnkennung)
        1. [Ablaufbeschreibung](#ablaufbeschreibung-1)
        2. [Laufzeitdiagramm](#laufzeitdiagramm-1)
    3. [Szenario 3: Erfolgreicher Abruf von Baustelleninformationen](#szenario-3-erfolgreicher-abruf-von-baustelleninformationen)
        1. [Ablaufbeschreibung](#ablaufbeschreibung-2)
        2. [Laufzeitdiagramm](#laufzeitdiagramm-2)
7. [Verteilungssicht](#verteilungssicht)
    1. [Infrastruktur](#infrastruktur)
    2. [Docker Compose](#docker-compose)
8. [Querschnittliche Konzepte](#querschnittliche-konzepte)
    1. [UML Diagramm des Backends](#uml-diagramm-des-backends)
    2. [MySQL Datenbank](#mysql-datenbank)
    3. [GitHub Actions](#github-actions)
    4. [Artillery & Playwright Testing Tools](#artillery--playwright-testing-tools)
    5. [SonarCloud Analyse](#sonarcloud-analyse)
    6. [OpenAPI Dokumentation](#openapi-dokumentation)
9. [Architekturentscheidungen](#architekturentscheidungen)
10. [Qualitätsanforderungen](#qualitätsanforderungen)
    1. [Qualitätsbaum](#qualitätsbaum)
    2. [Qualitätsszenarien](#qualitätsszenarien)
11. [Risiken und technische Schulden](#risiken-und-technische-schulden)
    1. [Risiken](#risiken)
    2. [Technische Schulden](#technische-schulden)
12. [Glossar](#glossar)


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

![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/a497582c-4647-44a5-be4e-38b0c54ad9c4)


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

Die API wird mittels Swagger UI dokumentiert: http://localhost:8080/swagger-ui/index.html

## Technischer Kontext

### Architektur des Projektes:
![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/0b9d23bf-2f4c-48b0-8f2e-cc98ceb6e31c)


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
![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/e9bcd52e-1629-4af9-8014-c671237e2a63)


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

![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/b2e31598-e961-4ff7-84df-05a311fbb4c6)


- **main**
  - Die `main` Komponente ist der Einstiegspunkt des Frontend-Teils der Anwendung. 
- **App**
  - Die `App` Komponente ist der zentrale Teil der Benutzeroberfläche, der verschiedene Teile der Anwendung organisiert und verwaltet.
- **LandingPage**
  - Die `LandingPage` ist eine spezifische Seite oder Ansicht innerhalb der `App`. Sie dient als Startseite für Benutzer, die die Anwendung besuchen.

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

![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/849aa2bb-fd67-4809-a5e5-c41f30df3fe9)


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


![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/86911e0c-d01b-47fe-9723-cd609960ede3)

### Szenario 3: Erfolgreicher Abruf von Baustelleninformationen

#### Ablaufbeschreibung

1. **Benutzeranfrage im Frontend**: Ein Benutzer navigiert auf der React-basierten Webanwendung und gibt eine falsche oder nicht existierende Autobahnkennung (z.B. "A99") ein, um die aktuellen Baustelleninformationen abzurufen.
2. **Anfrage an das Backend**: Das Frontend sendet eine HTTP GET-Anfrage an das Spring Boot Backend. Der Endpunkt ist `/A99/services/roadworks`.
3. **Überprüfung des Caches im Backend**: Das Backend prüft, ob die Baustelleninformationen für die angefragte Autobahn im Cache vorhanden sind.
   - **Cache-Hit**: Da die Autobahnkennung im Cache liegt.
6. **Antwort an das Frontend**: Das Backend sendet die Baustelleninformationen.
7. **Anzeige der Baustelleninformationen**: Das Frontend zeigt die Baustelleninformationen.

#### Laufzeitdiagramm

![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/b1c402f3-a787-4eaa-9536-f6a5e120acec)


# Verteilungssicht

## Infrastruktur

![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/fa83177d-da67-49f3-9e1b-f3886172559f)


**Begründung für die Architekturaufteilung**

Die Architektur unserer Anwendung folgt bewährten Prinzipien der Softwareentwicklung und bietet mehrere Vorteile durch die klare Trennung von Frontend, Backend, External API und Database in separaten Containern:

1. **Skalierbarkeit und Flexibilität**:
   - Durch die Verwendung separater Container für das Frontend und das Backend können wir Ressourcen unabhängig voneinander skalieren. Dies ermöglicht eine bessere Anpassung an sich ändernde Lastanforderungen und optimiert die Ressourcennutzung.

2. **Entkopplung und Wartbarkeit**:
   - Die Platzierung der External API und der Database außerhalb des Backend Containers ermöglicht eine klare Trennung der Verantwortlichkeiten und reduziert die Abhängigkeiten zwischen den Komponenten. Updates oder Änderungen in der External API oder der Database können unabhängig vom Backend durchgeführt werden, was die Wartbarkeit der Anwendung verbessert.

3. **Sicherheit**:
   - Die Isolierung von Komponenten in separaten Containern verbessert die Sicherheit der Anwendung. Durch die Verwendung geeigneter Netzwerkregeln und Firewalls können wir den Zugriff auf sensible Ressourcen wie die Database und die External API effektiv steuern und schützen.

4. **Technologische Vielfalt und Integration**:
   - Die externe Platzierung der External API und der Database ermöglicht es uns, verschiedene Technologien und Dienste für spezifische Anforderungen zu nutzen. Zum Beispiel können wir die Database in einer Cloud-Plattform hosten und die External API von einem externen Dienst bereitstellen, was Kosten spart und die Performance optimiert.

5. **Unterstützung für Microservices-Architektur**:
   - Die Aufteilung in separate Container fördert Prinzipien der Microservices-Architektur und Zustandslosigkeit. Jeder Container kann spezifische Funktionen oder Services bereitstellen, die über klare Schnittstellen wie REST miteinander kommunizieren. Dies erleichtert die Wartung, Skalierung und Erweiterbarkeit unserer Anwendung.

## Docker Compose

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


# Querschnittliche Konzepte


## UML Diagramm des Backends:
![UML](https://github.com/LMaiStud/sqs/blob/main/doc/images/uml_digram.drawio%20(1).png)

## MySQL Datenbank

![image](https://github.com/LMaiStud/sqs/assets/163861902/47fa68ad-f9d9-49be-a75f-61038ac99d1f)



## GitHub Actions

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


Die README.md ist von der GitHub Action ausgeschlossen.                                             


## Artillery & Playwright Testing Tools

[*\<Artillery-Template>*](https://github.com/LMaiStud/sqs/blob/main/artillery-tests/artillery.yml)

[*\<Playwright-End-to-End-Test>*](https://github.com/LMaiStud/sqs/blob/main/playwright/tests/landingPage.spec.js)

## SonarCloud Analyse

[*\<SonarCloud-Link>*](https://sonarcloud.io/organizations/sqsprojekt/projects)

## OpenAPI Dokumentation

[*\<OpenAPI-Template>*](http://localhost:8080/swagger-ui)


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

## Qualitätsbaum

![image](https://github.com/LMaiStud/sqs-projekt/assets/163861902/5c3e2366-cabb-42c4-b6b4-ddec4bb3ce3f)

## Qualitätsszenarien

| Attribut                           | Szenario                                                                                   | Maßnahme                                                                                             |
|------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Portability - Übertragbarkeit      | Nutzungsszenario: Die Software läuft auf getrennten Docker-Containern.                      | Nutzung von Docker Compose                                                                           |
|                                    | Änderungsszenario: Alle neuen Container werden automatisiert getestet.                      | Betriebssystem-unabhängige Laufzeitumgebung                                                          |
|                                    | Nutzungsszenario: Das Frontend wird unabhängig vom Browser immer gleich dargestellt.        | Tests mit Playwright auf unterschiedlichen Browsern                                                  |
|                                    | Änderungsszenario: Neue Version eines Browsers oder ein komplett neuer Browser.             | Regelmäßige Updates und Tests mit Playwright                                                         |
| Usability - Benutzerfreundlichkeit | Nutzungsszenario: Für den Nutzer ist es leicht, Autobahnbaustellen abzurufen.               | Einfaches Frontend mit leicht zu verstehenden Buttons und Suchfunktion                               |
|                                    | Änderungsszenario: Bei Verbesserungsvorschlägen werden diese notiert.                       | Aufgefallene Verbesserungsvorschläge einbauen und mit Playwright testen                              |
|                                    | Nutzungsszenario: Das Frontend zeigt nur relevante Baustellen an.                           | Einfache und übersichtliche Ausgabe im Frontend                                                      |
|                                    | Änderungsszenario: Bei Nutzerforderungen diese notieren.                                    | Aufgefallene Verbesserungsvorschläge einbauen und mit Playwright testen                              |
| Reliability - Zuverlässigkeit      | Nutzungsszenario: Das System wird regelmäßig getestet.                                      | Lasttests (Artillery), JUnit-Tests, Integrationstests, End-to-End-Tests (Playwright)                 |
|                                    | Änderungsszenario: Bei Änderungen im Code automatisierte Tests durchführen.                 | Umfassende Testabdeckung des gesamten Programms                                                      |
|                                    | Nutzungsszenario: Das System hält auch großer Belastung stand.                              | Lasttests mit Artillery automatisiert durchführen                                                    |
|                                    | Änderungsszenario: Bei neuen Anforderungen muss auch der Test geändert werden.              | Regelmäßige Anpassung der Tests                                                                      |

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
   **Beschreibung:** Einige Teile der Anwendung sind nicht vollständig durch Tests abgedeckt, was das Risiko von unentdeckten Fehlern erhöht.  
   **Maßnahmen:**
   - **Testabdeckung erhöhen:** Erweiterung der Testabdeckung durch Hinzufügen von mehr Unit-Tests vorallem im Frontend.
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

4. **Passwörter im Klartext**  
   **Beschreibung:** Nicht alle Passwörter, die für die DB gebraucht werden, sind verschlüsselt im Quellcode.  
   **Maßnahmen:**
   - **Einbau von .env Datei:** Erstellung und Nutzung einer .env Datei.
   - **Tests:** Durchführung von Tests nach jeder Aktualisierung, um sicherzustellen, dass die Anwendung weiterhin einwandfrei funktioniert.



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
