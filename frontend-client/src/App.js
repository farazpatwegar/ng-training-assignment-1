import React, { useState } from 'react';
import TaskForm from './components/TaskForm'; // Importing TaskForm component
import TaskTable from './components/TaskTable'; // Importing TaskTable component
import Modal from './components/Modal'; // Importing Modal component
import './components/App.css'; // Importing global styles

const App = () => {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks
  const [showForm, setShowForm] = useState(false); // State to control visibility of the TaskForm
  const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [confirmAction, setConfirmAction] = useState(null); // Function for confirmation
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination
  const tasksPerPage = 5; // Number of tasks to display per page

  // Function to add a new task
  const addTask = (task) => {
    if (editingTask) {
      // If editing a task, update the existing one
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...task, id: t.id } : t
      );
      setTasks(updatedTasks);
      setEditingTask(null); // Reset editing task after saving
    } else {
      // Add new task
      setTasks([...tasks, { ...task, id: tasks.length + 1 }]); // Add new task with unique ID
    }
    setShowForm(false); // Hide form after saving
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setConfirmAction(() => () => {
      const newTasks = tasks.filter((_, i) => i !== index); // Filter out the task
      setTasks(newTasks); // Update tasks state
      setModalOpen(false); // Close the modal after deletion
    });
    setModalOpen(true); // Open modal for confirmation
  };

  // Function to initiate editing a task
  const startEditingTask = (task) => {
    setEditingTask(task); // Set the task to be edited
    setShowForm(true); // Show the form to edit the task
  };

  // Function to filter tasks based on search term
  const filteredTasks = tasks.filter(task => 
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const pagesCount = Math.ceil(filteredTasks.length / tasksPerPage); // Total pages based on filtered tasks
  const paginatedTasks = filteredTasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage); // Get tasks for the current page

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">TODO APPLICATION</h1> {/* Main title */}
      </header>
      <main>
        {showForm ? ( // Conditional rendering for task form
          <TaskForm
            task={editingTask} // Pass the current task for editing
            onSave={addTask} // Save function handles both add and edit
            onCancel={() => {
              setShowForm(false); // Hide form on cancel
              setEditingTask(null); // Reset editing task
            }} // Handle cancel action
          />
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <input 
                type="text" 
                placeholder="Search by Assigned To..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" // Styled search input
              />
              <div>
                <button className="btn bg-blue-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-blue-600" onClick={() => setShowForm(true)}>New Task</button> {/* Button to add new task */}
                <button className="btn bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400" onClick={() => setTasks([])}>Refresh</button> {/* Button to clear tasks */}
              </div>
            </div>
            <TaskTable tasks={paginatedTasks} onDelete={deleteTask} onEdit={startEditingTask} /> {/* Display tasks in table */}
            <div className="flex justify-between items-center mt-4">
              <button className="btn bg-blue-500 text-white rounded-md px-4 py-2 disabled:opacity-50" disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              <span className="text-gray-700">Page {currentPage + 1} of {pagesCount}</span>
              <button className="btn bg-blue-500 text-white rounded-md px-4 py-2 disabled:opacity-50" disabled={currentPage >= pagesCount - 1} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
          </>
        )}
      </main>
      <footer className="mt-6 text-center">
        <p className="text-gray-600">&copy; 2024 Task Management</p> {/* Footer */}
      </footer>

      {/* Modal for confirming delete action */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Close modal
        onConfirm={confirmAction} // Confirm delete action
        message="Are you sure you want to delete this task?" // Confirmation message
      />
    </div>
  );
};

export default App;
