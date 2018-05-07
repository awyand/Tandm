// Dependencies
import axios from 'axios';

// Add Authorization object and set bearer to local token for all axios requests
// This allows the auth-check module to check if a user is authenticated prior to executing any API requests


export default {

  // Get missions from database by userID
  getMissions: function(userId) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.token;
    return axios.get(`/api/${userId}`);
  },

  // Post new mission to database by userID and missionData object
  addMission: function(userId, missionData) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.token;
    return axios.post(`/api/${userId}`, { missionData });
  },

  // Update mission in database by userID and missionData object
  updateMission: function(userId, missionData) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.token;
    return axios.put(`/api/${userId}`, { missionData });
  },

  // Delete mission from database by userID and missionId
  deleteMission: function(userId, missionId) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.token;
    return axios.delete(`/api/${userId}/${missionId}`);
  }
};
