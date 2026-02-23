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
  //form 
  const [customerId, setCustomerId] = useState("CUST001")
  const [amount, setAmount]= useState("99.99")
  const [idempKey, setIdempKey] = useState("")
  const [focusedField, setFocusedField] = useState(null)
  
  //db
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [payments, setPayments] = useState(INITIAL_PAYMENTS)
  const [idempotency, setIdempotency] = useState(INITIAL_IDEMPOTENCY)

  // statistiche
  const confirmed = orders.filter(o => o.status === "CONFIRMED").length;
  const failed    = orders.filter(o => o.status === "FAILED").length;
  const successRate = orders.length ? Math.round((confirmed / orders.length) * 100) : "--";

  // stato UI 
  const [processing,  setProcessing]  = useState(false);
  const [steps,       setSteps]       = useState([]);
  const [lastResult,  setLastResult]  = useState(null);
  const [logs,        setLogs]        = useState([]);
  const [activeTab,   setActiveTab]   = useState("orders");

  const logRef = useRef(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function runStep(idx, label, desc, status, delay = 600) {
    setSteps(prev => {
      const next = [...prev];
      next[idx] = { label, desc, status: "running", active: true };
      return next;
    });
    await sleep(delay);
    setSteps(prev => {
      const next = [...prev];
      next[idx] = { label, desc, status, active: true };
      return next;
    });
  }

  function addLog(msg, type = "info") {
    const colors = { info: C.textMid, success: C.success, error: C.danger, warn: C.warning, system: C.code };
    setLogs(prev => [...prev, { msg, color: colors[type] || C.textMid, ts: now() }]);
  }

  async function processPayment() {
    if (processing) return;
    const amt = parseFloat(amount);
    if (!customerId.trim() || isNaN(amt) || amt <= 0) {
      addLog("ERROR: invalid input -- customer_id and amount required", "error");
      return;
    }

    setProcessing(true);
    setLastResult(null);
    const key = idempKey.trim() || generateUUID();
    const correlationId = generateUUID();

    // ── STEP DEFINITIONS ──
    const stepDefs = [
      ["Check idempotency",       "SELECT response FROM idempotency_log WHERE key=? AND expires_at > NOW()"],
      ["Create order (PENDING)",  "INSERT INTO orders (customer_id, amount, status, correlation_id)"],
      ["Call payment gateway",    "POST /mock-payment  --  20% random failure rate"],
      ["Write payment record",    "INSERT INTO payments (order_id, transaction_id, amount, method)"],
      ["Update order (CONFIRMED)","UPDATE orders SET status='CONFIRMED' WHERE id=?"],
      ["Save idempotency cache",  "INSERT INTO idempotency_log (key, order_id, response, expires_at)"],
    ];
    setSteps(stepDefs.map(([label, desc]) => ({ label, desc, status: "idle", active: false })));

    addLog(`──────────────────────────────────────`, "system");
    addLog(`[${now()}] NEW REQUEST`, "system");
    addLog(`customer_id: ${customerId}  amount: ${amt}  key: ${key.substring(0,16)}...`, "info");
    addLog(`correlation_id: ${correlationId.substring(0,16)}...`, "info");

    await sleep(300);

    // ── STEP 0: idempotency check ──
    addLog(`[STEP 1] Checking idempotency log...`, "info");
    const cached = idempotency.find(r => r.key === key && new Date(r.expires_at) > new Date());
    await runStep(0, stepDefs[0][0], stepDefs[0][1], cached ? "cached" : "ok", 700);

    if (cached) {
      addLog(`Idempotency HIT: returning cached response`, "warn");
      addLog(`order_id: ${cached.order_id}  (no duplicate created)`, "warn");
      setLastResult({ type: "idempotency", orderId: cached.order_id, key });
      setProcessing(false);
      return;
    }

    addLog(`Idempotency MISS: proceeding with new order`, "info");

    // ── STEP 1: create order PENDING ──
    addLog(`[STEP 2] Writing PENDING order to DB...`, "info");
    const orderId = orderIdCounter++;
    const newOrder = {
      id: orderId, customer_id: customerId, amount: amt,
      status: "PENDING", correlation_id: correlationId,
      created_at: now(), updated_at: now(),
    };
    setOrders(prev => [...prev, newOrder]);
    await runStep(1, stepDefs[1][0], stepDefs[1][1], "ok", 600);
    addLog(`Order #${orderId} created  status=PENDING`, "info");

    // ── STEP 2: call gateway (20% failure) ──
    addLog(`[STEP 3] Calling mock payment gateway...`, "info");
    await runStep(2, stepDefs[2][0], stepDefs[2][1], "running", 900);
    const gatewayFails = Math.random() < 0.2;

    if (gatewayFails) {
      // ── FAILURE PATH: compensation ──
      await runStep(2, stepDefs[2][0], stepDefs[2][1], "error", 200);
      addLog(`Gateway TIMEOUT: APP:PAYMENT_GATEWAY_ERROR`, "error");
      addLog(`[COMPENSATION] Rolling back order #${orderId}...`, "error");

      // skip steps 3,4,5
      setSteps(prev => {
        const next = [...prev];
        next[3] = { ...stepDefs[3], status: "idle", active: false };
        next[4] = { ...stepDefs[4], status: "idle", active: false };
        next[5] = { ...stepDefs[5], status: "idle", active: false };
        return next;
      });

      // compensate order
      setOrders(prev => prev.map(o =>
        o.id === orderId ? { ...o, status: "FAILED", updated_at: now() } : o
      ));

      addLog(`Order #${orderId} -> status=FAILED`, "error");
      addLog(`payments table: NO record inserted (rollback)`, "error");
      addLog(`idempotency_log: NO cache saved (errors not cached)`, "error");
      setLastResult({ type: "failure", orderId, correlationId });
      setProcessing(false);
      return;
    }

    // ── SUCCESS PATH ──
    await runStep(2, stepDefs[2][0], stepDefs[2][1], "ok", 200);
    const transactionId = generateUUID();
    addLog(`Gateway response: 200 OK  tx_id: ${transactionId.substring(0,12)}...`, "success");

    // ── STEP 3: write payment ──
    addLog(`[STEP 4] Inserting payment record...`, "info");
    const newPayment = {
      id: paymentIdCounter++, order_id: orderId,
      transaction_id: transactionId, amount: amt,
      method: "CREDIT_CARD", status: "SUCCESS", created_at: now(),
    };
    setPayments(prev => [...prev, newPayment]);
    await runStep(3, stepDefs[3][0], stepDefs[3][1], "ok", 500);
    addLog(`Payment record created  order_id=${orderId}  status=SUCCESS`, "success");

    // ── STEP 4: confirm order ──
    addLog(`[STEP 5] Updating order status to CONFIRMED...`, "info");
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: "CONFIRMED", updated_at: now() } : o
    ));
    await runStep(4, stepDefs[4][0], stepDefs[4][1], "ok", 500);
    addLog(`Order #${orderId} -> status=CONFIRMED`, "success");

    // ── STEP 5: save idempotency ──
    addLog(`[STEP 6] Caching response in idempotency_log (24h TTL)...`, "info");
    const respPayload = JSON.stringify({ status: "success", order_id: orderId, amount: amt });
    setIdempotency(prev => [...prev, {
      key, order_id: orderId, response: respPayload, expires_at: ttl24h()
    }]);
    await runStep(5, stepDefs[5][0], stepDefs[5][1], "ok", 400);
    addLog(`Idempotency key cached  expires_at: ${ttl24h()}`, "success");
    addLog(`[COMPLETE] order_id=${orderId}  correlation_id=${correlationId.substring(0,12)}...`, "success");

    setLastResult({ type: "success", orderId, transactionId, amount: amt, correlationId });
    setProcessing(false);
  }

    function testIdempotency() {
    if (!lastResult || lastResult.type === "idempotency") return;
    const entry = idempotency.find(r => r.order_id === lastResult.orderId);
    if (entry) setIdempKey(entry.key);
    addLog(`Re-using same idempotency key: ${entry?.key?.substring(0,16)}...`, "warn");
    addLog(`Next request will HIT the cache -- no duplicate processing`, "warn");
  }

  function reset() {
    setOrders([]); setPayments([]); setIdempotency([]);
    setSteps([]); setLastResult(null); setLogs([]);
    setIdempKey(""); orderIdCounter = 1; paymentIdCounter = 1;
    addLog("System reset -- all tables cleared", "system");
  }

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

          <button id="reset" onClick={reset}
          style={
            {
              ...stile.btn("ghost"),
              fontSize:11
            }
          }
          >
            ↺ Reset
          </button>

        </div>

      </header>

      <main style={stile.main}>

        {/* DESCRIPTION PANEL*/}

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
                <span style={{ color: C.dangerColor }}> double charges</span>, 
                <span style={{ color: C.warningColor }}> inconsistent state</span> and 
                <span style={{ color: C.dangerColor }}> lost transactions</span> on 
                network failure or retry events.
              </div>

            </div>

            <div style={{flex: 1, minWidth:260}}>
              <div style={{
                fontSize:11,
                color: C.successColor, 
                fontWeight:700,
                //letterSpacing:"0.1em",
                marginBottom:8
              }}>SOLUTION: 3 PATTERNS

              </div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap:5
              }}>
                {
                  [
                    ["Compensation (Saga):", "Auto-rollback on partial failure. No orphaned PENDING orders."],
                    ["Idempotency:", "Safe retries via key caching (24h TTL). No duplicate charges."],
                    ["Correlation IDs:", "UUID propagated across all systems. Full traceability."]

                  ].map(([k,v])=>(
                    <div key={k} style={{fontSize:12}}>
                      <span style={{color: C.textCodeColor}}>{k}</span>
                      <span style={{ color: C.textMutedColor}}> {v}</span>
                    </div>
                  ))
                }

              </div>

            </div>


          </div>
          
        </div>

        {/*STATS PANEL*/}
        <div style={{ ...stile.grid3, marginBottom:20}}>
          <StatCard label="Total orders" value={orders.length} color={C.primaryColor} sub="ORDERS table" />
          <StatCard label="Confirmed" value={confirmed} color={C.successColor} sub="Payments recorded" />
          <StatCard label="Success Rate" value={successRate === "--" ? "--" : successRate + "%"} 
          color={successRate >=70? C.successColor : C.dangerColor} sub="Gateway ~80% success" />
        </div>


        <div style={stile.grid2}>

          {/* POST ORDERS PANEL/FORM */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>

            <div style={stile.cardAccent}>
              <div style={stile.sectionLabel}>
                <span style={{color: C.primaryColor}}>▶ </span>
                POST /orders

              </div>
              <div style={{
                display:"flex",
                flexDirection: "column",
                gap:12
              }}>
                <div>
                  <label style={stile.label}>customer_id</label>
                  <input style={{...stile.input, ...(focusedField === "cid"? stile.inputFocus : {})}}
                          value={customerId} placeholder="CUST001"
                          onChange={ elem => setCustomerId(elem.target.value)}
                          onFocus={()=> setFocusedField("cid")}
                          onBlur={()=> setFocusedField(null)}                  
                  />
                </div>
                <div>
                  <label style={stile.label}>amount (EUR)</label>
                  <input style={{...stile.input, ...(focusedField === "amt"? stile.inputFocus : {})}}
                          value={amount} placeholder="99.99" type="number" min="0.01" step="0.01"
                          onChange={ elem => setAmount(elem.target.value)}
                          onFocus={()=> setFocusedField("amt")}
                          onBlur={()=> setFocusedField(null)}                  
                  />
                </div>
                <div>
                  <label style={stile.label}>idempotency key 
                    <span style={{color: C.textMutedColor, marginLeft:8}}> 
                      (leave empty to auto-generate)
                    </span>
                  </label>
                  <input style={{...stile.input, ...(focusedField === "key"? stile.inputFocus : {})}}
                          value={idempKey} placeholder="unique-key-001 or leave blank"
                          onChange={ elem => setIdempKey(elem.target.value)}
                          onFocus={()=> setFocusedField("key")}
                          onBlur={()=> setFocusedField(null)}                  
                  />
                </div>

                <div style={{
                  display:"flex",
                  gap:8,
                  marginTop:4
                }}>
                  <button onClick={processPayment} disabled={processing}

                  
                  style={{
                    ...stile.btn("primary"),
                    flex:1,
                    opacity: processing? 0.6 : 1
                  }}>

                    {processing? "Processing...": "▶  Process Payment"}

                  </button>
                  <button style={{ ...stile.btn("ghost"), fontSize:11,
                    opacity: (!lastResult || lastResult.type !== "success") ? 0.4 : 1
                  }}
                  onClick={testIdempotency}
                  disabled={!lastResult || lastResult.type !== "success"}
                  title="Re-use last successful key to test idempotency"
                  >
                    ⟳ Re-use Key
                  </button>

                </div>

                <div style={{
                  fontSize: 11,
                  color: C.textMutedColor,
                  paddingTop:4,
                  borderTop: `1px solid ${C.borderColor}`
                }}>
                  Mock Gateway: 
                  <span style={{color: C.successColor}}>
                    {' 80% success'}
                  </span> {' / '} 
                  <span style={{color: C.dangerColor}}>
                    20% failure
                  </span>
                    {' triggers compensation pattern.'}

                </div>

              </div>

            </div>

            {/* STEPS */}
            {
              steps.length > 0 && (
                <div style={stile.card} className="animate">
                  <div style={stile.sectionLabel}>
                    <span style={{color: C.primaryColor}}>
                      ⬡
                    </span> Orchestration Flow

                  </div>

                  {
                    steps.map(
                      (step, index) => (
                        <FlowStep key={index} num={index+1} label={stile.label}
                        desc={stile.desc} status={stile.status} active={stile.active} />
                      )
                    )
                  }

                </div>
              )
            }

            {/* Last result */}
            {lastResult && (
              <div style={{
                ...stile.card, 
                className: "animate",
                borderColor: lastResult.type === "success"? C.successColor :
                lastResult.type === "idempotency"? C.warningColor :
                C.dangerColor
              }}>
                <div style={stile.sectionLabel}>
                  {lastResult.type === "success"? "✓ Response 200" :
                  lastResult.type === "failure" ? "✗ Response 500" : 
                  "⟳ Response 200 (cached)"
                  }

                </div>

                <pre style={{
                  background: C.bgColor,
                  padding: 12,
                  borderRadius: 6,
                  fontSize:11,
                  color: C.textCodeColor,
                  overflowX: "auto",
                  lineHeight: 1.7
                  }}>

                    {
                      lastResult.type === "success" ? `{
                      "status": "success",
                      "order_id": ${lastResult.orderId},
                      "correlation_id": "${lastResult.correlationId?.substring(0,16)} ...",
                      "amount": ${lastResult.amount},
                      "timestamp": "${now()}"
                      }` : lastResult.type === "failure" ? 
                      `{
                        "status": "failed",
                        "order_id": ${lastResult.orderId},
                        "errorInfo": {
                          "errorType": "APP:PAYMENT_GATEWAY_ERROR",
                          "description": "Payment gateway timeout simulation"
                        }
                      }` : `{
                            "status": "success",
                            "order_id": ${lastResult.orderId},
                            "note": "Idempotency hit. cached response returned",
                            "key": "${lastResult.key?.substring(0,20)}..."
                          }`
                    }
                
                </pre>

              </div>
            )}

          </div>

          {/*PANEL DI DESTRA LOG */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap:16
          }}> {/*console log */}

          <div style={stile.card}>
            <div style={StatCard.sectionLabel}>
              <span style={{color: C.textCodeColor}}> $
              </span> Console Log

            </div>
            <div style={stile.logBox} ref={logRef}>
              {
                logs.length === 0 ? 
                <span style={{color: C.textMutedColor}}>
                  - - - awaiting request - - -
                </span> 
                : logs.map((log, index)=> (
                  <div style={{color: log.color}} key={index}>
                    {log.msg}
                  </div>
                ))
              }

            </div>

          </div>

          {/*DB table */}
          <div style={stile.card}>
            <div style={{
              display:"flex",
              gap: 0,
              marginBottom: 16,
              borderBottom:`1px solid ${C.borderColor}`
            }}>

              {[
                ["orders", `ORDERS (${orders.length})`],
                ["payments", `PAYMENTS (${payments.length})`],
                ["idempotency", `IDEMPOTENCY_LOG (${idempotency.length})`]
              ].map(([id,label])=> (
                <button key={id} 
                onClick={()=> setActiveTab(id)}
                style={{
                  padding: "8px 14px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === id? `2px slid ${C.primaryColor}` :
                  "2px solid transparent",
                  color: activeTab === id? C.primaryColor : C.textLabelColor,
                  fontFamily: "inherit",
                  fontSize:11,
                  fontWeight:600,
                  cursor:"pointer",
                  marginBottom:-1,
                  transition:"color 0.15s"
                }}>
                  {label}
                </button>
              ))
              }

            </div>

            {/*orders table */}
            {
              activeTab === "orders" && (
                <div style={{overflowX: "auto"}}>

                  {
                    orders.length === 0? <div style={{
                      color: C.textMutedColor,
                      fontSize:12,
                      padding: "12px 0"
                    }}> No records </div> :
                    <table style={stile.table}>
                      <thead>
                        <tr>
                          {
                            ["id", "customer_id", "amount", "status", "correlation_id", "created_at"].map(
                              columnName => (
                                <th key={columnName} style={stile.th}>
                                  {columnName}
                                </th>
                              )
                            )
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orders.map(
                            order=> (
                              <tr key={order.id}>
                                <td style={stile.td}>{order.id}</td>
                                <td style={stile.td}>{order.customer_id}</td>
                                <td style={stile.td}>€{order.amount.toFixed(2)}</td>
                                <td style={stile.td}>{stile.pill(order.status)}</td>
                                <td style={{...stile.td, color: C.textMutedColor}}>
                                  {order.correlation_id.substring(0,10)} ...
                                </td>
                                <td style={{...stile.td, color: C.textMutedColor}}> 
                                  {order.created_at}
                                </td>

                              </tr>
                            )
                          )
                        }
                      </tbody>

                    </table>
                  }

                  <div style={{
                    fontSize:11,
                    color: C.textMutedColor,
                    marginTop:10
                  }}>
                    Pending status is transient, always resolve to CONFIRMED or FAILED.

                  </div>

                </div>
              )
            }

            {/*payments table */}
            {
              activeTab === "payments" && (
                <div style={{overflowX: "auto"}}>
                  {
                    payments.length === 0 ? <div style={{
                      color: C.textMutedColor,
                      fontSize:12,
                      padding:"12px 0"
                    }}>
                        No payments recorded: only created on gateway success
                    </div>
                    : 
                    <table style={stile.table}>
                      <thead>
                        <tr>
                          {
                            ["id", "order_id", "amount", "method", "status", "created_at"].map(
                              header => (
                                <th key={header} style={stile.th}>{header}</th>
                              )
                            )
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          payments.map(payment=>(
                            <tr key={payment.id}>
                              <td style={stile.td}>{payment.id}</td>
                              <td style={stile.td}>{payment.order_id}</td>
                              <td style={stile.td}>€{payment.amount.toFixed(2)}</td>
                              <td style={{...stile.td, color: C.code}}>{payment.method}</td>
                              <td style={stile.td}>{stile.pill(payment.status)}</td>
                              <td style={{...stile.td, color: C.textMutedColor}}>{payment.created_at}</td>

                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  }

                  <div style={{fontSize:11, color: C.textMutedColor, marginTop:10}}>
                  If order #{"{id}"} has no payment here, compensation was applied
                  </div>

                </div>
              )
            }

          </div>

          </div>



        </div>



      </main>

    </div>
  )
}//fine App()