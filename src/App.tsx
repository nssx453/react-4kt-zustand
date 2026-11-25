import { useEffect } from "react";
import { useDogsStore } from "./store/useDogStore";

export default function App() {
  const { state, loadDogs } = useDogsStore();

  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  switch (state.status) {
    case "idle":
    case "loading":
      return (
        <div className="p-10 text-center text-xl text-gray-500">
          идет загрузка...
        </div>
      );

    case "error":
      return (
        <div className="p-10 text-center text-red-500">
          при выполнении запроса произошла ошибка:
          <p className="font-bold my-2">{state.error}</p>
          <button
            onClick={loadDogs}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      );

    case "success":
      return (
        <div className="p-8 max-w-5xl mx-auto font-sans">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Породы собак</h1>

            <button
              onClick={loadDogs}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Обновить
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.dogs.map((dog) => (
              <div
                key={dog.id}
                className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white"
              >
                <img
                  src={dog.imageUrl}
                  alt={dog.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <p className="text-xs text-indigo-500 font-bold mb-1">
                    ID: {dog.id}
                  </p>
                  <h2 className="text-xl font-semibold mb-2 text-slate-900">
                    {dog.name}
                  </h2>
                  <p className="text-slate-600 text-sm">{dog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
}