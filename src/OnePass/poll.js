import OnePassAPI from './api';
import moment from "moment";

// const onePassURL = process.env.REACT_APP_ONEPASS_URL
const API = new OnePassAPI('');

let lastAccessUser = { 'time': '', 'mac': '' };     // initial

export const OnePassPoll = async () => {
  const path = '/logs/accesses';
  const building = '101';

  let now = moment();
  let from = moment(now).subtract({ minutes: 1 });
  let to = moment(now).add({ minutes: 30 })
  let begin = from.format('YYYY-MM-DD HH:mm:ss');
  let end = to.format('YYYY-MM-DD HH:mm:ss');

  console.log(`get: ${begin} ~ ${end}`);

  let rsp = await API.GetLogData(path, building, begin, end);

  if (rsp instanceof Error) {
    return false;
  }

  if (rsp.length === 0) {
    return false;
  }

  // 가장 최근 시간을 맨 위로...
  rsp.sort((a, b) => {
    return (a.time < b.time) ? 1 : -1;
  });

  const lastUser = rsp[0];

  console.log(`last user: ${lastUser.mac}, ${lastUser.time}`)

  if (lastAccessUser.time !== lastUser.time || lastAccessUser.mac !== lastUser.mac) {
    lastAccessUser = lastUser;      // update
    return true;
  } else {
    return false;
  }
};

