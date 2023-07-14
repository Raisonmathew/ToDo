import React, { useRef, useState, useCallback, useEffect } from "react";
import Modal from "./modal";
import { getAllUsers } from '../../api/getAllUsers';
import { useSelector } from "react-redux";

const ModalCreateTask = ({ onClose, task, nameForm, onConfirm  }) => {

  const error = useSelector((store) => store.tasks.error);
  const [users, saveUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const fetchAllUsers = await getAllUsers();
    saveUsers(fetchAllUsers);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const today= new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate = year + "-" + month + "-" + day;
  const maxDate = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState(() => {
    if (task) {
      return task.description;
    }
    return "";
  });
  const [title, setTitle] = useState(() => {
    if (task) {
      return task.title;
    }
    return "";
  });
  const [date, setDate] = useState(() => {
    if (task) {
      const date = task.date.split('T')[0];
      return date;
    }
    return todayDate;
  });
  const isTitleValid = useRef(false);
  const isDateValid = useRef(false);
  const [selectedUser, setSelectedUser] = useState(() => {
    if (task) {
      return task.user;
    }
    return users[0];
  });

  const addNewTaskHandler = async (event) => {
    event.preventDefault();
    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newTask = {
        title: title,
        user: selectedUser ? selectedUser : users[0]?._id ,
        description: description,
        date: date,
      };
      newTask.completed = task ? task.completed : false;
      if(task && task._id) {
        newTask._id = task._id;
      }
    console.log(newTask);
    onConfirm(newTask);
    onClose();    
    }
  };
  return (
    <Modal onClose={onClose} title={nameForm}>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form className="p-5"
        onSubmit={addNewTaskHandler}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            name="title"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Description (optional)</label>
          <textarea
            placeholder="e.g, study for the test"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Select a directory</label>
          <select
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={selectedUser}
            onChange={({ target }) => setSelectedUser(target.value)}
          >
            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
                className="bg-slate-100 dark:bg-slate-800"
              >
                {user.userName}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;