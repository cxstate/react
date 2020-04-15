import { useEffect, useState } from 'react'
import {
  MachineDef,
  Service,
  ParallelService,
  ChildStatesDef,
  SendFn,
  interpret,
  parallelize
} from '@cxstate/cxstate'

interface HookStateBase<TContext> {
  context: Readonly<TContext>
}

interface HookState<TContext> extends HookStateBase<TContext> {
  path: string
}

/**
 * A parallel services in in several states at the same time
 **/
interface ParallelHookState<TContext> extends HookStateBase<TContext> {
  paths: string[]
}

interface CurrentStateBase<TContext> {
  context: Readonly<TContext>
  matchesOne: (...paths: string[]) => boolean
  matchesNone: (...paths: string[]) => boolean
}

export interface CurrentState<TContext> extends CurrentStateBase<TContext> {
  path: string
}

export interface CurrentParallelState<TContext> extends CurrentStateBase<TContext> {
  paths: string[]
}

// Due to TS being incapable to properly digest intersection type in combination with partial:
interface ParallelMachineDef<TContextIntersection> {
  context: Partial<TContextIntersection>
  initial: string | ((ctx: any) => string) // TS cannot digest partial for ctx
  states: ChildStatesDef<any> // TS cannot digest partial for ChildStatesDef type
}

export function useMachine<TContext>(
  machineDef: MachineDef<TContext>
): [CurrentState<TContext>, SendFn] {
  const [service] = useState<Service<TContext>>(() => interpret<TContext>(machineDef))
  const [state, setState] = useState<HookState<TContext>>({
    path: service.path(),
    context: service.context()
  })
  useEffect(
    () =>
      service.onTransition((context: TContext, path: string) => {
        setState({ context, path })
      }),
    [service, setState]
  )
  return [
    {
      ...state,
      matchesOne: service.matchesOne,
      matchesNone: service.matchesNone
    },
    service.send
  ]
}

/**
 * TContextIntersection is expected to be an intersection type of all contexts: ...&...
 **/
export function useMachines<TContextIntersection>(
  ...machineDefs: ParallelMachineDef<TContextIntersection>[]
): [CurrentParallelState<TContextIntersection>, SendFn] {
  const [parallelService] = useState<ParallelService<TContextIntersection>>(() =>
    parallelize<TContextIntersection>(...machineDefs.map(interpret))
  )
  const [state, setState] = useState<ParallelHookState<TContextIntersection>>({
    paths: parallelService.paths(),
    context: parallelService.context()
  })
  useEffect(
    () =>
      parallelService.onTransition((context: TContextIntersection, paths: string[]) => {
        setState({ context, paths })
      }),
    [parallelService, setState]
  )
  return [
    {
      ...state,
      matchesOne: parallelService.matchesOne,
      matchesNone: parallelService.matchesNone
    },
    parallelService.send
  ]
}
