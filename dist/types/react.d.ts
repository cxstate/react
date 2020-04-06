import { MachineDef, SendFn, CurrentMachineState } from '@cxstate/cxstate';
export declare function useMachine<ContextType>(machineDef: MachineDef<ContextType>): [CurrentMachineState<ContextType>, SendFn];
