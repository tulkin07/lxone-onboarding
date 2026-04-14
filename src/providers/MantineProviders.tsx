"use client"

import { MantineProvider, createTheme } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"

const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "md",
  components: {
    DatePickerInput: {
      defaultProps: {
        size: "sm",
      },
    },
    YearPickerInput: {
      defaultProps: {
        size: "sm",
      },
    },
  },
})

export function MantineProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MantineProvider theme={theme}>
      <DatesProvider settings={{ locale: "en", firstDayOfWeek: 0 }}>
        {children}
      </DatesProvider>
    </MantineProvider>
  )
}
