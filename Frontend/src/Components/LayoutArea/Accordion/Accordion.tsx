import { useState } from "react";
import "./Accordion.css";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`accordion ${isOpen ? "open" : ""}`}>
            <div className={`accordion-header ${isOpen ? "open" : ""}`} onClick={toggleAccordion}>
                <h3>{title}</h3>
                <span>{isOpen ? "-" : "+"}</span>
            </div>
            <div className="accordion-content-wrapper">
                <div className="accordion-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
