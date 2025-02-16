import classNames from "classnames";
import { PropsWithChildren } from "react";

interface DialogProps {
  isPrimary: boolean;
}

export default function Dialog(props: PropsWithChildren<DialogProps>) {
  return (
    <div
      className={classNames(
        "inline-block w-fit p-3 rounded-lg text-right text-xs font-medium leading-4.5",
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
