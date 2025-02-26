import React, { useState } from 'react';
import { Bell, Home, ListTodo, Users, PieChart, Clock, Users2, Send, MessageSquare, Sun, Moon, Plus, X } from 'lucide-react';


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filterPriority === 'All') return true;
    return todo.priority === filterPriority;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-purple-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex">

          {/* Main Content */}
          <div className="flex-1">
            {/* Add Todo Button and Filters */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Task
              </button>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value )}
                className={`p-2 rounded-lg border ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            {/* Todo List */}
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 rounded-lg shadow-md ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                  } flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.text}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {todo.date}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Todo Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-lg shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Create New Task
              </h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className={`p-1 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''}`}
              >
                <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Task Description
                </label>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Enter task description..."
                  className={`w-full p-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value )}
                  className={`w-full p-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={addTodo}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, text, active = false }) {
  return (
    <div className={`flex items-center space-x-2 p-2 rounded-lg mb-2 ${active ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50'}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default App;