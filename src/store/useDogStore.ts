import { create } from "zustand";
import type { Dog } from "../types";
import { api } from "../api/client";

interface DogStore {
    id: number;
    name: string;
    description: string;
    image_url: string;
}

export type DogsState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "success"; dogs: Dog[] };

interface DogsStore {
    state: DogsState;
    loadDogs: () => Promise<void>;
}

export const useDogsStore = create<DogsStore>((set) => ({
    state: { status: "idle" },

    loadDogs: async () => {
        set({ state: { status: "loading" } });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const response = await api.get<DogStore[]>("/dogs");

            const dogs: Dog[] = response.data.map((dog) => ({
                id: dog.id,
                name: dog.name,
                description: dog.description,
                imageUrl: dog.image_url,
            }));

            set({ state: { status: "success", dogs } });
        } catch (err: unknown) {
            const message =
                (err as any)?.response?.data?.detail ??
                (err as Error)?.message ??
                "Ошибка загрузки";

            set({ state: { status: "error", error: message } });
        }
    },
}));