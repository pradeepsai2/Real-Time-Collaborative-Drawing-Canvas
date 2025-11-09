export type DrawEvent = {
  userId: string;
  x: number;
  y: number;
  color: string;
  size: number;
  tool: string;
};

const history: DrawEvent[] = [];

export function addDrawEvent(event: DrawEvent) {
  history.push(event);
}

export function getHistory() {
  return history;
}
