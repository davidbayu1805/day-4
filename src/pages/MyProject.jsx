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
    const months = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24 * 30));
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  const handleCardClick = (project) => {
    Swal.fire({
      title: `<strong style="font-size: 20px;">${project.name}</strong>`,
      html: `
      <div style="display: flex; gap: 16px; align-items: flex-start;">
        <img 
          src="${project.imagePreview}" 
          style="width: 250px; height: auto; border-radius: 8px; object-fit: cover; margin-top: 4px;"
        />
        <div style="text-align: left; font-size: 10px; padding-top: 4px; flex: 1;">
          <div style="margin-left: 8px;">
            <p style="margin-bottom: 4px; font-weight: 600;">Duration</p>
            <p style="margin-bottom: 4px;">
              <i class="ri-calendar-todo-line"></i> ${project.startDate} - ${project.endDate}
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
      </div>
      <div style="margin-top: 20px; max-height: 200px; overflow-y: auto; text-align: justify; font-size: 14px;">
        ${project.description}
      </div>
    `,
      showConfirmButton: false,
      showCloseButton: false,
      focusConfirm: false,
      customClass: {
        popup: "rounded-lg text-left",
      },
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mt-24 font-bold text-center mb-8">ADD MY PROJECT</h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-4">
        <input
          name="name"
          type="text"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="bg-white rounded-lg px-4 py-2 shadow"
        />
        <div className="flex gap-4">
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="bg-white rounded-lg px-4 py-2 shadow w-1/2"
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="bg-white rounded-lg px-4 py-2 shadow w-1/2"
          />
        </div>
        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="bg-white rounded-lg px-4 py-2 shadow resize-none"
        />
        <div className="grid grid-cols-2 gap-2">
          {["React Js", "Next Js", "Node Js", "TypeScript"].map((tech) => (
            <label key={tech}>
              <input
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

        <div>
          <label className="block mb-2 text-gray-700 font-semibold">Upload File</label>
          <div
            className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow-md cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm truncate">
              {form.image ? form.image.name : "Upload file"}
            </span>
            <i className="ri-attachment-2 text-xl text-gray-500 hover:text-black transition ml-4" />
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <div className="flex justify-end mb-10">
          <button type="submit" className="bg-black text-white rounded-full px-6 py-2">
            Submit
          </button>
        </div>
      </form>

      {/* Projects Section */}
      <div className="w-full bg-white pt-5 pb-12 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">MY PROJECT</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 w-full sm:min-w-[280px] sm:max-w-[320px] cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => handleCardClick(p)}
            >
              {p.imagePreview && (
                <img
                  src={p.imagePreview}
                  alt="project"
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-3"
                />
              )}
              <h4 className="font-bold">
                {p.name} - {p.year}
              </h4>
              <p className="text-sm">durasi: {p.duration}</p>
              <p className="text-sm mt-2 line-clamp-3">{p.description}</p>

              <div className="flex gap-3 text-xl mt-3 text-black">
                <i className="ri-google-play-fill" />
                <i className="ri-android-fill" />
                <i className="ri-java-fill" />
              </div>

              <div className="flex gap-[5px] mt-4">
                <button className="bg-gray-900 text-white text-sm px-4 py-1 rounded hover:bg-black w-1/2">
                  Edit
                </button>
                <button className="bg-gray-900 text-white text-sm px-4 py-1 rounded hover:bg-black w-1/2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProject;
