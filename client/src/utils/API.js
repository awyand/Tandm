import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.token;

export default {


  // get list of all missions for user

  // post new mission to user
  addMission: function(userId, missionData) {
    return axios.post(`/api/${userId}`, { missionData });
  }

  // update mission by ID

  // delete mission by ID
};
