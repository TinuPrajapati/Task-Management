import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { checkCookieValidity } from "../../utils/cookiesValidation.js";
import ShowProject from "./ShowProject.jsx";
import CheckboxOptions from "../Common/CheckboxOptions.jsx";

const AllProject = () => {
  const { name } = useParams();
  const [projects, setProjects] = useState([]);
  const [display, setDisplay] = useState(false);
  const [filters, setFilters] = useState({
    all: true,
    favorite: false,
    today: false,
    yesterday: false,
    pending: false,
    accept: false,
    complete: false,
    rejected: false,
  });

  const navigate = useNavigate();

  const toggleDisplay = () => setDisplay((prev) => !prev);

  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  // Apply filters to projects
  const applyFilters = (data) => {
    return data.filter((project) => {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString(); // Yesterday's date

      if (filters.favorite && !project.isFavorite) return false;
      if (filters.today && new Date(project.date).toDateString() !== today) return false;
      if (filters.yesterday && new Date(project.date).toDateString() !== yesterday) return false;
      if (filters.pending && project.status !== "Pending") return false;
      if (filters.accept && project.status !== "Accept") return false;
      if (filters.complete && project.status !== "Complete") return false;
      if (filters.rejected && project.status !== "Rejected") return false;
      return true;
    });
  };

  const getProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_backend}/admin/all_projects`, {
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
      });
      setProjects(applyFilters(response.data));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const initializeDashboard = async () => {
    const isValid = await checkCookieValidity(name, navigate);
    if (isValid) {
      getProjects();
    }
  };

  useEffect(() => {
    initializeDashboard();
  }, [name]);

  useEffect(() => {
    getProjects();
  }, [filters]);

  return (
    <div className="w-full">
      <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] z-50 rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
        <Link to={`/${name}/all_projects`} className="text-3xl font-semibold">
          All Projects
        </Link>
        <div className="flex gap-4 relative">
          <Link
            to={`/${name}/create_project`}
            className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
          >
            Create New Project
          </Link>
          <button
            onClick={toggleDisplay}
            className="bg-sky-400 px-3 py-1 text-xl border-4 border-yellow-400 rounded-md text-white active:scale-90"
            aria-label="Toggle filter options"
          >
            Filter
          </button>
          {display && (
            <div className="absolute top-[118%] right-0 bg-white rounded-md px-4 py-2 border-2 border-yellow-400 duration-200">
              <CheckboxOptions
                id="all"
                text="All Projects"
                value={filters.all}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="favorite"
                text="Favorite Projects"
                value={filters.favorite}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="today"
                text="Today Projects"
                value={filters.today}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="yesterday"
                text="Yesterday Projects"
                value={filters.yesterday}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="pending"
                text="Pending Projects"
                value={filters.pending}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="accept"
                text="Accept Projects"
                value={filters.accept}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="complete"
                text="Complete Projects"
                value={filters.complete}
                handleFilterChange={handleFilterChange}
              />
              <CheckboxOptions
                id="rejected"
                text="Rejected Projects"
                value={filters.rejected}
                handleFilterChange={handleFilterChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 px-4 py-10">
      <ShowProject />
      </div>
    </div>
  );
};

export default AllProject;
