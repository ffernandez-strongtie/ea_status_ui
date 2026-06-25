'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('sst-calendar', className)}
      classNames={{
        months: 'sst-cal-months',
        month: 'sst-cal-month',
        caption: 'sst-cal-caption',
        caption_label: 'sst-cal-caption-label',
        caption_dropdowns: 'sst-cal-caption-dropdowns',
        dropdown_month: 'sst-cal-dropdown-wrap',
        dropdown_year: 'sst-cal-dropdown-wrap',
        dropdown: 'sst-cal-dropdown',
        nav: 'sst-cal-nav',
        nav_button: 'sst-cal-nav-btn',
        nav_button_previous: 'sst-cal-nav-prev',
        nav_button_next: 'sst-cal-nav-next',
        table: 'sst-cal-table',
        head_row: 'sst-cal-head-row',
        head_cell: 'sst-cal-head-cell',
        row: 'sst-cal-row',
        cell: 'sst-cal-cell',
        day: 'sst-cal-day',
        day_range_end: 'day-range-end',
        day_selected: 'sst-cal-day-selected',
        day_today: 'sst-cal-day-today',
        day_outside: 'sst-cal-day-outside',
        day_disabled: 'sst-cal-day-disabled',
        day_range_middle: 'sst-cal-day-range-middle',
        day_hidden: 'sst-cal-day-hidden',
        vhidden: 'sst-cal-vhidden',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="sst-cal-icon" />,
        IconRight: () => <ChevronRight className="sst-cal-icon" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
