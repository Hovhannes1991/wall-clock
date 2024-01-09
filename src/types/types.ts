export type Timeout = ReturnType<typeof setTimeout>;

export type ClockType = "arabic" | "roman";

type TimeItemsPosition = {
  rotate: string;
};

export type TimeItemsPositions = TimeItemsPosition[];

interface LinePositionsClasses {
  class_name: string;
  style: { rotate: string };
}
export type LinesPositionsClasses = LinePositionsClasses[];
