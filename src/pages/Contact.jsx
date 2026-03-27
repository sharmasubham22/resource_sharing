import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import { useFirebase } from '../context/Firebase';
import Swal from 'sweetalert2';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const firebase = useFirebase();

    const submit = (e) => {
        e.preventDefault();
                const result = firebase.sendMessage(name, email, message);
                console.log("Success");
                // nav('/my-dashboard');
                Swal.fire({
                  title: "Success!",
                  text: "Message sent successfully!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
    }
  return (
    <div className="text-left">
      <h2 className="text-4xl md:text-5xl lg:text-6xl pl-2 mx-5 md:mx-10 my-2 border-l-8 text-text-primary font-heading border-brand ">
        Contact Us
      </h2>
      <form className="max-w-3xl p-5 md:p-10">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2.5 text-sm font-medium text-text-primary"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            id="name"
            className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
            type="text"
            placeholder="Enter your Full Name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-text-primary"
          >
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            id="email"
            className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
            type="email"
            placeholder="Enter your Email Address"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2.5 text-sm font-medium text-text-primary"
          >
            Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            name="message"
            id="message"
            className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
            type="text"
            placeholder="Write your message!!"
            rows={8}
            required
          />
        </div>
        <Button variant="primary" size="md" onClick={submit}>
          Send Message
        </Button>
      </form>
    </div>
  );
}
