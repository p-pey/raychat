import classNames from "classnames";
import { userConversation } from "../../../../types/types";
import { useSidebar } from "./useSidebar"

interface SidebarProps {
    onUserSelect: (user: userConversation)=> void;
    selectedUser: userConversation | null;
    users: Partial<userConversation>[] | null;
}

export default function Sidebar(props: SidebarProps) {
   const { handleSelectUser } = useSidebar({ onSelectUser: props.onUserSelect });
    return (
        <aside className="bg-white w-full h-full">
            <header className="p-5 border-b border-white-250">
                <h1>
                   لیست کاربران 
                </h1>
            </header>
            <main>
                { props.users === null ? <h1> Loading ... </h1> : (
                     <ul>
                     {
                         props.users.map(user => {
                             return (
                                 <li key={user.id} className={classNames(
                                    "cursor-pointer p-3 text-right text-black font-medium border-b border-white-250 hover:bg-white-25",
                                    { ['bg-white-250']: props.selectedUser?.id === user.id }
                                    )} onClick={()=> handleSelectUser(user as userConversation)}>
                                    { user.name }
                                 </li>
                             )
                         })
                     }
                 </ul>
                ) }
               
            </main>
        </aside>
    )
}