import { DATAS } from '@/components/Constants';
import Footer from '@/components/Footer';
import Image from 'next/image';


export default function Home() {
  
  return (
    <main className="bg-black h-full w-full flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-white text-xl mt-20">
        Programming Languages and Frameworks I know
      </h1>
      <div className="hidden md:flex md:flex-wrap items-center justify-center space-x-4 mt-20 pb-10">
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
      <Footer />
    </main>
  );
}
