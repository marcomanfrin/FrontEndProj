import Counter from "../components/Counter"
import { useSelector } from "react-redux"

const Home = () => {
  return (
    <>
      <div style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>BivacchiApp</h1>
        <p style={{ margin: '5px 0 0' }}>La tua guida ai bivacchi di montagna</p>
      </div>

      <div style={{ padding: '20px' }}>
        <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0 }}>Benvenuto nella home</h2>
          <p>
            Questa è la schermata iniziale della tua esplorazione nel mondo dei bivacchi.
          </p>
        </section>

        <section style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h2>Cos'è BivacchiApp?</h2>
          <p>
            BivacchiApp è una web application sviluppata come progetto per un esame universitario di <strong>Sviluppo Front-End</strong>. 
            L'obiettivo dell'app è offrire agli utenti uno strumento intuitivo e funzionale per scoprire nuovi bivacchi sparsi sul territorio.
          </p>
        </section>

        <section style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h2>Funzionalità principali</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <p>Scoprire nuovi bivacchi con dettagli come <strong>posizione</strong>, <strong>altitudine</strong>, <strong>zona</strong> e <strong>foto</strong></p>
            <p>Gli <strong>utenti amministratori</strong> possono aggiungere nuovi bivacchi</p>
            <p>Gli utenti possono <strong>salvare</strong> nel proprio profilo i bivacchi che hanno visitato</p>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Home;
