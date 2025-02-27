import classNames from "classnames";
import { PropsWithChildren } from "react";

interface DialogProps {
  isPrimary: boolean;
  date: string;
}

export default function Dialog(props: PropsWithChildren<DialogProps>) {
  return (
    <div
    data-date={ props.date }
      className={classNames(
        "inline-block max-w-[90%] w-fit p-3 rounded-lg text-right text-xs font-medium leading-4.5 relative before:absolute before:whitespace-nowrap before:text-black-200 before:text-xxs before:left-[110%] before:font-bold before:content-[attr(data-date)]",
        {
          ["bg-indigo-200 text-white mr-auto"]: props.isPrimary,
          ["bg-white text-black ml-auto border border-white-250 rounded-t-lg rounded-bl-lg"]:
            !props.isPrimary,
        }
      )}
    >
      {props.children}
    </div>
  );
}
