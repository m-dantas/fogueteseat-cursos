import { createContext, useEffect, useReducer, useState } from "react";
import { ICycle, cyclesReducers } from "../reducers/cycles/reducer";
import { addNewCycleAction, finishCycleAction, interruptCycleAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  cycles: ICycle[];
  activeCycle: ICycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface ICycleContextProviderProps {
  children: React.ReactNode;
}

export const CyclesContext = createContext({} as ICyclesContext)

// useReducer -> 
// --> Params -> state: valor atual da variavel, action: qual ação o usuário deseja fazer

export function CyclesContextProvider({ children }: ICycleContextProviderProps) {
  
  const [cyclesState, dispatchCycles] = useReducer(
    cyclesReducers, 
    { cycles: [], activeCycleId: null },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem('@ignite-time:cycles-state-1.0.0')
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    }
  )

  const { cycles, activeCycleId } = cyclesState  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })
  

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-time:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])


  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  } 

  function markCurrentCycleAsFinished() {
    dispatchCycles(finishCycleAction())
  }

  function createNewCycle(data: ICreateCycleData): void {
    const newCycle: ICycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    dispatchCycles(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle(): void {
    dispatchCycles(interruptCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{ 
        cycles,
        activeCycle, 
        activeCycleId, 
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}