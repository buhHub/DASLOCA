// Utilities
import { defineStore } from 'pinia'
import { systems } from '../consts/weapons';

function mapTypeToWeapon(aircraft) {
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
      { id: 't-aa', tail: 'D-472', type: 1 },
      { id: 't-ab', tail: 'D-473', type: 1 },
      { id: 't-ac', tail: 'D-479', type: 1 },
      { id: 't-ad', tail: 'D-480', type: 1 },
      { id: 't-ae', tail: 'D-481', type: 1 },
      { id: 't-af', tail: 'D-482', type: 1 },
      { id: 't-ag', tail: 'D-483', type: 1 },
      { id: 't-ah', tail: 'D-484', type: 1 },
      { id: 't-ai', tail: 'D-485', type: 1 },
      { id: 't-aj', tail: 'D-601', type: 1 },
      { id: 't-ak', tail: 'D-602', type: 1 },
      { id: 't-al', tail: 'D-603', type: 1 },
      { id: 't-am', tail: 'D-604', type: 1 },
      { id: 't-an', tail: 'D-605', type: 1 },
      { id: 't-ao', tail: 'D-606', type: 1 },
      { id: 't-ap', tail: 'S-419', type: 2 },
      { id: 't-aq', tail: 'S-440', type: 2 },
      { id: 't-ar', tail: 'S-441', type: 2 },
      { id: 't-as', tail: 'S-442', type: 2 },
      { id: 't-at', tail: 'S-444', type: 2 },
      { id: 't-au', tail: 'S-445', type: 2 },
      { id: 't-av', tail: 'S-447', type: 2 },
      { id: 't-aw', tail: 'S-450', type: 2 },
      { id: 't-ax', tail: 'S-453', type: 2 },
      { id: 't-ay', tail: 'S-454', type: 2 },
      { id: 't-az', tail: 'S-455', type: 2 },
      { id: 't-ba', tail: 'S-456', type: 2 },
      { id: 't-bb', tail: 'S-457', type: 2 },
      { id: 't-bc', tail: 'S-458', type: 2 },
      { id: 't-bd', tail: 'S-459', type: 2 },
      { id: 't-be', tail: 'Q-37', type: 3 },
      { id: 't-bf', tail: 'Q-38', type: 3 },
      { id: 't-bg', tail: 'Q-39', type: 3 },
      { id: 't-bh', tail: 'Q-40', type: 3 },
      { id: 't-bj', tail: 'Q-41', type: 3 },
      { id: 't-bi', tail: 'Q-42', type: 3 },
      { id: 't-bk', tail: 'Q-43', type: 3 },
      { id: 't-bl', tail: 'Q-44', type: 3 },
      { id: 't-bm', tail: 'Q-45', type: 3 },
      { id: 't-bn', tail: 'Q-46', type: 3 },
      { id: 't-bo', tail: 'Q-47', type: 3 },
      { id: 't-bp', tail: 'Q-48', type: 3 },
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
