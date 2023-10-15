import Image from 'next/image';


const DATAS = [
  {
    id: 1,
    title: "Next.js",
    img: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png",
    description:
      "Next.js is a powerful framework for building modern web applications. It is built on top of React, which is a versatile library.",
  },
  {
    id: 2,
    title: "React",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    description:
      "React is the foundation of Next.js and offers a wide range of features for creating interactive and dynamic user interfaces.",
  },
  {
    id: 3,
    title: "JavaScript",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
    description:
      "JavaScript is a key technology in web development and is often used alongside React and Next.js to create web applications.",
  },
  {
    id: 4,
    title: "Java",
    img: "https://logolook.net/wp-content/uploads/2022/11/Java-Logo.png",
    description:
      "Feel free to customize this website, which was built using Next.js, React, and JavaScript, to suit your needs.",
  },
];

export default function Home() {
  
  return (
    <main className="bg-black h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-white text-xl mt-20">
        Programming Languages and Frameworks I know
      </h1>
      <div className="hidden md:flex md:flex-wrap items-center justify-center space-x-4 mt-20 border-b-2 border-white pb-10">
        {DATAS.map((data, index) => (
          <div
            key={index}
            className="group flex flex-col text-white text-center hover:bg-white
             border-white shadow-lg shadow-white rounded-lg h-60 hover:scale-105 duration-300 ease-in-out sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <Image
              src={data.img}
              className={`mx-auto inline-block ${
                data.id === 1
                  ? "white-shadow"
                  : data.id === 2
                  ? "blue-shadow"
                  : data.id === 3
                  ? "yellow-shadow"
                  : "dark-blue-shadow"
              } group-hover:rounded-xl group-hover:scale-125 duration-300 ease-out`}
              width={data.title === "Java" ? 140 : 80}
              height={data.title === "Java" ? 140 : 80}
              alt=""
            />
            <h1 className="inline-block group-hover:text-black font-bold">
              {data.title}
            </h1>
            <p className="mt-2 inline-block group-hover:text-black group-hover:font-bold duration-300 ease-in-out">
              {data.description}
            </p>
          </div>
        ))}
      </div>

      <div className="md:hidden flex w-full flex-col items-center justify-center gap-3 mt-10">
        {DATAS.map((data, index) => (
          <div key={index} className="text-center break-words flex flex-col">
            <Image
              src={data.img}
              className="mx-auto"
              width={data.id !== 4 ? 60 : 100}
              height={40}
              alt=""
            />
            <h1 className="mt-2 text-xl font-semibold">{data.title}</h1>
            <p className="mt-2">{data.description}</p>
          </div>
        ))}
      </div>
      <div className="md:w-96 w-full break-words mx-auto md:border rounded-md md:mt-10 md:p-7">
        <h1 className="mt-10 text-center font-bold text-xl">Who Am I?</h1>
        <p className="justify-center md:mb-5 text-center md:text-xl">
          Hello, my name is <strong>Emir</strong>. I&apos;ve been learning
          programming for <strong>1</strong> year my favourite programming
          language is <strong>typescript</strong>, and I&apos;m also interested in
          other languages such as <strong>German</strong> and{" "}
          <strong>English</strong>.
        </p>
      </div>
    </main>
  );
}
