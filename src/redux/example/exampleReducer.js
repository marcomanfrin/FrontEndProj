const initialState = {
  count: 0,
}

const exampleReducer = (actualState = initialState, action) => {
  // Il reducer è un "cervellone" che, in base al tipo dell'azione che riceverà ed allo stato attuale
  // deve essere in grado di determinare quale sarà il prossimo stato (SENZA MODIFICARE LO STATO ATTUALE)
  // Dobbiamo quindi scrivere della logica condizionale che, siccome potrebbero esserci tante action diverse,
  // per pulizia si può implementare tramite switch-case

  switch (action.type) {
    case "example/increment":
      return { ...actualState, count: actualState.count + 1 } // Con lo SPREAD OPERATOR garantisco la immutability

    case "example/decrement":
      return { ...actualState, count: actualState.count - 1 }

    default:
      return actualState // Se l'action type non è nessuno dei precedenti, ritorna lo stato non modificato
  }
}

export default exampleReducer
