import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";

function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ysu63f9",
        "template_9biy1br",
        formRef.current,
        "k9z-iNFGCiofOgj1Y"
      )

      .then(
        (result) => {
          console.log(result.text);
          setIsEmailSent(true);
          setFormData({
            name: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div
      className="center-container"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0",
      }}
    >
      <div
        className="contact-container"
        style={{
          maxWidth: "900px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
          gap: "2rem",
        }}
      >
        <div className="contact-image" style={{ flex: 1 }}>
          <Card
            sx={{ maxHeight: "100%", maxWidth: "345px", marginTop: "3rem" }}
          >
            <CardMedia
              component="img"
              height="100%"
              image="./src/assets/contactPhoto.jpeg"
              alt="Contact Image"
            />
          </Card>
        </div>

        <div className="contact-form" style={{ flex: 1 }}>
          <h3 className="text-center inquiry">
            Please send the following information in your inquiry
          </h3>

          {isEmailSent && (
            <div className="alert alert-success" role="alert">
              Email sent successfully!
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="name"
              name="name"
              margin="normal"
              onChange={handleChange}
              value={formData.name}
              style={{ width: "430px" }}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              type="text"
              name="subject"
              margin="normal"
              onChange={handleChange}
              value={formData.subject}
              style={{ width: "430px" }}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="How can we help you?"
              variant="outlined"
              type="text"
              name="message"
              placeholder=""
              multiline
              rows={4}
              margin="normal"
              onChange={handleChange}
              value={formData.message}
              style={{ width: "430px" }}
            />
            <br />
            <Button
              variant="contained"
              className="btn"
              type="submit"
              color="inherit"
              style={{ marginTop: "3rem" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
