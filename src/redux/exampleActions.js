// Per quanto riguarda le actions posso o utilizzarle direttamente come oggetti oppure usare gli ACTION CREATORS
// Usare gli action creators (semplici funzioni che ritornano quegli oggetti) è l'approccio consigliato in quanto
// meno error prone

export const increment = () => {
  return { type: "example/increment" }
}

export const decrement = () => {
  return { type: "example/decrement" }
}
