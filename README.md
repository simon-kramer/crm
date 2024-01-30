# CRM Testaufgabe

## Infos vorab

Das CRM kann alle Basis CRUD Operationen ausführen und hat ein paar kleine Extras. Wichtig ist jedoch, dass die type safety nicht überall gewährleistet ist und die jetzigen /pages sowie das default.vue layout in einer realen Umgebung refaktoriert werden müssten Header, Footer, Usermenü etc. sowie InfoBanner, DataTable, Pagination und EditModal. Bestimmte Funktionen sind - wie bspw. die Pagination - auch bedingt durch die Mock API, normalerweise würde sie per Store über die meta der /customer response umgesetzt werden und nicht "manuell" per method gebildet.

## Setup

```bash
# npm
# yarn
yarn install

```

## DB Server (json-server)

Um die Mock API DB zu starten:

```bash
# yarn
yarn startdb

```

## Developmentserver

```bash
# yarn
yarn run dev -o

```
