"use client"

import { useState } from "react"

import { useSubscriptionLevel } from "@/providers/subscription-level-provider"
import { PaletteIcon } from "lucide-react"
import { Color, ColorChangeHandler, TwitterPicker } from "react-color"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { usePremiumModal } from "@/features/premium/hooks/use-premium-modal"
import { canUseCustomizations } from "@/features/premium/lib/permissions"

interface ColorPickerProps {
  color?: Color
  onChange: ColorChangeHandler
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false)
  const subscriptionLevel = useSubscriptionLevel()
  const premiumModal = usePremiumModal()

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="max-2xl:dark:bg-muted max-2xl:dark:hover:bg-muted/80"
          title="Change resume color"
          onClick={() => {
            if (!canUseCustomizations(subscriptionLevel)) {
              premiumModal.setOpen(true)
              return
            }
            setShowPopover(true)
          }}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  )
}
