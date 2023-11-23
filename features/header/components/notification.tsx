import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { LuBell } from 'react-icons/lu'

export const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" className="hover:bg-yellow">
          <LuBell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Sead Beta Started</AccordionTrigger>
            <AccordionContent>Sead, for changing seat easily</AccordionContent>
          </AccordionItem>
        </Accordion>
      </PopoverContent>
    </Popover>
  )
}
