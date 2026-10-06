import { useEffect, useState } from "react";

export default function NotePad() {
  const STORAGE_KEY = "notepad-content_v1";

  //1. Inizializzazione diversa (Lazy State Initialization)
  // Evita letture sincrone continue del disco durante ogni rendering.

  const [text, setText] = useState(() => {
    try {
      const savedText = localStorage.getItem(STORAGE_KEY);
      return savedText !== null ? JSON.parse(savedText) : "";
    } catch (error) {
      console.error(
        "Errore durante il recupero del testo dal local storage:",
        error,
      );
      return "";
    }
  });

  // 2. Stato derivato: NON richiede un useState o un useEffect extra
  const charCount = text.length;

  // 3. Side Effect: Sincronización con localStorage y Document Title
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(text));
    } catch (error) {
      console.error("Errore su localStorage", error);
    }

    // Effetto collaterale sulla scheda del browser
    document.title = `${charCount} caratteri`;
  }, [text, charCount]);

  // 4. Bonus: azione di svuotamento completo
  const handleClear = () => {
    setText("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error al pulire localStorage:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 border-slate-800 rounded-xl shadow-lg text-slate-100">
      <h2 className="text-xl font-bold mb-4 text-emerald-400">
        Blocco Note Persistente
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrivi qui i tuoi appunti..."
        rows={6}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm resize-none"
      />

      <div className="flex items-center justify-between mt-3 text-sm">
        <span className="text-slate-400">Totale caratteri: <strong className="text-emerald-400">{charCount}</strong>
        </span>

        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-1.5 bg-rose-600/20 text-rose-300 border border-rose-600/40 rounded-lg hover:bg-rose-600/30 transition-colors duration-150 text-xs font-semibold"
        >
          Svuota
        </button>
      </div>
    </div>
  );
}







