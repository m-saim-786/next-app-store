type TodoItem = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const TodoItem = ({
  item,
  onChecked,
  onDelete,
}: {
  item: TodoItem;
  onChecked: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) => {
  return (
    <>
      <div className="flex items-center justify-between border rounded-md p-2 my-2">
          <h3 className={`${item.isCompleted && "line-through"} break-words w-96 font-bold ml-3`}>
            {item.title}
          </h3>
        <div className="flex space-x-2">
        <button
            className="rounded-md bg-green-500 p-2 text-white"
            onClick={() => {
              onChecked(item.id, !item.isCompleted).catch((err) => console.error(err));
            }}
          >
            { item.isCompleted ? "Reset" : "Mark as Completed" }
          </button>
          <button
            className="rounded-md bg-red-500 p-2 text-white"
            onClick={() => {
              confirm("Are you sure, you want to remove this item ?") && onDelete(item.id).catch((err) => console.error(err));
            }}
          >
            Remove
          </button>
          
        </div>
      </div>
    </>
  );
};

export default TodoItem;