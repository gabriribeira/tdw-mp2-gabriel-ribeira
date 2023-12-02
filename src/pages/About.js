import React from "react";
import gabriel from "../assets/gabriribeira.jpg";
import logo from "../assets/logo.png";
import mariana from "../assets/marimarques.png";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="bg-preto">
      <Navbar />
      <section className="h-full flex flex-col">
        <div className="xl:h-[94vh] lg:h-[96vh] h-[99vh] flex  justify-end items-end">
          <div className="flex pb-12">
            <img src={logo} className="w-[70rem]" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-10 my-10 xl:max-w-[90vw] xl:px-0 lg:max-w-full md:px-10 px-5 justify-center m-auto">
          <div className="lg:grid lg:grid-cols-8 flex flex-col items-center">
            <div className="md:text-lg text-md text-cinza col-span-5 flex justify-start">
              As part of my academic journey I had the opportunity to immerse
              myself in a fascinating project, entitled EMME. EMME proposed an
              innovative approach to discovering new music, going beyond
              traditional suggestion algorithms. The app not only used a
              personalized algorithm based on user usage, but also promoted
              social interaction through music suggestions between friends. The
              possibility of sending emmes (musical messages) to friends and
              observing their reactions provided a unique experience. In
              addition, users could share their musical tastes with others via a
              memory book and a calendar on their profile. In partnership with
              talented Design student Mariana Marques, the EMME project received
              significant recognition, winning two awards and taking part in
              prestigious competitions. This successful collaboration inspired
              me to continue the project, resulting in the creation of a new
              version called MEEM.
            </div>
            <div className="flex justify-center items-center col-span-2 col-start-7 lg:mt-0 mt-10 pb-[100%] w-full relative">
              <img
                className="absolute w-full h-full object-cover rounded-full top-0 left-0"
                src={gabriel}
                alt="web developer absolutamente lindo de leiria"
              />
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-8 flex flex-col-reverse items-center">
            <div className="flex lg:mt-0 mt-10 justify-center items-center col-span-2 pb-[100%] w-full relative">
              <img
                className="absolute w-full h-full object-cover rounded-full top-0 left-0"
                src={mariana}
                alt="web developer absolutamente linda de águeda"
              />
            </div>
            <div className="md:text-lg text-md text-cinza col-span-5 col-start-4 flex justify-end">
              Adapting to the MEEM project was an exciting journey, where I
              tried to take advantage in this new course. The main focus was the
              complete restructuring of the backend using Node and Express,
              combined with state optimization using Redux on the frontend. To
              avoid any advantage derived from the previous implementation, I
              chose to carry out a comprehensive redesign, incorporating new
              calls, introducing new components and, essentially, creating a
              completely renewed experience. MEEM, with its purposefully similar
              name, represents the evolution of the original concept, retaining
              the innovative essence of EMME, but now enhanced by a new
              technological architecture and an improved approach.
            </div>
          </div>
        </div>
        <div className="">
          <iframe
            src="https://open.spotify.com/embed/playlist/5LjMoUjVPKDZyaSj5ynLWA?utm_source=generator&theme=0"
            width="100%"
            className="h-screen lg:p-20 p-0"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
