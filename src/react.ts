import { useEffect, useState } from 'react'
import { MachineDef, Service, SendFn, CurrentMachineState, interpret } from '@cxstate/cxstate'

interface HookState<TContext> {
  path: string
  context: Readonly<TContext>
}

export function useMachine<TContext>(
  machineDef: MachineDef<TContext>
): [CurrentMachineState<TContext>, SendFn] {
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
