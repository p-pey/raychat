import { FormEventHandler } from "react"
import { AuthSubscriber } from "../../routes/routes";



export default function Login() {
    const handleSubmit:FormEventHandler<HTMLFormElement> = (event)=> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        AuthSubscriber.publish("login", { name: formData.get("name"), role: formData.get("role") });
    }
    return (
        <div className="bg-white-250 w-full h-full flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full h-full lg:w-[320px] lg:h-[320px] flex flex-col gap-5 bg-white p-3 rounded-xl">
                <h4 className="mx-auto font-medium">
                    Login
                </h4>
                <input required className="outline-0 border border-gray-200 rounded-lg p-2" type="text" name ="name" placeholder="Your name" />
               <div className="flex items-center gap-3">
                <label htmlFor="agent">
                    Agent
                </label>
                <input id="agent" type="radio" name="role" value="agent" />
                <label htmlFor="user">
                    User
                </label>
                <input id="user" defaultChecked type="radio" name="role" value="user" />
               </div>
                <button type="submit" className="bg-blue-500 mt-auto p-3 text-white rounded-lg text-center flex justify-center">
                    Login
                </button>
            </form>
        </div>
    )
}