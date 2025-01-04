import { EActionTypes } from "./actions";
import { produce } from "immer"

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface ICyclesState {
  cycles: ICycle[];
  activeCycleId: string | null
}

export function cyclesReducers(state: ICyclesState, action: any) {
  switch (action.type) {
    case EActionTypes.CREATE_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case EActionTypes.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case EActionTypes.FINISH_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}