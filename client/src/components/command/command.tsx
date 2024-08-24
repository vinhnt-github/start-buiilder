import { Command as CommandPrimitive } from "cmdk";
import React from "react";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithRef<typeof CommandPrimitive>
>((props, ref) => <CommandPrimitive ref={ref} {...props} />);
Command.displayName = "Command";

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithRef<typeof CommandPrimitive.Input>
>((props, ref) => <CommandPrimitive.Input ref={ref} {...props} />);
CommandInput.displayName = "CommandInput";

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} {...props} />);
CommandEmpty.displayName = "CommandEmpty";

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithRef<typeof CommandPrimitive.List>
>((props, ref) => <CommandPrimitive.List ref={ref} {...props} />);
CommandList.displayName = "CommandList";

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithRef<typeof CommandPrimitive.Group>
>((props, ref) => <CommandPrimitive.Group ref={ref} {...props} />);
CommandGroup.displayName = "CommandGroup";

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithRef<typeof CommandPrimitive.Item>
>((props, ref) => <CommandPrimitive.Item ref={ref} {...props} />);
CommandItem.displayName = "CommandItem";

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithRef<typeof CommandPrimitive.Separator>
>((props, ref) => <CommandPrimitive.Separator ref={ref} {...props} />);
CommandSeparator.displayName = "CommandSeparator";

export {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
};
