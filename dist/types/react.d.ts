import { MachineDef, ChildStatesDef, SendFn } from '@cxstate/cxstate';
interface CurrentStateBase<TContext> {
    context: Readonly<TContext>;
    matchesOne: (...paths: string[]) => boolean;
    matchesNone: (...paths: string[]) => boolean;
}
export interface CurrentState<TContext> extends CurrentStateBase<TContext> {
    path: string;
}
export interface CurrentParallelState<TContext> extends CurrentStateBase<TContext> {
    paths: string[];
}
interface ParallelMachineDef<TContextIntersection> {
    context: Partial<TContextIntersection>;
    initial: string | ((ctx: any) => string);
    states: ChildStatesDef<any>;
}
export declare function useMachine<TContext>(machineDef: MachineDef<TContext>): [CurrentState<TContext>, SendFn];
/**
 * TContextIntersection is expected to be an intersection type of all contexts: ...&...
 **/
export declare function useMachines<TContextIntersection>(...machineDefs: ParallelMachineDef<TContextIntersection>[]): [CurrentParallelState<TContextIntersection>, SendFn];
export {};
