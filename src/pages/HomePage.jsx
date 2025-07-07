import Project1 from "../assets/images/proyek-1.webp";

const HomePage = () => {
  return (
    <div className="homepage pb-10 px-6 sm:px-8 md:px-12">
      <div className="container mx-auto">
        <div className="hero pt-24 flex justify-center">
          <div className="box max-w-3xl w-full">
            <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
              Hi welcome to my hut
            </h1>
            <p className="text-base/8 mb-7 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate rerum autem doloribus magnam at labore provident soluta laborum, odio accusamus maiores architecto mollitia. Deleniti laborum nam explicabo quae quas, deserunt est quos doloremque rerum vitae delectus, quis veritatis error adipisci dolor. Veniam eligendi pariatur dolorum delectus a adipisci nesciunt itaque, enim, accusantium provident ex impedit dicta veritatis ab asperiores, tempora odit! Fugiat quo id rerum odio magnam, nam odit.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/david-bayu"
                className="bg-black hover:bg-gray-400 transition-all py-2 px-4 text-white shadow rounded-full w-fit"
              >
                Contact
              </a>
              <a
                href="/CV.pdf"
                download="David-Bayu-CV.pdf"
                className="text-base/8 text-black hover:none flex items-center gap-1"
              >
                Download CV <i className="ri-download-2-line"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-2xl text-black mb-2">
          <a href="https://www.linkedin.com/in/david-bayu">
            <i className="ri-linkedin-box-fill hover:text-blue-600 transition"></i>
          </a>
          <a href="https://www.instagram.com/crish00_?igsh=MXcxbzV3OXg3ZzQwZw==">
            <i className="ri-instagram-fill hover:text-pink-500 transition"></i>
          </a>
          <a href="#">
            <i className="ri-facebook-box-fill hover:text-blue-800 transition"></i>
          </a>
          <a href="#">
            <i className="ri-twitter-fill hover:text-sky-500 transition"></i>
          </a>
          <a href="https://github.com/davidbayu1805">
            <i className="ri-github-fill text-2xl text-gray-800"></i>
          </a>
        </div>

        <div className="profile flex justify-center pt-5" id="Profile">
          <div className="profile-box w-full">
            <div className="box p-4 bg-white shadow max-w-xs rounded-2xl mx-auto">
              <img
                src={Project1}
                alt="Profile image"
                className="w-full h-[220px] object-cover rounded-2xl"
              />
              <h3 className="text-xl font-bold mt-6 mb-2 text-center">
                David Bayu Cristanto
              </h3>
              <p className="text-base/loose text-center">Fullstack Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
