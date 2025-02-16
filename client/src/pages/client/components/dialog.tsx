import classNames from "classnames";

interface DialogProps {
  isPrimary: boolean;
}

export default function dialog(props: DialogProps) {
  return (
    <div
      className={classNames(
        "p-2 rounded-lg text-right text-xs font-medium leading-4.5",
        {
          ["bg-indigo-200 text-white"]: props.isPrimary,
          ["bg-white text-black"]: !props.isPrimary,
        }
      )}
    ></div>
  );
}
