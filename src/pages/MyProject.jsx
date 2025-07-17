import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import "remixicon/fonts/remixicon.css";

const techIcons = {
  "React Js": "ri-reactjs-line",
  "Next Js": "ri-nextjs-line",
  "Node Js": "ri-nodejs-line",
  "TypeScript": "ri-code-s-slash-line",
};

const MyProject = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: [],
    image: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => {
        const techs = checked
          ? [...prev.technologies, value]
          : prev.technologies.filter((t) => t !== value);
        return { ...prev, technologies: techs };
      });
    } else if (type === "file") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = getDuration(form.startDate, form.endDate);
    const year = new Date(form.startDate).getFullYear();

    const newProject = {
      ...form,
      imagePreview: form.image ? URL.createObjectURL(form.image) : null,
      duration,
      year,
    };

    setProjects([newProject, ...projects]);
    setForm({
      name: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [],
      image: null,
    });
    fileInputRef.current.value = "";
  };

  const getDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24 * 30)
    );
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  // const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    const project = projects[index];

    Swal.fire({
      title: "Edit Project",
      width: "42rem",
      html: `
      <div class="grid gap-4 text-left text-sm text-gray-700">

        <!-- Name -->
        <div>
          <label class="block mb-2 font-semibold" for="swal-name">Project Name</label>
          <input id="swal-name" type="text" value="${
            project.name
          }" placeholder="Project Name"
            class="swal2-input bg-white rounded-lg px-4 py-2 shadow w-full ml-auto" />
        </div>

        <!-- Date -->
       <div class="flex flex-col sm:flex-row gap-4">
          <div class="w-full sm:w-1/2">
            <label class="block mb-2 font-semibold text-left" for="swal-start">Start Date</label>
            <input
              id="swal-start"
              type="date"
              value="${project.startDate}"
              class="swal2-input bg-white rounded-lg px-4 py-2 shadow w-full" style="margin-left:auto"
            />
          </div>
          <div class="w-full sm:w-1/2">
            <label class="block mb-2 font-semibold text-left" for="swal-end">End Date</label>
            <input
              id="swal-end"
              type="date"
              value="${project.endDate}"
              class="swal2-input bg-white rounded-lg px-4 py-2 shadow w-full" style="margin-left:auto"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block mb-2 font-semibold" for="swal-desc">Description</label>
          <textarea id="swal-desc" rows="4" placeholder="Description"
            class="swal2-textarea bg-white rounded-lg px-4 py-2 shadow w-full resize-none ml-auto">${
              project.description
            }</textarea>
        </div>

        <!-- Technologies -->
        <div>
          <label class="block mb-2 font-semibold">Technologies</label>
          <div class="grid grid-cols-2 gap-2">
            ${["React Js", "Next Js", "Node Js", "TypeScript"]
              .map(
                (tech) => `
                <label class="flex items-center">
                  <input type="checkbox" class="swal-tech mr-2" value="${tech}" 
                    ${project.technologies.includes(tech) ? "checked" : ""} />
                  ${tech}
                </label>
              `
              )
              .join("")}
          </div>
        </div>
      </div>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      customClass: {
        confirmButton: "bg-black text-white rounded-full px-6 py-2",
        cancelButton: "bg-gray-200 text-black rounded-full px-6 py-2 ml-2",
      },
      preConfirm: () => {
        const checkedTechs = Array.from(
          document.querySelectorAll(".swal-tech:checked")
        ).map((el) => el.value);

        const updated = {
          ...project,
          name: document.getElementById("swal-name").value,
          startDate: document.getElementById("swal-start").value,
          endDate: document.getElementById("swal-end").value,
          description: document.getElementById("swal-desc").value,
          technologies: checkedTechs,
        };

        updated.duration = getDuration(updated.startDate, updated.endDate);
        updated.year = new Date(updated.startDate).getFullYear();

        const updatedProjects = [...projects];
        updatedProjects[index] = updated;
        setProjects(updatedProjects);
      },
    });
  };

  const handleDelete = (index) =>{
    Swal.fire({
      title: "Apakah Kamu Yakin?",
      text: "Data Project Ini Akan Terhapus Permanen",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor:"grey",
      confirmButtonText:"Ya, Hapus!!!",
      cancelButtonText:"Batal",
    }).then((result) => {
      if (result.isConfirmed){
        const updatedProjects = [...projects];
        updatedProjects.splice(index,1);
        setProjects(updatedProjects);

        Swal.fire({
          icon:"Success",
          title:"Berhasil Dihapus!!!",
          text:"Data Project Berhasil Dihapus",
          timer:1500,
          showConfirmButton:false,
        });
      }
    });
  };

  const handleCardClick = (project) => {
    Swal.fire({
      title: `<strong style="font-size: 20px;">${project.name}</strong>`,
      html: `
      <style>
        @media (max-width: 768px) {
          .swal-flex-container {
            flex-direction: column !important;
            align-items: center !important;
          }
          .swal-flex-image {
            width: 100% !important;
            max-width: 300px;
            margin: 0 auto 10px;
          }
          .swal-flex-content {
            width: 100% !important;
            font-size: 12px !important;
            margin-left: 0 !important;
          }
        }
      </style>

      <div class="swal-flex-container" style="display: flex; gap: 16px; align-items: flex-start;">
        <img 
          src="${project.imagePreview}" 
          class="swal-flex-image"
          style="width: 250px; height: auto; border-radius: 8px; object-fit: cover; margin-top: 4px;"
        />
        <div class="swal-flex-content" style="text-align: left; font-size: 10px; padding-top: 4px; flex: 1; margin-left: 8px;">
          <p style="margin-bottom: 4px; font-weight: 600;">Duration</p>
          <p style="margin-bottom: 4px;">
            <i class="ri-calendar-todo-line"></i> ${project.startDate} - ${
        project.endDate
      }
          </p>
          <p style="margin-bottom: 10px;">
            <i class="ri-time-zone-line"></i> ${project.duration}
          </p>
          <p style="margin-bottom: 6px; font-weight: 600;">Technologies</p>
          <div style="display: flex; flex-wrap: wrap; column-gap: 20px; row-gap: 8px;">
            ${project.technologies
              .map(
                (tech) => `
                  <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; min-height: 24px;">
                      <i class="${techIcons[tech]}" style="font-size: 14px;"></i> ${tech}
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; max-height: 200px; overflow-y: auto; text-align: justify; font-size: 14px;">
        ${project.description}
      </div>
    `,
      customClass: {
        popup: "rounded-lg text-left",
      },
      showConfirmButton: false,
      showCloseButton: false,
      focusConfirm: false,
    });
  };

  return (
    <>
      {/* Form Section */}
      <div className="bg-gray-100 min-h-screen px-4 sm:px-8 md:px-12 overflow-x-hidden">
        <h2 className="text-2xl sm:text-3xl mt-24 font-bold text-center mb-6 sm:mb-8">
          ADD MY PROJECT
        </h2>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-4">
          {/* Name */}
          <div>
            <label
              className="block mb-2 text-gray-700 font-semibold"
              htmlFor="name"
            >
              Project Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Project Name"
              value={form.name}
              onChange={handleChange}
              className="bg-white rounded-lg px-4 py-2 shadow w-full"
            />
          </div>

          {/* Date */}
          <div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label
                  className="block mb-2 text-gray-700 font-semibold"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  className="bg-white rounded-lg px-4 py-2 shadow w-full"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="block mb-2 text-gray-700 font-semibold"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className="bg-white rounded-lg px-4 py-2 shadow w-full"
                />
              </div>
            </div>
          </div>

          {/* Desc*/}
          <div>
            <label
              className="block mb-2 text-gray-700 font-semibold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="bg-white rounded-lg px-4 py-2 shadow resize-none w-full"
            />
          </div>

          {/* Tech*/}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Technologies
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["React Js", "Next Js", "Node Js", "TypeScript"].map((tech) => (
                <label key={tech} className="flex items-center">
                  <input
                    id="technologies"
                    type="checkbox"
                    value={tech}
                    checked={form.technologies.includes(tech)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Upload File
            </label>
            <div
              className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow-md cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm truncate max-w-[70%]">
                {form.image ? form.image.name : "Upload file"}
              </span>
              <i className="ri-attachment-2 text-xl text-gray-500 hover:text-black transition ml-4" />
            </div>
            <input
              id="upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          <div className="flex justify-end mb-10">
            <button
              type="submit"
              className="bg-black text-white rounded-full px-6 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Project List Section*/}
      <div className="w-full bg-white pt-5 pb-12 px-2 sm:px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">MY PROJECT</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => handleCardClick(p)}
            >
              {p.imagePreview && (
                <img
                  src={p.imagePreview}
                  alt="project"
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
                />
              )}
              <h4 className="font-bold text-sm sm:text-base">
                {p.name} - {p.year}
              </h4>
              <p className="text-sm">durasi: {p.duration}</p>
              <p className="text-sm mt-2 line-clamp-3">{p.description}</p>

              <div className="flex gap-3 text-xl mt-3 text-black">
                <i className="ri-google-play-fill" />
                <i className="ri-android-fill" />
                <i className="ri-java-fill" />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-[5px] mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(idx);
                  }}
                  className="bg-gray-900 text-white text-sm px-4 py-1 rounded hover:bg-black w-full sm:w-1/2"
                >
                  Edit
                </button>
                <button onClick={(e) =>{
                  e.stopPropagation();
                  handleDelete(idx);
                }} className="bg-gray-900 text-white text-sm px-4 py-1 rounded hover:bg-black w-full sm:w-1/2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyProject;
