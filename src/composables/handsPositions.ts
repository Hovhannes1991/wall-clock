import { DateTime } from "luxon";
import { reactive } from "vue";
import { Offset, ClockHandPositions } from "@/types/types";

const deg = 6;

const getTime = (offset: Offset) => {
  const utc_time = DateTime.utc();

  let time = {} as DateTime;

  if (offset.hour < 0) {
    const abs_hour = offset.hour * -1;
    time = utc_time.minus({ hour: abs_hour, minute: offset.minute });
  } else {
    time = utc_time.plus({ hour: offset.hour, minute: offset.minute });
  }
  const { hour, minute, second } = time;

  let hh = hour * 30;
  let mm = minute * deg;
  let ss = second * deg;

  return { hh, mm, ss };
};

const getHandsPositions = (offset: Offset): ClockHandPositions => {
  const { hh, mm, ss } = getTime(offset);

  return {
    hour: `rotateZ(${hh + mm / 12}deg)`,
    minute: `rotateZ(${mm}deg)`,
    second: `rotateZ(${ss}deg)`,
  };
};

export default function useHandsPositions(offset: Offset): {
  positions: ClockHandPositions;
  updatePositions: () => void;
} {
  const positions = reactive(getHandsPositions(offset));

  const updatePositions = () => {
    const current_positions = getHandsPositions(offset);
    positions.hour = current_positions.hour;
    positions.minute = current_positions.minute;
    positions.second = current_positions.second;
  };

  return { positions, updatePositions };
}
