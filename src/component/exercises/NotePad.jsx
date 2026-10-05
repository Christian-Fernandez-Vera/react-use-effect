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
    } catch {
      console.error("Error al pulire localStorage:", error);
    }
  };

  return (
    <div className="max-w-cl mx-auto p-6 bg-slate-900 border-slate-800 rounded-xl shadow-lg text-slate-100">
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
    </div>
  );
}
