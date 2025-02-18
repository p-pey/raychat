import classNames from "classnames";
import { PropsWithChildren } from "react";

interface DialogProps {
    isAgent: boolean;
}

export default function Dialog(props: PropsWithChildren<DialogProps>) {
    return (
        <div className={classNames(
            "p-2 font-normal text-md inline-block rounded-xl w-fit",
            { ['bg-white text-black rounded-br-none ml-auto']: props.isAgent,
            ['bg-pink-950 text-white rounded-bl-none mr-auto']: !props.isAgent
             }
            )}>
            { props.children }
        </div>
    )
}