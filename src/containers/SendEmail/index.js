import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Card, Button } from "react-bootstrap";
import axios from "../../helpers/axios";
import {IoMdSend} from "react-icons/io"

/**
 * @author
 * @function SendEmail
 **/

const SendEmail = (props) => {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emails === "" || subject === "" || title === "" || content === "") {
      alert("Send Email Fail");
    }
    else{
      axios.post("admin/sendemail", {
        emails,
        subject,
        title,
        content,
      });
      alert("Send Email Success");
    }
  };
  return (
    <Layout sidebar>
      <Card>
        <Card.Header as="h4">SEND EMAIL</Card.Header>
        <Card.Body>
          <Card.Title>Send Email To Customer</Card.Title>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>To</Form.Label>
              <Form.Control
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                type="email"
                placeholder="Recipient Email"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                rows={8}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSubmit}><IoMdSend/> Send Email
          </Button>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default SendEmail;
