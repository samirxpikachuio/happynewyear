
export enum Step {
  HOLD = 'HOLD',
  DISTRACTIONS = 'DISTRACTIONS',
  TICKET = 'TICKET',
  MOMENTS = 'MOMENTS',
  GREETING = 'GREETING'
}

export interface CardItem {
  id: string;
  text: string;
  icon: string;
  color: string;
}
