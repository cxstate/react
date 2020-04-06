# CxState React Hook

React integration for CxState.

## Quick start

```bash
npm i -S @cxstate/cxstate @cxstate/react
```

To use the react hook, additionally install `@cxstate/react` and use it as follows:

```jsx
import { useMachine } from '@cxstate/react';
// Assuming a machine definition, context and event interfaces in ./machine.ts
import { Context, machine, DoEvent } from './machine';

const [current, send] = useMachine<Context>(machine);

// Sending strong typed events to the machine
send<DoEvent>('DO_SOMETHING', {value: 'a value'});

// Conditional rendering if current state is '/state/path/a' or '/state/path/b'
{ current.matchesOne('/state/path/a', '/state/path/b')) && <h1>{{ current.context.headerAOrB }}</h1> }

// Conditional rendering if current state is neither '/state/path/a' or '/state/path/b'
{ current.matchesNone('/state/path/a', '/state/path/b')) && <h1>{{ current.context.neitherHeaderAOrB }}</h1> }
```

## TOC

1. [API](./API.md)
