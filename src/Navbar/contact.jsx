import { HiOutlineMail } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center gap-8">

      <p className="flex items-center gap-2 text-lg">
        <HiOutlineMail className="text-xl" />
        E-mail: abdurrahmantushar0@gmail.com
      </p>

      <div className="flex gap-6 text-lg">
        <a
          href="https://github.com/abdurrahmantushar"
          className="hover:text-gray-300 flex items-center gap-1"
        >
          <FaGithubSquare className="text-xl" />
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/abdur-rahman-tushar-x/"
          className="hover:text-gray-300 flex items-center gap-1"
        >
          <CiLinkedin className="text-xl" />
          LinkedIn
        </a>

        <a
          href="https://www.instagram.com/abdur_rahman_tushar_/"
          className="hover:text-gray-300 flex items-center gap-1"
        >
          <FaInstagram className="text-xl" />
          Instagram
        </a>
      </div>

      <p className="text-lg">
        Number: +880 187 073 3450
      </p>

    </div>
  );
};
