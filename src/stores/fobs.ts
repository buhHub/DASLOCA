// Utilities
import { defineStore } from 'pinia'

export const useFobsStore = defineStore('fobs', {
  state: () => ({
    data: [
      {
        id: '7a98db42-3a89-425d-8984-632196a94bcc',
        name: 'FOB Havelte',
        startDate: '2022-02-05',
      },
      {
        id: 'kaas',
        name: 'FOB Tarnha',
        startDate: '2026-02-05',
      },
    ],
  }),
  actions: {
    addData(d) {
      this.data.push(d);
    },
    removeData(id) {
      this.data = this.data.filter((item) => item.id !== id);
    },
  },
  getters: {
    itemCount: (state) => state.data.length,
    getById: (state) => (id) => state.data.find((fob) => fob.id === id),
    getAll: (state) => state.data,
    getUpcomingFobs:(state) => state.data.filter((fob) => new Date(fob.startDate) > new Date() ),
    getActiveFobs: (state) => state.data.filter((fob) => new Date(fob.startDate) <= new Date() ),
  },
});
