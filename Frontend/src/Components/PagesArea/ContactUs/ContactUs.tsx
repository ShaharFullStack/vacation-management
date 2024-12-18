import { useState } from "react";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField } from "@mui/material";
import "./ContactUs.css";
import { appConfig } from "../../../Utils/AppConfig";
import { notify } from "../../../Utils/Notify";

export function ContactUs(): JSX.Element {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        termsAgreed: false,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.termsAgreed) {
            notify.error("You must agree to the terms and conditions.");
            return;
        }

        try {
            const response = await fetch(appConfig.contactUsUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send message.");

            notify.success("Your message has been sent successfully.");
        } catch (err) {
            console.error(err);
            notify.error("Failed to send your message. Please try again.");
        }
    };

    return (
        <div className="ContactUs">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Phone"
                    fullWidth
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Message"
                    multiline
                    fullWidth
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                />

                <FormControlLabel
                    label="I agree to the terms and conditions"
                    control={
                        <Checkbox
                            name="termsAgreed"
                            checked={formData.termsAgreed}
                            onChange={handleInputChange}
                        />
                    }
                />

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">
                        Send
                    </Button>
                    <Button
                        type="reset"
                        color="secondary"
                        onClick={() =>
                            setFormData({
                                name: "",
                                email: "",
                                phone: "",
                                message: "",
                                termsAgreed: false,
                            })
                        }
                    >
                        Clear
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
