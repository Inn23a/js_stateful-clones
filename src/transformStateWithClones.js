'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateVersion = { ...state };
  const allStates = [];

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(stateVersion, act.extraData);
      allStates.push({ ...stateVersion });
    }

    if (act.type === 'removeProperties') {
      for (const key of act.keysToRemove) {
        delete stateVersion[key];
      }
      allStates.push({ ...stateVersion });
    }

    if (act.type === 'clear') {
      Object.keys(stateVersion).forEach((key) => {
        delete stateVersion[key];
      });
      allStates.push({});
    }
  }

  return allStates;
}

module.exports = transformStateWithClones;
