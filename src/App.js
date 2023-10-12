import { useEffect, useState } from "react";
import moment from 'moment';
import useInterval from 'use-interval';

import { OnePassPoll } from 'OnePass';

const onePassPollTime = 200;    // 200ms
const onePassBgList = [
  '/assets/HillState_bg1.png',
  '/assets/HillState_bg2.png',
  '/assets/HillState_bg3.png',
  '/assets/HillState_bg4.png',
  '/assets/HillState_bg5.png',
  '/assets/HillState_bg6.png',
]

function App() {
  const [isOpen, setOpen] = useState(false);
  const [bgFile, setBgFile] = useState(onePassBgList[0]);

  useEffect(() => {
    const time = moment().format('YYYY-MM-DD hh:mm:ss')
    console.log(`App starting... ${time}`)

  }, []);


  useInterval(async () => {
    let entered = await OnePassPoll()

    if (entered) {
      const index = Math.floor(Math.random() * 100) % onePassBgList.length;
      setBgFile(onePassBgList[index]);
      setTimeout(() => setOpen(true), 500);
      setTimeout(() => setOpen(false), 5000);     
    }
  }, onePassPollTime)

  return (
    <div className="container">
      <div className={isOpen ? "door active" : "door"} id="door1">
        <div className="grid-item-interior">
          <img
            className="inner-background"
            src={bgFile}
            alt="background"
          />
        </div>
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default App;
