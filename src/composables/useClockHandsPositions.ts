import { reactive } from "vue";

interface ClockHandPositions {
  hour: string;
  minute: string;
  second: string;
}

const deg = 6;

const getTime = () => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * deg;
  let ss = day.getSeconds() * deg;

  return { hh, mm, ss };
};

const getHandsPositions = (): ClockHandPositions => {
  const { hh, mm, ss } = getTime();
  return {
    hour: `rotateZ(${hh + mm / 12}deg)`,
    minute: `rotateZ(${mm}deg)`,
    second: `rotateZ(${ss}deg)`,
  };
};

export default function useClockHandsPositions(): ClockHandPositions {
  let positions = reactive<ClockHandPositions>(getHandsPositions());

  const current_positions = getHandsPositions();
  positions = reactive(current_positions);

  return positions;
}
