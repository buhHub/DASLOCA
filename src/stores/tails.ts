// Utilities
import { defineStore } from 'pinia'
import { systems } from '../consts/weapons';

function mapTypeToWeapon(tail) {
  return {
    ...tail,
    ...systems[tail.type] ?? {},
  };
};

export const useTailsStore = defineStore('tails', {
  persist: true,
  state: () => ({
    data: [
      { id: 'D-472', type: 1 },
      { id: 'D-473', type: 1 },
      { id: 'D-479', type: 1 },
      { id: 'D-480', type: 1 },
      { id: 'D-481', type: 1 },
      { id: 'D-482', type: 1 },
      { id: 'D-483', type: 1 },
      { id: 'D-484', type: 1 },
      { id: 'D-485', type: 1 },
      { id: 'D-601', type: 1 },
      { id: 'D-602', type: 1 },
      { id: 'D-603', type: 1 },
      { id: 'D-604', type: 1 },
      { id: 'D-605', type: 1 },
      { id: 'D-606', type: 1 },
      { id: 'S-419', type: 2 },
      { id: 'S-440', type: 2 },
      { id: 'S-441', type: 2 },
      { id: 'S-442', type: 2 },
      { id: 'S-444', type: 2 },
      { id: 'S-445', type: 2 },
      { id: 'S-447', type: 2 },
      { id: 'S-450', type: 2 },
      { id: 'S-453', type: 2 },
      { id: 'S-454', type: 2 },
      { id: 'S-455', type: 2 },
      { id: 'S-456', type: 2 },
      { id: 'S-457', type: 2 },
      { id: 'S-458', type: 2 },
      { id: 'S-459', type: 2 },
      { id: 'Q-37', type: 3 },
      { id: 'Q-38', type: 3 },
      { id: 'Q-39', type: 3 },
      { id: 'Q-40', type: 3 },
      { id: 'Q-41', type: 3 },
      { id: 'Q-42', type: 3 },
      { id: 'Q-43', type: 3 },
      { id: 'Q-44', type: 3 },
      { id: 'Q-45', type: 3 },
      { id: 'Q-46', type: 3 },
      { id: 'Q-47', type: 3 },
      { id: 'Q-48', type: 3 },
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
    getById: (state) => (id) => mapTypeToWeapon(state.data.find((tail) => tail.id === id)),
    getAll: (state) => state.data.map(mapTypeToWeapon),
  },
});
