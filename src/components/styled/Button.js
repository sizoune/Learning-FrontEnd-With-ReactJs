import tw from 'tailwind-styled-components';

const Button = tw.button`
   w-full 
   text-white 
   bg-blue-600 
   hover:bg-blue-700 
   focus:ring-4 
   focus:outline-none 
   focus:ring-primary-300 
   font-medium rounded-lg 
   text-sm 
   px-5 
   py-2.5 
   text-center  
   dark:hover:bg-primary-700 
   dark:focus:ring-primary-800 mt-7
`;

export default Button;
