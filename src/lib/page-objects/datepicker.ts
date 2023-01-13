import { fireEvent, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export class Datepicker {
  constructor (
    private readonly ctx: RenderResult,
  ) {}

  public fieldValue = () => this.field().getAttribute('value')
  public setFieldValue = async (value: string) => {
    await userEvent.type(this.field(), value)
    fireEvent.blur(this.field())
  }

  public field: any = () => this.ctx.queryByTestId('field')
  public focusInput = () => userEvent.click(this.field())

  public datepicker = () => this.ctx.queryByTestId('datepicker')
  public isDatepickerOpen = () => this.ctx.queryByTestId('datepicker') !== null

  public getDayCell: any = (day: number) =>
    this.ctx.queryByTestId(`datepicker__calendar__day--${day}`)
  public selectDay = (day: number) =>
    userEvent.click(
      this.getDayCell(day)
    )

  public nextYear = () =>
    userEvent.click(this.ctx.queryByTestId('yearselector__control--next') as HTMLElement)
  public prevYear = () =>
    userEvent.click(this.ctx.queryByTestId('yearselector__control--prev') as HTMLElement)

  public nextMonth = () =>
    userEvent.click(this.ctx.queryByTestId('monthselector__control--next') as HTMLElement)

  public prevMonth = () =>
    userEvent.click(this.ctx.queryByTestId('monthselector__control--prev') as HTMLElement)

  public static from = (ctx: RenderResult) => new Datepicker(ctx)
}
