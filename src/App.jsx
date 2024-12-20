import { useEffect, useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./redux/todosApiSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { Check, CheckCheck, X } from "lucide-react";
import Refetch from "./components/Refetch";

function App() {
  const [show, setShow] = useState(false)
  const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery();
  const [
    addTodo,
    { isLoading: isAddTodoLoading, isSuccess: isAddTodoSuccess },
  ] = useAddTodoMutation();
  const [
    updateTodo,
    { isLoading: isUpdateTodoSuccess, isSuccess: isUpdateTodoLoading },
  ] = useUpdateTodoMutation();
  const [
    deleteTodo,
    { isLoading: isDeleteTodoLoading, isSuccess: isDeleteTodoSuccess },
  ] = useDeleteTodoMutation();

  useEffect(() => {
    setShow(false)
    let timeoutId = setTimeout(() => {
      setShow(true)
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isSuccess])

  function handleAddNewTodo() {
    addTodo({
      todo: "New Todo",
      userId: 1,
      completed: false,
    });
  }

  function handleUpdateTodo(id, completed) {
    updateTodo({ id, completed });
  }

  useEffect(() => {
    if (isAddTodoSuccess) {
      toast.success("Added new todo", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [isAddTodoSuccess]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p style={{ color: "red" }}>{error.toString()}</p>;

  if (isSuccess) {
    return (
      <div>
        {show && <Refetch />}
        <ul>
          {data.todos.map(({ id, completed, todo }) => (
            <li key={id}>
              {todo}
              <button
                style={{ marginLeft: "1rem" }}
                onClick={() => handleUpdateTodo(id, !completed)}
              >
                {completed ? <CheckCheck /> : <Check />}
              </button>
              <button disabled={isDeleteTodoLoading} onClick={() => deleteTodo(id)}>
                <X></X>
              </button>
            </li>
          ))}
        </ul>
        <p>
          Add New Todo: {" "}
          <button 
          disabled={isAddTodoLoading}
          onClick={handleAddNewTodo}>
            Add</button>
        </p>
        <ToastContainer></ToastContainer>
      </div>
    );
  }
}

export default App;
