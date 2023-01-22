import {FC} from "react";

const FormInputTodo: FC = () => {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="title">Title</label> <br/>
                    <input type="text" name={"title"} placeholder={"Input title..."} />
                </div>
                <div>
                    <label htmlFor="todo">Todo</label> <br/>
                    <input type="text" name={"todo"} placeholder={"Input todo..."} />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default FormInputTodo