import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Every button is a pill (rounded-full) in every size. No blue variant: blue is an accent only.
 * Focus uses the global 2px brand outline from app.css.
 */
const buttonVariants = cva(
  "group/button text-small inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-colors duration-150 select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 gap-2 px-4",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-[18px]",
        "icon-lg": "size-11 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-8",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-5",
        sm: "h-8 gap-1.5 px-3.5",
        xs: "text-caption h-7 gap-1 px-3",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        ghost: "text-foreground hover:bg-muted aria-expanded:bg-muted",
        link: "text-brand h-auto px-0 underline-offset-4 hover:underline",
        outline:
          "border-border bg-background text-foreground hover:bg-muted aria-expanded:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
      },
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ className, size, variant }))}
      data-slot="button"
      {...props}
    />
  );
}

export { Button, buttonVariants };
