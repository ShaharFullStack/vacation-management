import { useTitle } from "../../../Utils/UseTitle";
import { Accordion } from "../../LayoutArea/Accordion/Accordion"; // Import the custom Accordion component
import "./About.css";

export function About(): JSX.Element {
    useTitle("Shahar Travels - About");

    return (
        <div className="About">
            <h1>About Shahar Travels</h1>

            <Accordion title="Who We Are">
                <p>
                    Shahar Travels was founded with the vision of making travel accessible, enjoyable, and enriching for everyone. With years of experience in the travel industry, our dedicated team of travel enthusiasts is committed to helping you plan the perfect getaway, whether you're dreaming of relaxing on a pristine beach, exploring vibrant cities, or embarking on an adventurous journey.
                </p>
            </Accordion>

            <Accordion title="Our Mission">
                <p>
                    Our mission is to provide exceptional travel experiences tailored to your desires. We aim to take the stress out of travel planning by offering personalized packages, expert guidance, and seamless support, so you can focus on what truly matters – enjoying your journey.
                </p>
            </Accordion>

            <Accordion title="Why Choose Us?">
                <ul>
                    <li><strong>Personalized Service:</strong> We believe every traveler is unique. That’s why we work with you to create travel experiences that match your personal tastes, budget, and travel style.</li>
                    <li><strong>Trusted Expertise:</strong> Our team comprises seasoned travel professionals who have firsthand knowledge of the destinations we offer. We’re here to offer recommendations, insights, and insider tips to make your trip extraordinary.</li>
                    <li><strong>24/7 Support:</strong> Whether you need help during the planning process or assistance while on your trip, we’re here for you around the clock to ensure a smooth and enjoyable experience.</li>
                    <li><strong>Sustainable Travel:</strong> We are committed to promoting sustainable tourism and supporting eco-friendly practices. We encourage our travelers to respect the cultures and environments of the destinations they visit.</li>
                </ul>
            </Accordion>

            <Accordion title="Our Destinations">
                <p>
                    From the serene beaches of the Maldives to the bustling streets of New York City, we offer a diverse range of destinations to suit every type of traveler. Explore our curated vacation packages or customize your own adventure with the help of our expert team.
                </p>
            </Accordion>
        </div>
    );
}
