// Utilities
import { defineStore } from 'pinia'

export const useFobToAircraftsStore = defineStore('fobToAircrafts', {
  persist: true,
  state: () => ({
    data: [
      {
        id: 'a',
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        missionset: 0,
        aircraftId: 't-aa',
      },
      {
        id: 'b',
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        missionset: 0,
        aircraftId: 't-ab',
      },
      {
        id: 'c',
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        missionset: 1,
        aircraftId: 't-ac',
      },
    ],
  }),
  actions: {
    addData(d) {
      this.data.push({
        ...d,
        id: crypto.randomUUID(),
      });
    },
    modifyData(d) {
      this.data.splice(
        this.data.findIndex((entry) => entry.id === d.id),
        1,
        d,
      );
    },
    removeData(id) {
      this.data = this.data.filter((item) => item.id !== id);
    },
  },
  getters: {
    itemCount: (state) => state.data.length,
    getById: (state) => (id) => state.data.find((fob) => fob.id === id),
    getAll: (state) => state.data,
  },
});
