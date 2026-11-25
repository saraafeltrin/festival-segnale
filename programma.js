const griglia = document.querySelector("#event-grid");

function mostraMessaggio(testo) {
  griglia.replaceChildren();

  const messaggio = document.createElement("p");
  messaggio.textContent = testo;
  griglia.append(messaggio);
}

async function caricaProgramma() {
  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch("dati/eventi.json"),
      fetch("dati/sedi.json")
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error("Impossibile leggere uno o più file JSON.");
    }

    const eventi = await rispostaEventi.json();
    const sedi = await rispostaSedi.json();

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error("I dati JSON non hanno il formato previsto.");
    }

    if (eventi.length === 0) {
      mostraMessaggio("Al momento non ci sono eventi in programma.");
      return;
    }

    const sediPerId = new Map(sedi.map((sede) => [sede.id, sede]));
    griglia.replaceChildren();

    eventi.forEach((evento) => {
      const scheda = document.createElement("article");
      scheda.className = "event-card";

      const immagine = document.createElement("img");
      immagine.src = evento.immagine;
      immagine.alt = evento.immagine_alt;
      immagine.width = 900;
      immagine.height = 600;

      const corpo = document.createElement("div");
      corpo.className = "event-body";

      const meta = document.createElement("p");
      meta.className = "event-meta";
      meta.textContent =
        `${evento.data} · ${evento.orario} · ${evento.categoria}`;

      const titolo = document.createElement("h3");
      titolo.textContent = evento.titolo;

      const descrizione = document.createElement("p");
      descrizione.textContent = evento.descrizione;

      const sedeTesto = document.createElement("p");
      sedeTesto.className = "event-place";

      const etichetta = document.createElement("strong");
      etichetta.textContent = "Sede: ";

      const sede = sediPerId.get(evento.sede_id);
      sedeTesto.append(
        etichetta,
        sede ? sede.nome : "Sede da definire"
      );

      corpo.append(meta, titolo, descrizione, sedeTesto);
      scheda.append(immagine, corpo);
      griglia.append(scheda);
    });
  } catch (errore) {
    console.error("Errore nel caricamento del programma:", errore);
    mostraMessaggio(
      "Non è stato possibile caricare il programma. Riprova più tardi."
    );
  }
}

caricaProgramma();