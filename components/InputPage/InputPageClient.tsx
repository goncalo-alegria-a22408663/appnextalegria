"use client";

import { useMemo, useState } from "react";

type Task = {
  id: string;
  text: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function InputPageClient() {
  // 1) input + preview
  const [text, setText] = useState("");

  // 2) selector
  const options = useMemo(
    () => [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "JSON",
      "API RESTful",
      "Swagger",
      "GitHub",
      "Codespaces",
      "GitHub Pages",
      "React.js",
      "Next.js",
      "Vercel",
    ],
    []
  );
  const [selected, setSelected] = useState(options[0]);

  // 3) tarefas
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  function addTask() {
    const trimmed = taskText.trim();
    if (!trimmed) return;

    setTasks((prev) => [{ id: uid(), text: trimmed }, ...prev]);
    setTaskText("");
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function saveEdit() {
    const trimmed = editingText.trim();
    if (!editingId || !trimmed) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, text: trimmed } : t))
    );
    setEditingId(null);
    setEditingText("");
  }

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-slate-100 shadow">
      {/* INPUT */}
      <div className="mb-8">
        <h3 className="mb-3 text-lg font-bold">Input de texto</h3>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreve aqui..."
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
        />

        <p className="mt-3 text-sm text-slate-300">
          Texto digitado:{" "}
          <span className="font-semibold text-slate-100">
            {text || "(vazio)"}
          </span>
        </p>
      </div>

      {/* SELECTOR */}
      <div className="mb-8">
        <h3 className="mb-3 text-lg font-bold">Selector</h3>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <p className="mt-3 text-sm text-slate-300">
          Selecionado:{" "}
          <span className="font-semibold text-emerald-400">{selected}</span>
        </p>
      </div>

      {/* TAREFAS */}
      <div>
        <h3 className="mb-3 text-lg font-bold">Lista de tarefas</h3>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Nova tarefa..."
            className="w-full flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
          />

          <button
            onClick={addTask}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Inserir
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            Ainda não há tarefas.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                {editingId === t.id ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-emerald-400"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold hover:bg-slate-700 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-slate-100">{t.text}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(t)}
                        className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold hover:bg-slate-700 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removeTask(t.id)}
                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-red-400 transition"
                      >
                        Apagar
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
