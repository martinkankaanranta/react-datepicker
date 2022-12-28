# Simple and clean datepicker

a simple date picker which picks dates. See original repository readme for more. 
This is a fork.


![datepicker](./img.png)

Uses `js-joda` for date models, because it works.

- Takes in a `LocalDate | null`, Outputs `LocalDate | null` how extraordinarily revolutional is that?
- One job, and one job only, select dates, how hard is that?
- Formatting only by js-joda `DateTimeFormatter`, only used for input display value read/write
- `valueFormatter` is the input value formatter and parser

## Usage example

```tsx
import React, { useState } from 'react'

import { LocalDate } from 'js-joda'
import { WithDatepicker } from './lib'
import { datePickerConfig } from './lib/datepicker-config'

export function App() {
  const [state, setState] = useState<LocalDate | null>(LocalDate.now())
  return (
    <datePickerConfig.Provider value={{
      valueFormatter: DateTimeFormatter
      formatWeekday: (value: number) => React.ReactNode
      formatMonth: (value: LocalDate) => React.ReactNode
      formatYear: (value: LocalDate) => React.ReactNode
      formatDay: (value: LocalDate) => React.ReactNode

      monthSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode
      monthSelectNextBtnLabel: (value: LocalDate) => React.ReactNode

      yearSelectPrevBtnLabel: (value: LocalDate) => React.ReactNode
      yearSelectNextBtnLabel: (value: LocalDate) => React.ReactNode


      closeAfterClick: boolean
    }}>
      <WithDatepicker value={state} onChange={setState} >
      {input => <input {...input} />}
      </WithDatepicker>
    </datePickerConfig.Provider>
  )
}
```


## Running locally
```
> yarn
> yarn start
```

## Building lib
```
> yarn
> yarn build:lib
```

## Testing
```
> yarn test
> yarn test:ci
```
