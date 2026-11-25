# Scheda dati: eventi e sedi

## Entità

### Evento

Rappresenta un appuntamento del festival.

| Campo | Tipo | Esempio |
|---|---|---|
| `id` | numero intero | `1` |
| `giorno` | stringa | `"Venerdì 12 giugno"` |
| `ora` | stringa | `"10:00"` |
| `tipo` | stringa | `"Incontro"` |
| `titolo` | stringa | `"Lettere in movimento"` |
| `descrizione` | stringa | `"Come cambia un messaggio..."` |
| `immagine` | stringa | `"assets/lettere-in-movimento.svg"` |
| `alt` | stringa | `"Lettere geometriche disposte su una griglia"` |
| `sede_id` | numero intero | `1` |

Chiave primaria: `id`, univoco nell’entità e stabile.

### Sede

Rappresenta un luogo che ospita uno o più appuntamenti.

| Campo | Tipo | Esempio |
|---|---|---|
| `id` | numero intero | `1` |
| `nome` | stringa | `"Officina Nord"` |
| `indirizzo` | stringa | `"Corso Duca degli Abruzzi 24, Torino"` |

Chiave primaria: `id`, univoco nell’entità e stabile.

## Relazione

Una sede può ospitare più eventi; ogni evento si svolge in una sede.
`Evento.sede_id` fa riferimento a `Sede.id`.

## Quantità

Il progetto contiene sei eventi e tre sedi.

## Aggiornamento e visualizzazione

Chi aggiorna il sito modifica i file `eventi.json` e `sedi.json`
nella repository e pubblica le modifiche. La pagina Programma legge i
due file e mostra gli appuntamenti con orario, tipo, titolo,
descrizione, immagine e nome della sede.

## Schema Evento–Sede

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        int id PK
        string nome
        string indirizzo
    }
    EVENTO {
        int id PK
        string giorno
        string ora
        string tipo
        string titolo
        string descrizione
        string immagine
        string alt
        int sede\_id FK
    }