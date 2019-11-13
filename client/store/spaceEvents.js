import HTTP from '../http';

export const state = () => ({
  spaceEvents: [],
  newSpaceEventName: '',
  newSpaceEventDescription: '',
  newSpaceEventStart: new Date().toISOString().substr(0, 10),
});

export const actions = {
  createSpaceEvent({ commit, state }) {
    return HTTP().post('/space-events', {
      name: state.newSpaceEventName,
      description: state.newSpaceEventDescription,
      start: state.newSpaceEventStart,
    })
      .then(({ data }) => {
        commit('appendSpaceEvent', data);
        commit('newSpaceEventName', null);
        commit('newSpaceEventDescription', null);
        commit('newSpaceEventStart', new Date().toISOString().substr(0, 10));
      })
      .catch((error) => {
        commit('appendSpaceEvent', `Create event error: ${error}`);
      });
  },
  fetchSpaceEvents ({ commit }) {
    return HTTP().get('/space-events')
      .then(({ data }) => {
        console.log(data);
        commit('setSpaceEvents', data);
      })
      .catch((error) => {
        commit('setSpaceEvents', `Set event error: ${error}`);
      });
  },
};

export const mutations = {
  setNewSpaceEventName (state, name) {
    state.newSpaceEventName = name;
  },
  setNewSpaceEventDescription (state, description) {
    state.newSpaceEventDescription = description;
  },
  setNewSpaceEventStart (state, start) {
    state.newSpaceEventStart = start;
  },
  appendSpaceEvent (state, spaceEvent) {
    state.spaceEvents.push(spaceEvent);
  },
  setSpaceEvents (state, spaceEvents) {
    state.spaceEvents = spaceEvents;
  },
};
