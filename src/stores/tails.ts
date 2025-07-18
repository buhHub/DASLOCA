// Utilities
import { defineStore } from 'pinia'
import { systems } from '../consts/weapons';

function mapTypeToWeapon(aircraft: any) {
  if (!aircraft) return aircraft;
  return {
    ...aircraft,
    ...systems[aircraft.type] ?? {},
  };
};

export const useTailsStore = defineStore('tails', {
  persist: true,
  state: () => ({
    data: [
      { id: 't-aa', tail: 'D-472', type: 1, wear: 6 },
      { id: 't-ab', tail: 'D-473', type: 1, wear: 3 },
      { id: 't-ac', tail: 'D-479', type: 1, wear: 1 },
      { id: 't-ad', tail: 'D-480', type: 1, wear: 19 },
      { id: 't-ae', tail: 'D-481', type: 1, wear: 12 },
      { id: 't-af', tail: 'D-482', type: 1, wear: 4 },
      { id: 't-ag', tail: 'D-483', type: 1, wear: 6 },
      { id: 't-ah', tail: 'D-484', type: 1, wear: 3 },
      { id: 't-ai', tail: 'D-485', type: 1, wear: 54 },
      { id: 't-aj', tail: 'D-601', type: 1, wear: 2 },
      { id: 't-ak', tail: 'D-602', type: 1, wear: 0 },
      { id: 't-al', tail: 'D-603', type: 1, wear: 10 },
      { id: 't-am', tail: 'D-604', type: 1, wear: 12 },
      { id: 't-an', tail: 'D-605', type: 1, wear: 23 },
      { id: 't-ao', tail: 'D-606', type: 1, wear: 1 },
      { id: 't-ap', tail: 'S-419', type: 2, wear: 4 },
      { id: 't-aq', tail: 'S-440', type: 2, wear: 28 },
      { id: 't-ar', tail: 'S-441', type: 2, wear: 34 },
      { id: 't-as', tail: 'S-442', type: 2, wear: 17 },
      { id: 't-at', tail: 'S-444', type: 2, wear: 17 },
      { id: 't-au', tail: 'S-445', type: 2, wear: 3 },
      { id: 't-av', tail: 'S-447', type: 2, wear: 9 },
      { id: 't-aw', tail: 'S-450', type: 2, wear: 14 },
      { id: 't-ax', tail: 'S-453', type: 2, wear: 20 },
      { id: 't-ay', tail: 'S-454', type: 2, wear: 20 },
      { id: 't-az', tail: 'S-455', type: 2, wear: 1 },
      { id: 't-ba', tail: 'S-456', type: 2, wear: 8 },
      { id: 't-bb', tail: 'S-457', type: 2, wear: 3 },
      { id: 't-bc', tail: 'S-458', type: 2, wear: 5 },
      { id: 't-bd', tail: 'S-459', type: 2, wear: 1 },
      { id: 't-be', tail: 'Q-37', type: 3, wear: 10 },
      { id: 't-bf', tail: 'Q-38', type: 3, wear: 9 },
      { id: 't-bg', tail: 'Q-39', type: 3, wear: 12 },
      { id: 't-bh', tail: 'Q-40', type: 3, wear: 1 },
      { id: 't-bj', tail: 'Q-41', type: 3, wear: 16 },
      { id: 't-bi', tail: 'Q-42', type: 3, wear: 12 },
      { id: 't-bk', tail: 'Q-43', type: 3, wear: 23 },
      { id: 't-bl', tail: 'Q-44', type: 3, wear: 40 },
      { id: 't-bm', tail: 'Q-45', type: 3, wear: 12 },
      { id: 't-bn', tail: 'Q-46', type: 3, wear: 1 },
      { id: 't-bo', tail: 'Q-47', type: 3, wear: 4 },
      { id: 't-bp', tail: 'Q-48', type: 3, wear: 3 },
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
    getById: (state) => (id) => mapTypeToWeapon(state.data.find((aircraft) => aircraft.id === id)),
    getByTail: (state) => (tail) => mapTypeToWeapon(state.data.find((aircraft) => aircraft.tail === tail)),
    getAll: (state) => state.data.map(mapTypeToWeapon),
  },
});
