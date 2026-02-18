import { useState, useEffect, useRef } from "react";
//palette colori
const C = {
  bgColor: "#0d0f14",
  bgCard: "#13161e",
  bgElement:"#1a1e2a",
  borderColor:"#252a38",
  borderHighlight: "#334060",
  primaryColor:"#3b82f6",
  primaryGradient:"#1d4ed8",
  successColor: "#10b981",
  dangerColor: "#ef4444",
  warningColor:"#f59e0b",
  pendingColor:"#8b5cf6",
  textColor:"#e2e8f0",
  textLabelColor:"#94a3b8",
  textMutedColor:"#4a5568",
  textCodeColor:"#7dd3fc"
}

//css
const stile = {
  root: {
    minHeight: "100vh",
    background: C.bgColor,
    color: C.textColor,
    fontFamily: "'IBM Plex Mono', 'Fira Code', 'Cascadia Code', monospace",
    fontSize: "13px",
    lineHeight: 1.6
  },
  header: {
    background: C.bgCard,
    borderBottom: `1px solid ${C.borderColor}`,
    padding: "20px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  headerLeft: {
    display: "flex", alignItems: "center",
    gap: 16
  },
  logo: {
    width:36,
    height:36,
    borderRadius:8,
    background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryGradient})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize:18,
    fontWeight:700,
    color: "#fff",
    flexShrink:0
  },
  headerTitle: {
    fontSize:15,
    fontWeight:700,
    color: C.textColor,

  },
  headerSub: {
    fontSize:11,
    color: C.textLabelColor,
    marginTop:2
  },
  badge: (color) => ({
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "3px 10px", borderRadius: 20,
    background: color + "18", border: `1px solid ${color}40`,
    color, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
  }),
  dot: (color) => ({
    width: 6, height: 6, borderRadius: "50%", background: color,
    boxShadow: `0 0 6px ${color}`,
    animation: "pulse 2s ease-in-out infinite",
  }),
  main: { padding: "24px 32px", maxWidth: 1400, margin: "0 auto" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },
  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize:10,
    fontWeight:700,
    color: C.textLabelColor,
    //letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom:10,
    display: "flex", alignItems: "center",
    gap:8
  },
  card: {
    background: C.bgCard,
    border: `1px solid ${C.borderColor}`,
    borderRadius:10,
    padding:20
  },
  cardAccent: {
    background: C.bgCard,
    border: `1px solid ${C.primaryColor}40`,
    borderRadius: 10,
    padding:20,
    boxShadow: `0 0 0 1px ${C.primaryColor}10`
  },
  label: {
    fontSize:11,
    color: C.textLabelColor,
    marginBottom:6,
    display: "block"
  },
  input: {
    width: "100%",
    background: C.bgElement,
    border: `1px solid ${C.borderColor}`,
    borderRadius:6,
    padding: "9px 12px",
    color: C.textColor,
    fontFamily: "inherit",
    fontSize:13,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s"
  },
  inputFocus: {
    borderColor: C.primaryColor
  },
  btn: (variant = "primary") => ({
    padding: "10px 20px", borderRadius: 6, border: "none",
    fontFamily: "inherit", fontSize: 13, fontWeight: 600,
    cursor: "pointer", letterSpacing: "0.02em",
    transition: "all 0.15s",
    ...(variant === "primary" ? {
      background: C.primaryColor, color: "#fff",
    } : variant === "danger" ? {
      background: C.dangerColor + "20", color: C.dangerColor,
      border: `1px solid ${C.dangerColor}40`,
    } : {
      background: C.bgElement, color: C.textLabelColor,
      border: `1px solid ${C.borderColor}`,
    }),
  }),
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize:12
  },
  th: {
    padding: "8px 12px",
    textAlign: "left",
    color: C.textLabelColor,
    fontSize:10,
    fontWeight:700,
    //letterSpacing: "0.08em",
    textTransform: "uppercase",
    borderBottom: `1px solid ${C.borderColor}`
  },
  td: {
    padding: "9px 12px",
    borderBottom: `1px solid ${C.borderColor}18`,
    color: C.textColor
  },
  logBox: {
    background: C.bgColor,
    border:`1px solid ${C.borderColor}`,
    borderRadius:8,
    padding:14,
    fontFamily: "inherit",
    fontSize:11,
    lineHeight:1.8,
    maxHeight:220,
    overflowY: "auto",
    color: C.textLabelColor
  },
  stepRow: {
    display: "flex", alignItems: "flex-start", 
    gap:12,
    padding: "10px 0",
    borderBottom: `1px solid ${C.borderColor}18`
  },
  stepNum: {
    width:22, height:22, borderRadius:"50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize:10,
    fontWeight:700,
    flexShrink:0,
    marginTop:2
  },
  pill: (status) => {
    const map={
      CONFIRMED: [C.successColor, "CONFIRMED"],
      PENDING: [C.pendingColor, "PENDING"],
      FAILED: [C.dangerColor, "FAILED"],
      SUCCESS: [C.successColor, "SUCCESS"],
      HIT: [C.warningColor, "IDEMPOTENCY HIT"]
    }
    const [color, label] = map[status]||[C.textLabelColor, status]
    return (
      <span style={{
        padding: "2px 8px", 
        borderRadius:4, 
        background: color+"20", 
        color, 
        fontSize:10,
        fontWeight:700,
        //letterSoacing: "0.06em",
        border: `1px solid ${color}30`
      }}
      >
        {label}
      </span>
    )
  }
}

//setting the initial state
const INITIAL_ORDERS=[];
const INITIAL_PAYMENTS=[];
const INITIAL_IDEMPOTENCY=[];
let orderIdCounter=1;
let paymentIdCounter= 1;

function generateUUID(){
  //gli UUID seguono uno standard (RFC 4122). Il 4 in quella posizione
  //indica che si tratta di un UUID versione 4, cioè generato in modo casuale
  //la y seguente indica che quello non sarà un carattere qualsiasi ma verrà forzato
  //ad essere 8,9,a o b. Questo UUID segue quindi lo standard RFC4122 e non un formato legacy
  //su 128 bit totali, 6 bit sono riservati alla versione e variante, e 122 bit sono casuali 
  //abbastanza da rendere le collisioni praticamente impossibili.
  //nel nostro codice viene usato per generare correlationId e transactionId. 
  //in un sistema reale MuleSoft userebbe una libreria certificata per generare UUID, ma la logica e' identica.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(char)=>{
    // /[xy]/g  questa regex significa: trova tutti i caratteri x oppure y in tutta la stringa (g = global) 
    // senza fermarsi al primo match. per ogni match chiama la funzione.
    const randomChar = (Math.random()*16|0);
    //math.random genera un decimale casuale tra 0 e 1, moltiplicato per 16 diventa un num tra 0 e 15.99
    //l'OR bit (|0) tronca i decimali senza arrotondare, quindi torna un num tra 0 e 15
    //gli UUID usano caratteri esadecimali: 0 1 2 3 4 5 6 7 8 9 a b c d e f, esattamente 16 valori possibili
    return (char === "x"? randomChar : (randomChar & 0x3) | 0x8).toString(16)
    //se x prende il num casuale, 
    //se y applica (r & 0x3) | 0x8 per forzare il risultato a essere solo 8 9 10 o 11 (che in hex sono 8 9 a b)
    //.toString(16) converte il numero in stringa esadecimale: 10 diventa a, 15 diventa f, 7 rimane 7, e così via. 
  })
}

function now(){
  //Tue Feb 17 2026 10:23:45 GMT+0100 -> "2026-02-17T10:23:45.123Z"
  return new Date().toISOString().replace("T", " ").substring(0,19)
  //"2026-02-17 10:23:45.123Z" -> "2026-02-17 10:23:45"
  }

function ttl24h(){
  //date.setHours(date.getHours()+24) non prevede il cambio d'ora legale
  //quindi aggiungendo millisecondi al timestamp si evitano fusi orari/ore legali-solari
  const date = new Date(Date.now()+24 *60 *60 *1000)
  return date.toISOString().replace("T"," ").substring(0,19)
}

function FlowStep({num, label, desc, status, active}) {
  //num=numero dello step, label=titolo dello step, 
  //desc=descrizione tecnica sotto, status=stato corrente dello step
  //active=bool se lo step è in corso o no
  const color =
  status==="ok"? C.successColor :
  status==="error"? C.dangerColor :
  status==="cached"? C.warningColor :
  status==="running"? C.primaryColor :
  C.textMutedColor;
  return (
    //contenitore principale
    <div style={stile.stepRow}>
      {/*cerchietto a sinistra con numero/icona*/}
      <div style={{
        ...stile.stepNum, background: color+"20", color, border: `1px solid ${color}40`
      }}> 
        {status==="running"? "▶" :
        status==="ok"? "✓" :
        status==="error"? "✗" :
        status==="cached"? "⟳" : 
        num}
      </div>
      {/*sexione a destra: label in alto, desc sotto*/}
      <div style={{flex:1}}>
          <div style={{
            color: active? C.textColor : C.textLabelColor,
            fontWeight: active? 600 : 400
          }}>
            {label}
          </div>
          {/*mostra la desc solo se esiste, evita div vuoto*/}
          {desc && <div style={{fontSize:11, color: C.textMutedColor, marginTop:2}}>
                    {desc}
                  </div>}
      </div>
    </div>
  )
}

function StatCard({label, value, color = C.primaryColor, sub}) {
  return (
    <div style={stile.card}>
      <div style={{fontSize:11, color: C.textLabelColor, marginBottom:6}}>
        {label}
      </div>
      <div style={{fontSize:28, fontWeight:700, color, lineHeight:1}}>
        {value}
      </div>
      {sub && 
      <div style={{fontSize:11, color: C.textMutedColor, marginTop:6}}>
        {sub}
      </div>
      }
    </div>
  )
}

export default function App(){

  //interfaccia
  return (
    <div style={stile.root}>
      <style>
        {
          `
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap')
          
          * {
          box-sizing: border-box;
          margin: 0;
          padding:0
          }
          ::-webkit-scrollbar { width: 5px; height: 5px; }
          ::-webkit-scrollbar-track {background: ${C.bgColor}}
          ::-webkit-scrollbar-thumb { background: ${C.borderColor}; border-radius: 3px; }
          @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
          @keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
          .animate { animation: fadeIn 0.3s ease forwards; }
          input:focus { border-color: ${C.primaryColor} !important; }
          button:hover { opacity: 0.85; transform: translateY(-1px); }
          button:active { transform: translateY(0); }
          tr:hover td { background: ${C.bgElement}40; }
          `
        }
      </style>

      <header style={stile.header}>
        <div style={stile.headerLeft}>
          <div style={stile.logo}>
            YR
          </div>
          <div>
            <div style={stile.headerTitle}>
              Payment Orchestration System
            </div>
            <div style={stile.headerSub}>
              Mulesoft Anypoint Platform  - Portfolio Demo
            </div>
          </div>

        </div>
        <div style={
          {
            display: "flex", 
            alignItems: "center",
            gap: 10
          }
        }>
          <span style={stile.badge(C.successColor)}>
            <span style={stile.dot(C.successColor)} /> SIMULATORE ONLINE

          </span>
          <span style={stile.badge(C.textCodeColor)}>
            localhost:8081
          </span>

          <button id="reset" style={
            {
              ...stile.btn("ghost"),
              fontSize:11
            }
          }
          //onClick={reset}
          >
            ↺ Reset
          </button>

        </div>

      </header>

      <main style={stile.main}>

        <div style={{
          ...stile.card,
          marginBottom:20,
          borderColor: C.primaryColor,
          background: `linear-gradient(135deg, ${C.bgCard}, ${C.primaryColor}08)`
        }}>
          
          <div style={{
            display:"flex",
            flexWrap: "wrap",
            gap: 32
          }}>

            <div style={{
              minWidth: 260,
              flex: 1
            }}>

              <div style={{
                fontSize:11,
                color: C.primaryColor,
                fontWeight:700,
                //letterSpacing: "0.1em",
                marginBottom:8
              }}> BUSINESS PROBLEM

              </div>

              <div style={{
                color: C.textLabelColor,
                fontSize: 12,
                lineHeight:1.7
              }}> Processing payments across distributed systems creates risk of 
                <span style={{ color: C.dangerColor }}>double charges</span> , 
                <span style={{ color: C.warningColor }}> inconsistent state</span> and 
                <span style={{ color: C.dangerColor }}> lost transactions</span> on 
                network failure or retry events.
              </div>

            </div>


          </div>
          
        </div>

      </main>

    </div>
  )
}//fine App()