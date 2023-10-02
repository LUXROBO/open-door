
import axios from 'axios';

const ApiTimeoutDefault = 10 * 1000;

class OnePassAPI {
  constructor(baseURL) {
    let api = axios.create({
      baseURL: baseURL,
      timeout: ApiTimeoutDefault,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api = api;
  }

  GetLogData = async (path, building, begin, end) => {
    try {
      var res = await this.api.get(path, {
        params: { building: building, begin: begin, end: end },
      })
      const data = res.data;
      let accessLog = []

      for (let element of data.data) {
        let onePass = element.onepass;

        onePass.forEach((logData) => {
          let accesses = logData.accesses;
          accesses.forEach((log) => {
            accessLog.push(log)
          });
        });
      }

      return accessLog;
    } catch (err) {
      return err;
    }
  }
}




export default OnePassAPI;