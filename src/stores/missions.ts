// Utilities
import { defineStore } from 'pinia'

export const useMissionsStore = defineStore('missions', {
  persist: true,
  state: () => ({
    data: [
      {
        title: 'ergerg',
        subtitle: '',
        difficulty: 'HARD',
        timeslot: 0,
        missionset: 0,
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        id: '4d37abf5-5f89-4a04-b3bb-9cb2bf4a440f',
      },
      {
        title: 'OP Wolf',
        subtitle: 'testing',
        difficulty: 'HARD',
        timeslot: 0,
        missionset: 1,
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        id: '4d37abf5-5f89-4a04-b3bb-9cb2bf4a441f',
      },
      {
        title: 'OP Han',
        subtitle: 'aaaa',
        difficulty: 'HARD',
        timeslot: 1,
        missionset: 0,
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        id: '4d37abf5-5f89-4a04-b3bb-9cb2bf4a441f',
      },
      {
        title: 'OP Han',
        subtitle: 'aaaa',
        difficulty: 'HARD',
        timeslot: 1,
        missionset: 2,
        fobId: '7a98db42-3a89-425d-8984-632196a94bcc',
        id: '4d37abf5-5f89-4a04-b3bb-9cs2bf4a441f',
      },
      {
        title: 'OP Wolf',
        subtitle: 'Ingress',
        difficulty: 'EASY',
        timeslot: 0,
        missionset: 0,
        fobId: 'kaas',
        id: 'a',
      },
      {
        title: 'OP Wolf',
        subtitle: 'Sustain',
        difficulty: 'HARD',
        timeslot: 1,
        missionset: 0,
        fobId: 'kaas',
        id: 'b',
      },
      {
        title: 'OP Wolf',
        subtitle: 'Sustain',
        difficulty: 'MEDIUM',
        timeslot: 2,
        missionset: 0,
        fobId: 'kaas',
        id: 'c',
      },
      {
        title: 'OP Wolf',
        subtitle: 'Egress',
        difficulty: 'MEDIUM',
        timeslot: 3,
        missionset: 0,
        fobId: 'kaas',
        id: 'd',
      },
      {
        title: 'OP Wolf',
        subtitle: 'Sustain',
        difficulty: 'HARD',
        timeslot: 4,
        missionset: 0,
        fobId: 'kaas',
        id: 'e',
      },
      {
        title: 'OP Wolf',
        subtitle: 'Egress',
        difficulty: 'HARD',
        timeslot: 5,
        missionset: 0,
        fobId: 'kaas',
        id: 'f',
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
    getAll: (state) => state.data,
    getMissionsByFobId: (state) => (fId) => state.data.filter((mission) => mission.fobId === fId),
  }
});
