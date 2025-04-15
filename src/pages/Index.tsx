
import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

type Filter = 'all' | 'pending' | 'completed';

const Index = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');
  const isMobile = useIsMobile();

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'pending':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-3xl py-6 md:py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">My Tasks</h1>
        
        <TodoForm onSubmit={addTodo} />
        
        <div className="mt-6 md:mt-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as Filter)}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
