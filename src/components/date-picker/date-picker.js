import React, { useEffect, useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Button from "../fundamentals/button"
import moment from "moment"
import ChevronRightIcon from "../fundamentals/icons/chevron-right-icon"
import ArrowDownIcon from "../fundamentals/icons/arrow-down-icon"
import ClockIcon from "../fundamentals/icons/clock-icon"
import ChevronLeftIcon from "../fundamentals/icons/chevron-left-icon"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import InputContainer from "../fundamentals/input-container"
import InputHeader from "../fundamentals/input-header"
import clsx from "clsx"

const DatePicker = ({
  date,
  onChange,
  enableTimepicker,
  label = "start date",
  required = false,
  withTooltip = false,
  tooltipText,
  tooltipProps = {},
}) => {
  const [tempDate, setTempDate] = useState(date)
  const [tempDate, setTempDate] = useState(date)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => setTempDate(date), [isOpen])

  const submitDate = () => {
    // update only date, month and year
    const newDate = new Date(date.getTime())
    newDate.getHours(tempDate.getHours())
    newDate.setMinutes(tempDate.getMinutes())

    onChange(newDate)
    setIsOpen(false)
  }

  const numbers = [...Array(60).keys()]
  console.log(numbers)

  return (
    <div className="w-full">
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            className={clsx("w-full rounded-base border ", {
              "shadow-input border-violet-60": isOpen,
              "border-grey-20": !isOpen,
            })}
          >
            <InputContainer className="border-0 shadown-none focus-within:shadow-none">
              <div className="w-full flex text-grey-50 pr-0.5 justify-between">
                <InputHeader
                  {...{
                    label,
                    required,
                    withTooltip,
                    tooltipText,
                    tooltipProps,
                  }}
                />
                <ArrowDownIcon size={16} />
              </div>
              <div className="w-full items-center flex text-left text-grey-40">
                <ClockIcon size={16} />
                <span className="mx-1">UTC</span>
                <span className="text-grey-90">
                  {moment(date).format("HH:mm")}
                </span>
              </div>
            </InputContainer>
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          side="top"
          sideOffset={8}
          className="rounded-rounded scrollbar-hide border border-grey-20 bg-grey-0 w-full flex shadow-dropdown"
        >
          <ReactDatePicker
            selected={tempDate}
            showTimeSelect
            showTimeSelectOnly
            inline
            timeFormat="HH"
            timeIntervals={60}
            onChange={setTempDate}
            calendarClassName="time-picker"
            timeClassName={() => "time-picker-item"}
          />
          <ReactDatePicker
            selected={tempDate}
            showTimeSelect
            showTimeSelectOnly
            inline
            timeFormat="mm"
            timeIntervals={1}
            onChange={setTempDate}
            calendarClassName="time-picker"
            timeClassName={(d) =>
              d.getHours() < 1 ? "time-picker-item" : "hidden"
            }
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-grey-0 h-2xlarge z-10" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  )
}

const CustomHeader = ({ date, decreaseMonth, increaseMonth, ...props }) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="w-10 h-10">
        <Button
          variant="ghost"
          size="medium"
          tabIndex={-1}
          className="w-full h-full flex justify-center p-2 focus:border-0 focus:shadow-none"
          onClick={decreaseMonth}
        >
          <ChevronLeftIcon size={16} />
        </Button>
      </div>
      <span className="inter-base-semibold">
        {moment(date).format("MMMM, YYYY")}
      </span>

      <div className="w-10 h-10">
        <Button
          variant="ghost"
          size="medium"
          tabIndex={-1}
          className="w-full h-full flex justify-center p-2 focus:border-0 focus:shadow-none"
          onClick={increaseMonth}
        >
          <ChevronRightIcon size={16} />
        </Button>
      </div>
    </div>
  )
}

export default DatePicker
