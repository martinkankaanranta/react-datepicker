import { LocalDate, YearMonth } from 'js-joda'
import * as React from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'

import { getCalendar } from './calendar'
import { useDatePickerConfig } from './datepicker-config'
import './calendar-view.scss'

interface Props {
  value: LocalDate
  onChange: (x: LocalDate) => void
}

const formatDate = (maybeDate: O.Option<LocalDate>) =>
  O.isSome(maybeDate) ? `${maybeDate.value.dayOfMonth()}` : ''

const isEqual = (d1: O.Option<LocalDate>, d2: LocalDate) => pipe(
  d1,
  O.map(x => x.equals(d2)),
  O.getOrElse(() => false)
)

export const Calendar: React.FC<Props> = (p) => {
  const cfg = useDatePickerConfig()
  const viewModel = getCalendar(YearMonth.of(p.value.year(), p.value.month()))
  const weekdayTitles = [1, 2, 3, 4, 5, 6, 7]

  const handleClick = (x: O.Option<LocalDate>)  =>  () => {
    if (O.isSome(x)) {
      p.onChange(x.value)
    }
  }

  return (
    <div className="calendar__container">
        <div className="calendar__days" data-testid="calendar__days">
          {weekdayTitles.map(x => (
            <div className="calendar__days__title" key={x} data-testid={`calendar__days__title--${cfg.formatWeekday(x)}`}>
              {cfg.formatWeekday(x)}
            </div>
          ))}
        </div>
      <div data-testid="calendar__body">
        {viewModel.map((week, weekIndex) => (
          <div
            className={`calendar__week`}
            key={weekIndex}
            data-testid="calendar__week"
          >
            {week.map((maybeDate, dayIndex) => (
              <div
                className={`calendar__day${isEqual(maybeDate, p.value) ? ' calendar__day--selected' : ''}`}
                key={dayIndex}
                onClick={handleClick(maybeDate)}
                data-testid={`calendar__day--${formatDate(maybeDate)}`}
              >
                {formatDate(maybeDate)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}