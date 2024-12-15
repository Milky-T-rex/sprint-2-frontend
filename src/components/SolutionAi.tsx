import React from "react";
// import Navbar from "./Navbar";

interface SolutionProps {
    name: string;
    image: string;
}

const SolutionAi: React.FC<SolutionProps> = ({ name, image }) => {
    return (
        <div>
            <img src={image} alt={name}/>
            <p>{name}</p>
        </div>
    )
}

export default SolutionAi;