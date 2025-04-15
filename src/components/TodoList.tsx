
import { Check, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const isMobile = useIsMobile();

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
    }
  };

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={cn(
            "flex items-start md:items-center gap-3 p-3 md:p-4 bg-white rounded-lg shadow-sm transition-all",
            todo.completed && "opacity-50"
          )}
        >
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "min-w-6 h-6 w-6 rounded-full transition-colors mt-1 md:mt-0",
              todo.completed && "bg-green-500 text-white hover:bg-green-600"
            )}
            onClick={() => onToggle(todo.id)}
          >
            {todo.completed && <Check className="h-4 w-4" />}
          </Button>
          <div className="flex-1">
            <p className={cn("text-gray-900 text-sm md:text-base", todo.completed && "line-through")}>
              {todo.title}
            </p>
            {todo.dueDate && (
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                <span>{format(new Date(todo.dueDate), 'PPP')}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getPriorityColor(todo.priority)
              )}
            >
              {isMobile ? todo.priority.charAt(0).toUpperCase() : todo.priority}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="text-gray-400 hover:text-red-500 h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
