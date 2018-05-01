// Dependencies
import axios from 'axios';

// Add Authorization object and set bearer to local token for all axios requests
// This allows the auth-check module to check if a user is authenticated prior to executing any API requests
axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.token;

export default {
  // Get list of all missions for a given user by ID
  getMissions: userId => axios.get(`/api/${userId}`),

  // Post new mission to user by ID
  addMission: function(userId, missionData) {
    return axios.post(`/api/${userId}`, { missionData });
  }

  // update mission by ID

  // delete mission by ID
};
