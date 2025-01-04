import { ICycle } from "./reducer";

export enum EActionTypes {
  CREATE_CYCLE = 'CREATE_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE'
}

export function addNewCycleAction(newCycle: ICycle) {
  return {
    type: EActionTypes.CREATE_CYCLE,
    payload: newCycle
  };
}

export function interruptCycleAction() {
  return {
    type: EActionTypes.INTERRUPT_CYCLE,
  };
}

export function finishCycleAction() {
  return {
    type: EActionTypes.FINISH_CYCLE
  };
}