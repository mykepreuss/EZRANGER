import TaskRow from './TaskRow.jsx';

const TaskList = ({ tasks, onTaskChange, onTaskRemove }) => (
  <div className="space-y-6">
    {tasks.map((task, index) => (
      <TaskRow
        key={task.id}
        task={task}
        index={index}
        onChange={onTaskChange}
        onRemove={onTaskRemove}
        disableRemove={tasks.length <= 2}
      />
    ))}
  </div>
);

export default TaskList;

